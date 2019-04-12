import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  signup(data) {
    return this.http.post(`${environment.api_url}/auth/signup`, data);
  }

  login(data) {
    return this.http.post(`${environment.api_url}/auth/login`, data);
  }

  logout() {
    return this.http.post(`${environment.api_url}/auth/logout`, {});
  }

  sendPasswordResetLink(data) {
    return this.http.post(`${environment.api_url}/auth/sendPasswordResetLink`, data);
  }

  changePassword(data) {
    return this.http.post(`${environment.api_url}/auth/resetPassword`, data);
  }

  me() {
    return this.http.post(`${environment.api_url}/auth/me`, {});
  }

}
