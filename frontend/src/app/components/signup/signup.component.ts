import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from './../../services/authentication/authentication.service';
import { TokenService } from './../../services/authentication/token.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { City } from '../../models/city.model';
// import custom validator to validate that password and confirm password fields match
import { MustMatch } from './../../_helpers/must-match.validator';
import { Subscription } from 'rxjs';
import { CityService } from './../../services/shared/city/city.service';
import { LoadingScreenService } from './../../services/shared/loading-screen/loading-screen.service';
import { User } from './../../models/user.model';
import { Role } from './../../models/role.model';
import { AuthService } from '../../services/authentication/auth.service';


class ImageSnippet {
    constructor(public src: string, public file: File) {}
}

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

    registerForm: FormGroup;
    submitted = false;
    selectedFile: ImageSnippet;
    cities: City[] = [];

    citySubscription: Subscription;
    public error = [];

    constructor(
        private formBuilder: FormBuilder,
        private authenticationService: AuthenticationService,
        private Token: TokenService,
        private router: Router,
        private cityService: CityService,
        private Auth: AuthService,
        private loaderService: LoadingScreenService
      ) { }
    onSubmit() {
        this.submitted = true;
        this.loaderService.startLoading();
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            this.loaderService.stopLoading();
            this.error = [];
            this.error.push('Certaines informations du formulaire sont invalides !');
            return;
        }
        this.authenticationService.signup(this.registerForm.value).subscribe(
          data => {
            this.handleResponse(data);
          },
          error => {
            this.loaderService.stopLoading();
            this.handleError(error);
          },
          () => {
            this.loaderService.stopLoading();
          }

        );
    }

    handleResponse(data) {
        this.Token.handle(data.access_token);
        this.Auth.changeAuthStatus(true);
        const user = data.user;
        this.Auth.changeCurrentUserSubject(user);

        if (user.role === Role.PARTNER) {
        this.router.navigateByUrl('/home');
        }
        this.router.navigateByUrl('/profile');
    }

    handleError(error) {
        this.error = error.message;
    }

    ngOnInit() {
        this.loaderService.startLoading();
        this.citySubscription = this.cityService.getAll().subscribe(
            (data) => {
                this.cities = data;
                this.loaderService.stopLoading();
            },
            (error) => {
                console.log(error);
                this.loaderService.stopLoading();
            },
            () => this.loaderService.stopLoading()
        );
        this.registerForm = this.formBuilder.group({
            name: ['', Validators.required],
            role: new FormControl('CLIENT'),
            city_id: [ '1' ],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            password_confirmation: ['', Validators.required],
            iAcceptContrat: [true, Validators.required]
        }, {
            validator: MustMatch('password', 'password_confirmation')
        });
    }

    ngOnDestroy(): void {
        this.citySubscription.unsubscribe();
    }

     // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }


    processFile($event) {
        const file = $event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        console.log(reader);
        // this.registerForm.controls.image.setValue(file ? file.name : '');
    }
}
