import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ScoreService } from './../../../services/score/score.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from './../../../services/authentication/auth.service';
import { User, Car, Ad } from './../../../../app/models';

@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.scss']
})
export class CreateReviewComponent implements OnInit, OnDestroy {

  userScoreForm: FormGroup;
  submitedUserScoreForm = false;

  carScoreForm: FormGroup;
  submitedCarScoreForm = false;


  showUserVoteZone = false;
  showCarVoteZone = false;
  error = null;
  success = null;
  verifySubscription: Subscription;
  user: User = null;
  carInfo: Car = null;
  toInfo: User = null;
  adInfo: Ad = null;
  scoreInfo = {
    reservation_id: null,
    car_id: null,
    to_id: null,
  };
  constructor(
    private scoreService: ScoreService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.authService.currentUser.subscribe(
      value => this.user = value
    );
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        // tslint:disable-next-line:no-string-literal
        this.scoreInfo.reservation_id = +params.get('reservationCode');
        this.scoreInfo.car_id = +params.get('carCode');
        this.scoreInfo.to_id = +params.get('clientCode');
      }
    );
    this.userScoreForm = new FormGroup(
      {
        amount: new FormControl(2),
        to_id: new FormControl('', [Validators.required]),
        reservation_id: new FormControl('', [Validators.required]),
        comment: new FormControl('', [ Validators.maxLength(150)]),
        type:  new FormControl( 0 , [Validators.required]),
      }
    );

    this.carScoreForm = new FormGroup(
      {
        amount: new FormControl(2),
        car_id: new FormControl(2, [Validators.required]),
        reservation_id: new FormControl(2, [Validators.required]),
        comment: new FormControl('', [ Validators.maxLength(150)]),
        type:  new FormControl( 0 , [Validators.required]),
      }
    );

    this.verifySubscription = this.scoreService.verifyReservationScore({ reservation_id : this.scoreInfo.reservation_id}).subscribe(
      (success: any) => {
          this.showCarVoteZone = success.status.carReview;
          this.showUserVoteZone = success.status.ownerReview;
          this.scoreInfo.car_id = success.status.car_info.id;
          this.scoreInfo.to_id = success.status.to_info.id;
          this.carInfo = success.status.car_info;
          this.toInfo = success.status.to_info;
          this.adInfo = success.status.ad_info;

          // Patching car evaluation form
          this.carScoreForm.patchValue({reservation_id: this.scoreInfo.reservation_id});
          this.carScoreForm.patchValue({car_id: success.status.car_info.id});


          // Patching user evaluation form
          this.userScoreForm.patchValue({reservation_id: this.scoreInfo.reservation_id});
          this.userScoreForm.patchValue({to_id: success.status.to_info.id});
      },
      (error) => {
        this.showCarVoteZone = false;
        this.showUserVoteZone = false;
        this.error = error.message;
      }
    );
  }
  // When User Rating value change
  onUserRatingChange(event) {
    this.userScoreForm.patchValue({amount: event.rating});
  }

  // When Car Rating value change
  onCarRatingChange(event) {
    this.carScoreForm.patchValue({amount: event.rating});
  }

  // Submit the user score form
  onSubmitUserScore() {
    this.submitedUserScoreForm = true;
    console.log(this.userScoreForm);
    if (this.userScoreForm.invalid) {
      this.success = null;
      this.error = null;
      this.error = 'Certaines informations du formulaire d\'évaluation utilisateur sont invalides !';
      return;
    }
    this.success = null;
    this.error = null;

    this.scoreService.addUserScore(this.userScoreForm.value).subscribe(
      (success) => {
        this.success = success.message;
      },
      (error) => {
        this.error = error.message;
      },
      () => {
        this.userScoreForm.reset();
        this.showUserVoteZone = false;
      }
    );

  }

  onSubmitCarScore() {
    this.submitedCarScoreForm = true;
    console.log(this.carScoreForm);
    if (this.carScoreForm.invalid) {
      this.success = null;
      this.error = null;
      this.error = 'Certaines informations du formulaire  d\'évaluation partenaire sont invalides !';
      return;
    }
    this.success = null;
    this.error = null;

    this.scoreService.addCarScore(this.carScoreForm.value).subscribe(
      (success) => {
        this.success = success.message;
      },
      (error) => {
        this.error = error.message;
      },
      () => {
        this.showCarVoteZone = false;
        this.carScoreForm.reset();
      }
    );

  }

  ngOnDestroy(): void {
    this.verifySubscription.unsubscribe();
  }

}
