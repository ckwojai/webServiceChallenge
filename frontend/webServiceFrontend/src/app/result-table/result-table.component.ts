import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.css']
})
export class ResultTableComponent implements OnInit {
  @Input() displayedCols: string[];
  @Input() displayedData: any[];
  constructor() { }

  ngOnInit() {
  }

}
