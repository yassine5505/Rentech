import { Component, OnInit, OnDestroy } from '@angular/core';

import { Ad } from './../../../../models/ad.model';
import { Subscription } from 'rxjs';

import { environment } from './../../../../../environments/environment';
import { LoadingScreenService } from './../../../../services/shared/loading-screen/loading-screen.service';
import { AdService } from './../../../../services/shared/ad/ad.service';

@Component({
  selector: 'app-partner-ad-history',
  templateUrl: './partner-ad-history.component.html',
  styleUrls: ['./partner-ad-history.component.scss']
})
export class PartnerAdHistoryComponent implements OnInit, OnDestroy {

  public myAds: Ad[];
  public error = [];
  public adSubscription: Subscription;

  constructor(
    private adService: AdService,
    private loaderService: LoadingScreenService
  ) { }

  ngOnInit() {
    this.adSubscription = this.adService.getAll().subscribe(
      (success) => {
        this.myAds = success;
      },
      (error) => {
        this.error.push(error);
      },
      () => {

      }
    );

  }

  getImage(image) {
    return  environment.api_url + '/image/' + image.id;
  }


  ngOnDestroy(): void {
    this.adSubscription.unsubscribe();
  }


}
