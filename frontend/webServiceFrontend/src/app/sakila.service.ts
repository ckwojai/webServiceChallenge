import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SakilaService {
  private baseUrl: string = 'http://localhost:5000';
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
  constructor(
    private http: HttpClient) { }
}
