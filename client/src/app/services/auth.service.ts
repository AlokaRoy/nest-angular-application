import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/auth';

  private loggedIn = new BehaviorSubject<boolean>(false);
  private actionSource = new BehaviorSubject<string>('');
  action$ = this.actionSource.asObservable();

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private http: HttpClient) { }

  signUp(username: string, password: string): Observable<any> {
    const payload = {
        username: username,
        password: password
      };
    return this.http.post(`${this.baseUrl}/signup`, payload);
  }

  login(username: string, password: string): Observable<any> {
    const payload = {
        username: username,
        password: password
      };
    return this.http.post<any>(`${this.baseUrl}/login`, payload)
      .pipe(map(response => {
        if (response && response.token) {
          sessionStorage.setItem('currentUser', JSON.stringify({ username: payload.username, token: response.token }));
          this.loggedIn.next(true);
        }
        return response;
      }));
  }

  logout() {
    sessionStorage.removeItem('currentUser');
    this.loggedIn.next(false);
  }

  checkIfSignedUp(): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/check`)
      .pipe(
        catchError((err): Observable<boolean> => {
          console.error(err);
          return of(false);
        })
      );
  }

  getToken() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    return currentUser.token;
  }

  emitAction(action: string) {
    this.actionSource.next(action);
  }
}
