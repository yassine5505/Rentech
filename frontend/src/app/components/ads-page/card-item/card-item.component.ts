import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingScreenService } from './../../../services/shared/loading-screen/loading-screen.service';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss']
})
export class CardItemComponent implements OnInit {
  @Input() adInfo = {
  };
  @ViewChild('bookBtn') bookBtn: ElementRef;
  @ViewChild('adBox') adBox: ElementRef;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loaderService: LoadingScreenService,
  ) { }

  ngOnInit() {
  }

  bookAd() {
    const btn: HTMLElement = this.bookBtn.nativeElement;
    if (!btn.classList.contains('loader')) {
      const adBox: HTMLElement = this.adBox.nativeElement;
      btn.setAttribute('disabled', 'true');
      adBox.style.opacity = '0.4';
      btn.classList.add('loader');
    }
  }

  showAdDetails(adId: number) {
    console.log(adId);
    this.router.navigate([ adId, {}], { relativeTo: this.activatedRoute});
  }

}
