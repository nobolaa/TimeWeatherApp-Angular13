import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, tap } from 'rxjs';

@Component({
  selector: 'app-search',
  template: `
    <div class="search">
      <input class="search__input" placeholder="City..." [formControl]="inputSearch">
    </div>
  `,
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  inputSearch = new FormControl('');
  @Output() submitted = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    this.onChange();
  }

  private onChange(): void{
    this.inputSearch.valueChanges
    .pipe(
      map( (search) => search.trim()),
      debounceTime(500),
      distinctUntilChanged(),
      filter( (search) => search!=''),
      tap((search) => this.submitted.emit(search))
    )
    .subscribe();
  }
}
