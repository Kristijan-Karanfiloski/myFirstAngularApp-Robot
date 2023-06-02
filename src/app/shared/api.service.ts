import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl: string = 'https://dummyjson.com';

  constructor(private http: HttpClient) {}

  getSwCharacters(username: string | null): Observable<any> {
    const url: string = `${this.apiUrl}/users/search?q=${username}`;
    return this.http.get(url);
  }
}
