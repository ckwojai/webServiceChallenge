import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SakilaService {
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  private baseUrl: string = 'https://webchallenge.kinchang.com';
  getFilms(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
  searchFilms(term: string): Observable<any[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    var requestUrl: string = `${this.baseUrl}/films?q={"Title": {"$regex": "^${term}.*", "$options": "-i"}}`;
    console.log(requestUrl);
    return this.http.get<any[]>(requestUrl);
  }
  searchCollection(term: string, coltn: string, key: string): Observable<any[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    var requestUrl: string;
    if (key == "_id") {
      requestUrl = `${this.baseUrl}/${coltn}?q={"${key}": ${term}}`;
      // requestUrl = `${this.baseUrl}/${coltn.slice(0, -1)}/${term}`;
    } else {
      requestUrl = `${this.baseUrl}/${coltn}?q={"${key}": {"$regex": "${term}.*", "$options": "-i"}}`;
    }
    return this.http.get<any[]>(requestUrl)
      .pipe(
        catchError(this.handleError<any>('searchCollection', []))
      );
    ;
  }
  fetchKeys(coltn: string): Observable<any[]> {
    if (!coltn.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    var requestUrl: string = `${this.baseUrl}/keys/${coltn}`;
    return this.http.get<any[]>(requestUrl);
  }
  constructor(
    private http: HttpClient) { }
}
