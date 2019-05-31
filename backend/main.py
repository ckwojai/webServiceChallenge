from flask import Flask, request, abort
from flask_cors import CORS
from bson.json_util import dumps, loads


from pymongo import MongoClient
client = MongoClient("mongodb+srv://admin:pycqed-Vamqef-nypdu6@webservicechallenge-1jjj8.gcp.mongodb.net/test?retryWrites=true&w=majority")
db = client['sakila']

app = Flask(__name__)
CORS(app)



def collectionValidation(collection):
    collectionsList = [ "customers", "films", "stores"]
    return collection in collectionsList
def mongoQueryValidation(query):
    try:
        loads(query)
    except ValueError:
        return False
    return True
def isInt(var):
    try:
        int(var)
    except ValueError:
        return False
    return True

def checkDocId(docId):
    # Check Int
    if isInt(docId):
        if int(docId) > 0:
            return True
        else:
            return False

@app.route("/")
def home():
    return "Hello, World!"

@app.route("/<collection>")
def searchCollection(collection):
    q = request.args.get('q')
    if not q:
        q = "{}"
    if not collectionValidation(collection):
        abort(400, "Collection Doesn't Exist")
    if not mongoQueryValidation(q):
        abort(400, "MongoQuery is not a valid Json")
    try:
        qJson = loads(q)
        curDocs = db[collection].find(qJson)
        docs = dumps(curDocs)
    except ValueError as e:
        print (e)
        abort(500, "Error Retrieving Data from Mongodb. Message: {}".format(e))
    return docs

@app.route("/<collection>/<docId>")
def searchCollectionbyId(collection, docId):
    # collection = collection + 's'
    if not collectionValidation(collection):
        abort(400, "Collection Doesn't Exist")
    # if not checkDocId(docId):
    #     abort(400, "Invalid docId")
    try:
        curDoc = db[collection].find_one({"_id": int(docId)})
        doc = dumps(curDoc)
    except ValueError as e:
        print (e)
        abort(500, "Error Retrieving Data from Mongodb. Message: {}".format(e))
    return doc

@app.route("/keys/<collection>")
def getAllKeysfromCollection(collection):
    if not collectionValidation(collection):
        abort(400, "Collection Doesn't Exist")
    try:
        curDoc = db[collection].find_one()
        keys = []
        for key in curDoc:
            keys.append(key)

        keys.remove("_id")
        return dumps(keys)
    except ValueError as e:
        print (e)
        abort(500, "Error Retrieving Data from Mongodb. Message: {}".format(e))

if __name__ == "__main__":
    app.run(debug=True)
