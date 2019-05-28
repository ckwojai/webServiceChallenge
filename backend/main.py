from flask import Flask
from flask import request
from flask_cors import CORS
from bson.json_util import dumps, loads


from pymongo import MongoClient
client = MongoClient('localhost', 27017)
db = client['sakila']

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Hello, World!"

@app.route("/<collection>")
def searchCollection(collection):
    q = loads(request.args.get('q'))
    print (q)
    curDocs = db[collection].find(q)
    docs = dumps(curDocs)
    return docs

@app.route("/<collection>/<docId>")
def searchCollectionbyId(collection, docId):
    curDoc = db[collection].find_one({"_id": int(docId)})
    doc = dumps(curDoc)
    return doc

if __name__ == "__main__":
    app.run(debug=True)
