import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../services/authentication/authentication.service';
import { TokenService } from './../../services/authentication/token.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    test: Date = new Date();
    focus;
    focus1;
    public error = [];
    public form = {
        title: null,
        name: null,
        surname: null,
        type_account: null,
        city: null,
        phone: null,
        email: null,
        password: null,
        password_confirmation: null,
        contrat: false
    };
    constructor(
        private authenticationService: AuthenticationService,
        private Token: TokenService,
        private router: Router
      ) { }
      onSubmit() {

        this.authenticationService.signup(this.form).subscribe(
          data => this.handleResponse(data),
          error => {
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
