import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-search-char-page',
  templateUrl: './search-char-page.component.html',
  styleUrls: ['./search-char-page.component.css'],
})
export class SearchCharPageComponent implements OnInit {
  public charList: any[] = [];
  isFetching: boolean = false;

  searchForm = new FormGroup({
    search: new FormControl('', Validators.required),
  });

  constructor(private swApiService: ApiService) {}

  ngOnInit() {
    //FETCHING DATA ON SEARCH INPUT
    const searchControl = this.searchForm.get('search');

    searchControl?.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((data) => {
          this.isFetching = true;
          return this.swApiService.getSwCharacters(data);
        }),
        map((data) => {
          const searchTerm = searchControl?.value;
          if (!searchTerm) {
            this.isFetching = false;
            return [];
          }
          return data.users.filter((char: any) =>
            char.firstName
              .toLowerCase()
              .startsWith(<string>searchTerm?.toLowerCase())
          );
        })
      )
      .subscribe((responseData) => {
        // this.charList = responseData.users;
        this.charList = responseData;
        this.isFetching = false;
        console.log('ResponseData:', responseData);
      });
  }
}
