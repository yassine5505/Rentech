import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from './../../../services/authentication/authentication.service';
import { User, City, Role } from './../../../models';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CityService } from './../../../services/shared/city/city.service';
import { AuthService } from './../../../services/authentication/auth.service';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})

export class ProfileEditComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  selectedFile: ImageSnippet;
  cities: City[] = [];

  citySubscription: Subscription;
  public error = [];
  public userSubscription: Subscription;
  public userInfo: any = null;
  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private cityService: CityService,
    private Auth: AuthService,
  ) {}

  ngOnInit() {
    this.userSubscription = this.authenticationService.me().subscribe(
      (data) => {
        console.log(data);
        this.userInfo = data;
      },
      (error) => {

      },
      () => {
      }
    );
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        this.error = [];
        this.error.push('Certaines informations du formulaire sont invalides !');
        return;
    }
    this.authenticationService.signup(this.registerForm.value).subscribe(
      data => {
        this.handleResponse(data);
      },
      error => {
        this.handleError(error);
      },
      () => {
      }

    );
}

handleResponse(data) {
    this.Auth.changeAuthStatus(true);
    const user = new User(
    data.user.address,
    data.user.city_id,
    data.user.driving_license_number,
    data.user.email,
    data.user.id,
    data.user.image,
    data.user.name,
    User.dealingRole(data.user.role),
    !!data.user.status,
    data.user.telephone);
    this.Auth.changeCurrentUserSubject(user);

    if (user.role === Role.PARTNER) {
    this.router.navigateByUrl('/home');
    }
    this.router.navigateByUrl('/profile');
}

handleError(error) {
    this.error = error.message;
}

}
