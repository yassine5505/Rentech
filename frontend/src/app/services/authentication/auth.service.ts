import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenService } from './token.service';
import { User } from './../../models/user.model';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(this.Token.loggedIn());
  authStatus = this.loggedIn.asObservable();
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  changeAuthStatus(value: boolean) {
    this.loggedIn.next(value);
  }

  changeCurrentUserSubject(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  remove() {
    localStorage.removeItem('currentUser');
    this.Token.remove();
    this.changeAuthStatus(false);
    this.changeCurrentUserSubject(null);
    localStorage.clear();
  }

  constructor(
    private Token: TokenService,
    private http: HttpClient
     ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }


}
