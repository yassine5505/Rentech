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
          this.error = error.message || 'Une erreur est survenue durant la liaison avec le serveur';
          this.loaderService.stopLoading();
      }
    );
    this.updateForm = this.formBuilder.group(
      {
        telephone: new FormControl('', [Validators.minLength(5), Validators.maxLength(150), Validators.required]),
        address: new FormControl('', [ Validators.minLength(5), Validators.maxLength(70), Validators.required] ),
        city_id: new FormControl('', [Validators.required]),
        old_password: new FormControl('', [Validators.minLength(5), Validators.maxLength(150)]),
        password: new FormControl('', [Validators.minLength(5), Validators.maxLength(150)])
      }
    );

    this.updateForm.patchValue(
      {
        city_id: this.user.city.id ,
        telephone: this.user.telephone,
        address: this.user.address
      });

    console.log(this.user);
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.updateForm.invalid) {
      this.success = null;
      console.log(this.updateForm);
      this.error = 'Certaines informations du formulaire sont invalides !';
      return;
    }
    this.loaderService.startLoading();
    this.authenticationService.update(this.updateForm.value).subscribe(
      (data) => {
        this.handleResponse(data);
        this.loaderService.stopLoading();
      },
      (error) => {
        this.handleError(error);
        this.loaderService.stopLoading();
      }
    );
  }

  handleResponse(data) {

    this.error = null;
    this.authService.changeAuthStatus(true);

    this.user.telephone = this.updateForm.controls.telephone.value;
    this.user.address = this.updateForm.controls.address.value;
    if (!this.user.status) {
      this.user.status = true;
    }
    this.success = data.message || 'Profile updated successfully';
    this.authService.changeCurrentUserSubject(this.user);

  }

  handleError(error) {
    this.success = null;
    this.error = error.message || 'An error occured during update !';
  }

  // convenience getter for easy access to form fields
  get f() { return this.updateForm.controls; }

  ngOnDestroy(): void {
    this.citySubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

}
