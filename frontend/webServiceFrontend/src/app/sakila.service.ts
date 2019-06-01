import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SakilaService {
  private baseUrl: string = 'http://35.222.91.21';
  // private baseUrl: string = 'http://localhost:5000';
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
    var requestUrl: string = `${this.baseUrl}/${coltn}?q={"${key}": {"$regex": "^${term}.*", "$options": "-i"}}`;
    return this.http.get<any[]>(requestUrl);
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
