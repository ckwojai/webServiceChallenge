import { Component, OnInit } from '@angular/core';
import { SakilaService } from '../sakila.service';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';



export interface SakilaKeys {
  customers: string[];
  films: string[];
  stores: string[];
};

const SEARCH_BY_LIST: SakilaKeys = {
  customers: ["Address", "City", "Country", "District", "First Name", "Last Name", "Phone"],
  films: ["Title", "Category", "Description", "Length", "Rating", "Rating", "Rental Duration", "Replacement Cost", "Special Features"],
  stores: ["Address", "City", "Country", "Manager First Name", "Manager Last Name", "Phone"]
};

@Component({
  selector: 'app-sakila-search',
  templateUrl: './sakila-search.component.html',
  styleUrls: ['./sakila-search.component.css']
})

export class SakilaSearchComponent implements OnInit {
  coltnNames: string[] = ["customers", "films", "stores"];
  searchResults$: Observable<any[]>;
  searchByList: SakilaKeys = SEARCH_BY_LIST;

  selectedColtn: string;
  selectedKey: string;

  private searchTerms = new Subject<string>();
  search(term: string): void {
    this.searchTerms.next(term);
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
      switchMap((term: string) => this.sakilaService.searchCollection(term, this.selectedColtn, this.selectedKey)),
    );
  }

}
