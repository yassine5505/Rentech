import { Component, OnInit, Input, Output, ViewChild, ElementRef, EventEmitter, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingScreenService } from './../../../services/shared/loading-screen/loading-screen.service';
import { AuthService } from './../../../services/authentication/auth.service';
import { User } from './../../../models';
import { Ad } from './../../../models/ad.model';
import { BookingService } from './../../../services/book/booking.service';
import { Subscription } from 'rxjs';
import { environment } from './../../../../environments/environment';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss']
})
export class CardItemComponent implements OnInit, OnDestroy {
  @Input() adInfo: Ad = null;
  @ViewChild('bookBtn') bookBtn: ElementRef;
  @ViewChild('adBox') adBox: ElementRef;
  @Output() dismissAd: EventEmitter<any> = new EventEmitter();

  public visibled = true;
  public user: User = null;
  public success: string = null;
  public error: string = null;
  public userSubscription: Subscription;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loaderService: LoadingScreenService,
    private authService: AuthService,
    private bookingService: BookingService,
  ) { }

  ngOnInit() {
    this.userSubscription = this.authService.currentUser.subscribe(value => this.user = value);
  }
  hide() {
    setTimeout(() => {
      this.visibled = false;
    }, 3000);
  }
  bookAd() {
    if (!this.user) {
      alert('Vous devez vous connecter avant de pouvoir reserver');
      this.router.navigate(['../login'], {relativeTo: this.activatedRoute} );
      return;
    }
/* 
    if (this.user.isAdmin || this.user.isPartner) {
      alert('Impossible de reserver cette offre !');
      this.router.navigate(['../home'], {relativeTo: this.activatedRoute} );
      return;
    } */
    this.error = null;
    this.success = null;
    const btn: HTMLElement = this.bookBtn.nativeElement;
    const adBox: HTMLElement = this.adBox.nativeElement;
    if (!btn.classList.contains('loader')) {
      btn.setAttribute('disabled', 'true');
      adBox.style.opacity = '0.8';
      btn.classList.add('loader');
    }


    this.bookingService.add({ad_id: this.adInfo.id}).subscribe(
      (success) => {
        this.success = success.message || 'Reservation créée';
      },
      (error) => {
        adBox.classList.add('booking-error');
        this.error = error.message || 'Une erreur est survenue avec le serveur';
        alert('ERREUR :' + this.error);
      },
      () => {
        adBox.classList.add('booking-success');
        btn.classList.remove('loader');
        this.hide();
      }
    );

  }

  showAdDetails(adId: number) {
    console.log(adId);
    this.router.navigate([ adId, {}], { relativeTo: this.activatedRoute});
  }

  getImage(image) {
    return  environment.api_url  + '/image/' + image.id;
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
