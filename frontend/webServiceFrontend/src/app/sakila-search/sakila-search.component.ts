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
// Hardcode Search Options for each Collections
const SEARCH_BY_LIST: SakilaKeys = {
  customers: ["_id", "First Name", "Last Name", "Address", "City", "Country", "District", "Phone"],
  films: ["_id", "Title", "Category", "Length", "Rating", "Rental Duration", "Replacement Cost", "Special Features"],
  stores: ["_id", "Address", "City", "Country", "Manager First Name", "Manager Last Name", "Phone"]
};

@Component({
  selector: 'app-sakila-search',
  templateUrl: './sakila-search.component.html',
  styleUrls: ['./sakila-search.component.css']
})

export class SakilaSearchComponent implements OnInit {
  searchBoxValue: string;
  coltnNames: string[] = ["customers", "films", "stores"]; // Hardcode Collection Names
  searchByList: SakilaKeys = SEARCH_BY_LIST;

  searchResults$: Observable<any[]>;

  selectedColtn: string = "films";
  selectedKey: string = "Title";

  private searchTerms = new Subject<string>();
  search(term: string): void {
    this.searchTerms.next(term);
  }
  // Reset Input Field and Json results when Collection / Search Key is re-selected
  onColtnClicked(coltnName: string): void {
    this.selectedKey = this.searchByList[coltnName][1];
    this.searchBoxValue = "";
    this.searchTerms.next("");
  }
  onSearchKeyClicked(): void {
    this.searchBoxValue = "";
    this.searchTerms.next("")
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
