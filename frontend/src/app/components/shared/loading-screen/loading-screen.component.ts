import { Component, OnInit, OnDestroy } from '@angular/core';

import { LoadingScreenService } from './../../../services/shared/loading-screen/loading-screen.service';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss']
})
export class LoadingScreenComponent implements OnInit, OnDestroy {
  public loading = false;
  loadingSubscription: Subscription;

  constructor(private loadingScreenService: LoadingScreenService) {
  }

  ngOnInit() {
    this.loadingSubscription = this.loadingScreenService.loadingStatus.pipe(
      debounceTime(200)
    ).subscribe((value) => {
      console.log('Something receive');
      console.log(value);
      this.loading = value;
    });
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }
}
