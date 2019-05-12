import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdService } from './../../../services/shared/ad/ad.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { LoadingScreenService } from './../../../services/shared/loading-screen/loading-screen.service';
import { AuthService } from './../../../services/authentication/auth.service';
import { User } from './../../../models';
import { Ad } from './../../../models/ad.model';
import { BookingService } from './../../../services/book/booking.service';
import { Subscription } from 'rxjs';
import { environment } from './../../../../environments/environment';
@Component({
  selector: 'app-card-item-details',
  templateUrl: './card-item-details.component.html',
  styleUrls: ['./card-item-details.component.scss']
})
export class CardItemDetailsComponent implements OnInit,  OnDestroy {
  public adInfo: Ad;
  public adId: number;
  public adSubscription: Subscription;
  public userSubscription: Subscription;
  public user: User = null;
  error = null;
  success = null;
  constructor(
    private router: Router,
    private adService: AdService,
    private bookingService: BookingService,
    private route: ActivatedRoute,
    private loaderService: LoadingScreenService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.userSubscription = this.authService.currentUser.subscribe(value => this.user = value);
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = parseInt(params.get('id'), 10);
      this.adId = id;
    });
    this.adSubscription = this.adService.get(this.adId).subscribe(
      (data) => {
        this.adInfo = data;
      },
      (error) => {
        this.error = error.message || 'Erreur survenue';
      },
      () => {

      }
    );
  }

  bookAd() {
    if (this.user == null) {
      alert('Vous devez vous connecter avant de pouvoir reserver');
      this.router.navigate(['/login'] );
      return;
    }
    if (this.user.isAdmin || this.user.isPartner) {
      alert('Impossible de reserver cette offre !');
      this.router.navigate(['profile']);
      return;
    }
    this.error = null;
    this.success = null;

    this.adInfo.status = 1;
    this.loaderService.startLoading();
    this.bookingService.add({ad_id: this.adInfo.id}).subscribe(
      (success) => {
        this.adInfo.status = 1;
        this.success = success.message || 'Reservation créée';
      },
      (error) => {
        this.adInfo.status = 0;
        this.loaderService.stopLoading();
        this.error = error.message || 'Une erreur est survenue avec le serveur';
      },
      () => {
        this.loaderService.stopLoading();
      }
    );

  }

  getImage(image) {
    return  environment.api_url  + '/image/' + image.id;
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.adSubscription.unsubscribe();
  }
}
