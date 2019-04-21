import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-ads-page',
  templateUrl: './ads-page.component.html',
  styleUrls: ['./ads-page.component.scss']
})
export class AdsPageComponent implements OnInit {
  // Reference to filter box Component
  @ViewChild('filterBox') filterBox: ElementRef;

  fromMinimun = new Date().toLocaleDateString();

  constructor() { }

  ngOnInit() {
    this.fromMinimun = new Date().toLocaleDateString();
  }


  toggleFilter() {
    const filter: HTMLElement = this.filterBox.nativeElement;
    const classList = filter.classList;
    if (classList.contains('filter-is-visible')) {
      filter.classList.remove('filter-is-visible');
      return;
    }
    filter.classList.add('filter-is-visible');
  }

}
