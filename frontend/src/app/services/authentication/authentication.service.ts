import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  signup(data) {
    return this.http.post(`${environment.api_url}/signup`, data);
  }

  login(data) {
    return this.http.post(`${environment.api_url}/login`, data);
  }

  logout() {
    return this.http.post(`${environment.api_url}/logout`, {});
  }

  sendPasswordResetLink(data) {
    return this.http.post(`${environment.api_url}/sendPasswordResetLink`, data);
  }

  changePassword(data) {
    return this.http.post(`${environment.api_url}/resetPassword`, data);
  }

  me() {
    return this.http.post(`${environment.api_url}/me`, {});
  }

}
