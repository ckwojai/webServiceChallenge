import { Component, OnInit } from '@angular/core';
import { SakilaService } from '../sakila.service';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

@Component({
  selector: 'app-sakila-search',
  templateUrl: './sakila-search.component.html',
  styleUrls: ['./sakila-search.component.css']
})
export class SakilaSearchComponent implements OnInit {
  searchResults$: Observable<any[]>;
  private searchTerms = new Subject<string>();
  search(term: string): void {
    this.searchTerms.next(term);
  }
  onButtonClick() {
    this.sakilaService.getFilms().subscribe(films => console.log(films));
  }

  constructor(
    private sakilaService: SakilaService
  ) { }

  ngOnInit(): void {
    this.searchResults$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.sakilaService.searchFilms(term)),
    );
  }

}
