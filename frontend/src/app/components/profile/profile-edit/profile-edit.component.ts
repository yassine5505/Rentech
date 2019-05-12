import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from './../../../services/authentication/authentication.service';
import { User, City, Role } from './../../../models';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CityService } from './../../../services/shared/city/city.service';
import { AuthService } from './../../../services/authentication/auth.service';
import { LoadingScreenService } from './../../../services/shared/loading-screen/loading-screen.service';

class ImageSnippet {
  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})

export class ProfileEditComponent implements OnInit, OnDestroy {
  updateForm: FormGroup;
  submitted = false;
  selectedFile: ImageSnippet;
  cities: City[] = [];
  public user: User = null;
  error = null;
  success = null;

  citySubscription: Subscription;
  public userSubscription: Subscription;
  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private cityService: CityService,
    private route: ActivatedRoute,
    private loaderService: LoadingScreenService,
    private authService: AuthService,
  ) { }

  ngOnInit() {

    this.userSubscription = this.authService.currentUser.subscribe(value => this.user = value);

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
    this.updateForm = this.formBuilder.group(
      {
        phone: new FormControl('', [Validators.minLength(5), Validators.maxLength(150), Validators.required]),
        address: new FormControl('', [ Validators.minLength(5), Validators.maxLength(70), Validators.required] ),
        city_id: new FormControl('', [Validators.required]),
        email: new FormControl('', [ Validators.minLength(5), Validators.email,  Validators.maxLength(25), Validators.required ]),
        old_password: new FormControl('', [Validators.minLength(5), Validators.maxLength(150)]),
        password: new FormControl('', [Validators.minLength(5), Validators.maxLength(150)])
      }
    );

  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.updateForm.invalid) {
      this.error = [];
      this.error.push('Certaines informations du formulaire sont invalides !');
      return;
    }
    this.authenticationService.signup(this.updateForm.value).subscribe(
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
    /*this.Auth.changeAuthStatus(true);
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
    */
  }

  handleError(error) {
    this.error = error.message;
  }

  // convenience getter for easy access to form fields
  get f() { return this.updateForm.controls; }

  ngOnDestroy(): void {
    this.citySubscription.unsubscribe();
  }

}
