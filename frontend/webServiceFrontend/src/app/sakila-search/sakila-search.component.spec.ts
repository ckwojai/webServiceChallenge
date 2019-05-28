import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SakilaSearchComponent } from './sakila-search.component';

describe('SakilaSearchComponent', () => {
  let component: SakilaSearchComponent;
  let fixture: ComponentFixture<SakilaSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SakilaSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SakilaSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
