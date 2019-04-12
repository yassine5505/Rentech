import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../services/authentication/authentication.service';
import { TokenService } from './../../services/authentication/token.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { City } from '../../models/city.model';
// import custom validator to validate that password and confirm password fields match
import { MustMatch } from './../../_helpers/must-match.validator';


class ImageSnippet {
    constructor(public src: string, public file: File) {}
}

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    registerForm: FormGroup;
    submitted = false;
    selectedFile: ImageSnippet;
    cities: City[] = [
        new City(1, 'Rabat'),
        new City(2, 'Tetouan'),
        new City(3, 'Casablanca')
    ];
    defaultCity: City = new City(2, 'Tetouan');
    public error = [];

    constructor(
        private formBuilder: FormBuilder,
        private authenticationService: AuthenticationService,
        private Token: TokenService,
        private router: Router
      ) { }
    onSubmit() {
        this.submitted = true;
        console.log(this.registerForm);
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        this.authenticationService.signup(this.registerForm.value).subscribe(
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
        this.registerForm = this.formBuilder.group({
            image: [null, []],
            cin : ['',
                [ Validators.required,
                Validators.minLength(10),
                Validators.maxLength(50)]
            ],
            name: ['', Validators.required],
            driving_license_number: ['',
                [ Validators.required,
                Validators.minLength(10),
                Validators.maxLength(50)]
            ],
            address: ['',
                [ Validators.required,
                Validators.minLength(10),
                Validators.maxLength(50)]
            ],
            telephone: ['',
                [ Validators.required,
                Validators.minLength(10),
                Validators.maxLength(50)]
            ],
            role: new FormControl('CLIENT'),
            status: new FormControl(true),
            city_id: new FormControl(null),
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            password_confirmation: ['', Validators.required],
            iAcceptContrat: new FormControl(null)
        }, {
            validator: MustMatch('password', 'password_confirmation')
        });

        // Setting default city value
        this.registerForm.controls.city_id.setValue(this.defaultCity.id, {onlySelf: true});
        this.registerForm.controls.status.setValue(true, {onlySelf: true});

    }

     // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }


    processFile($event) {
        const file = $event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        this.registerForm.controls.image.setValue(file ? file.name : '');
    }
}
