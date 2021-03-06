import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { TokenService } from '../../services/authentication/token.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/authentication/auth.service';
import { User } from './../../models/user.model';
import { LoadingScreenService } from '../../services/shared/loading-screen/loading-screen.service';
import { Role } from './../../models/role.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form = {
    email: null,
    password: null
  };

  public error = null;

  constructor(
    private autenticationService: AuthenticationService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService,
    private loadingScreenService: LoadingScreenService
  ) { }

  onSubmit() {
    this.loadingScreenService.startLoading();
    this.autenticationService.login(this.form).subscribe(
      data => {
        this.handleResponse(data);
      },
      error => {
        this.loadingScreenService.stopLoading();
        this.handleError(error);
      },
      () => {
        this.loadingScreenService.stopLoading();
      }
    );
  }

  handleResponse(data) {
    this.Token.handle(data.access_token);
    this.Auth.changeAuthStatus(true);
    const user = data.user;
    this.Auth.changeCurrentUserSubject(user);

    if (user.role === Role.PARTNER) {
      this.router.navigateByUrl('/profile/reservations');
      return;
    }

    if (user.role === Role.CLIENT) {
      this.router.navigateByUrl('/ads');
      return;
    }

    if (user.role === Role.ADMIN) {
      this.router.navigateByUrl('/admin-dashboard');
      return;
    }
    this.router.navigateByUrl('/profile');
  }

  handleError(error) {
    this.error = error.error || 'Erreur temporaire du système !';
  }
  ngOnInit() {
  }

}
