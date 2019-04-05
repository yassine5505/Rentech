import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { TokenService } from '../../services/authentication/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public form = {
    email: null,
    name: null,
    password: null,
    password_confirmation: null
  };
  public error = [];

  constructor(
    private authenticationService: AuthenticationService,
    private Token: TokenService,
    private router: Router
  ) { }

  onSubmit() {

    this.authenticationService.signup(this.form).subscribe(
      data => this.handleResponse(data),
      error => {
        console.log(error);
        this.handleError(error);
      }
    );
  }
  handleResponse(data) {
    this.Token.handle(data.access_token);
    this.router.navigateByUrl('/profile');
  }

  handleError(error) {
    this.error = error.error.errors;
  }

  ngOnInit() {
  }

}
