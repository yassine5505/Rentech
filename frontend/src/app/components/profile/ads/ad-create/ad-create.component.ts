import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CarService } from './../../../../services/shared/car/car.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoadingScreenService } from './../../../../services/shared/loading-screen/loading-screen.service';
import { CityService } from './../../../../services/shared/city/city.service';
import { Subscription } from 'rxjs';
import { AdService } from './../../../../services/shared/ad/ad.service';
import { Car , City , User } from './../../../../models';
import { DatePipe } from '@angular/common';
import { AuthService } from './../../../../services/authentication/auth.service';
import { Moment } from 'moment';
@Component({
  selector: 'app-ad-create',
  templateUrl: './ad-create.component.html',
  styleUrls: ['./ad-create.component.scss'],
  providers: [DatePipe]
})
export class AdCreateComponent implements OnInit, OnDestroy {
  newAdForm: FormGroup;
  submitted = false;
  error: string[] = [];
  success = null;
  cities: City[] = [];
  citySubscription: Subscription;
  selectedCar: Car = null;
  allMyCars: Car[] = [];
  public startDatetime: {start: Moment, end: Moment};
  public endDatetime: {start: Moment, end: Moment};
  public user: User = null;
  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private cityService: CityService,
    private adService: AdService,
    private carService: CarService,
    private loaderService: LoadingScreenService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.authService.currentUser.subscribe(
      value => this.user = value
    );
    this.loaderService.startLoading();
    this.newAdForm = this.formBuilder.group(
      {
        city_id: ['', Validators.required],
        start_date: ['', null],
        end_date: ['', null],
        user_id: this.authService.currentUserValue.id ,
        startDatetime: ['', Validators.required],
        endDatetime: ['', Validators.required],
        description: ['', Validators.required],
        price: [100, [
          Validators.required,
          Validators.min(100),
          Validators.max(2000)
        ]],
        car_id: [null, Validators.required],
        status: true
      }, { /* validator: this.dateLessThan('start_date', 'end_date') */ }
    );
    this.citySubscription = this.cityService.getAll().subscribe(
      (data) => {
        this.cities = data;
        this.loaderService.stopLoading();
      },
      (error) => {
        this.loaderService.stopLoading();
      },
      () => this.loaderService.stopLoading()
    );
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const carId = parseInt(params.get('extraID'), 10);
      if (carId) {
        this.carService.get(carId).subscribe(
          (successData) => {
            this.selectedCar = successData;
            this.newAdForm.patchValue({car_id: this.selectedCar.id});
          },
          (error) => {
            this.selectedCar = null;
          },
          () => this.loaderService.stopLoading()
        );
      }
    });

    // If the selectID is incorrect
    if (!this.selectedCar) {
      // Getting all te current user's cars.
      this.carService.getAll().subscribe(
        (successData) => {
          this.allMyCars = successData;
        },
        (error) => {
          this.error.push('Aucune voiture trouvée , donc impossible de créer une offre !');
          this.loaderService.stopLoading();
        },
        () => this.loaderService.stopLoading()
      );
    }

  }
  dateLessThan(from: string, to: string) {
    return (group: FormGroup): { [key: string]: any } => {
      const f = group.controls[from];
      const t = group.controls[to];

      if (f.value < new Date()) {
        return {
          dates: 'La date de début doit être supérieure ou égale à aujourd\'hui !'
        };
      }
      if (f.value > t.value ) {
        return {
          dates: 'La date de fin doit être supérieure à la date de debut !'
        };
      }
      return {};
    };
  }
  onSubmit() {
    this.submitted = true;
    this.loaderService.startLoading();
    if (this.newAdForm.invalid) {
      this.loaderService.stopLoading();
      this.success = null;
      this.error = [];
      this.error.push('Certaines informations du formulaire sont invalides !');
      return;
    }

    this.newAdForm.patchValue({
      start_date: this.newAdForm.controls.startDatetime.value.endDate.format('YYYY/MM/DD HH:mm'),
      end_date: this.newAdForm.controls.endDatetime.value.endDate.format('YYYY/MM/DD HH:mm')
    });
    this.error = [];
    this.success = null;
    this.adService.add(this.newAdForm.value).subscribe(
      data => {
        this.handleResponse(data);
        this.newAdForm.reset();
      },
      error => {
        this.handleError(error);
        this.error.push('Une erreur est survenue lors de l inscritption !');
        this.loaderService.stopLoading();
      },
      () => {
        this.loaderService.stopLoading();
      }
    );
  }


  handleResponse(data) {
    this.success = data.message;
  }

  handleError(error) {
    if (error.message) {
      const errors = error.message;
      if ( errors.start_date || errors.end_date ) {
        this.error.push('Intervalle/format de dates incorrect !' );
      }
      if ( errors.description ) {
        this.error.push('Description très longue !' );
      }
      return;
    }
    this.error.push('Une erreur est survenue lors de la création de l\'annonce ! ' );

  }

  ngOnDestroy(): void {
    this.citySubscription.unsubscribe();
  }

}
