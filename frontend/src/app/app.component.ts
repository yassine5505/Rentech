import { Component, OnInit, Inject, Renderer, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';
import { DOCUMENT } from '@angular/platform-browser';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  private routerProp: Subscription;
  @ViewChild(NavbarComponent) navbar: NavbarComponent;

  constructor(
    private renderer: Renderer,
    private router: Router,
    @Inject(DOCUMENT) private document: any,
    private element: ElementRef,
    public location: Location
    ) {

  }
  ngOnInit() {
      const navbar: HTMLElement = this.element.nativeElement.children[0].children[0];
      this.routerProp = this.router.events.pipe(
          filter(event => event instanceof NavigationEnd))
          .subscribe((event: NavigationEnd) => {
          if (window.outerWidth > 991) {
              window.document.children[0].scrollTop = 0;
          } else {
              window.document.activeElement.scrollTop = 0;
          }
          this.navbar.sidebarClose();
      });
      this.renderer.listenGlobal('window', 'scroll', (event) => {
          const numb = window.scrollY;
          if (numb > 150 || window.pageYOffset > 150) {
              // add logic
              navbar.classList.remove('navbar-transparent');
          } else {
              // remove logic
              navbar.classList.add('navbar-transparent');
          }
      });
      const ua = window.navigator.userAgent;
      const trident = ua.indexOf('Trident/');
      let version;
      if (trident > 0) {
        // IE 11 => return version number
        const rv = ua.indexOf('rv:');
        version = parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
      }
      if (version) {
          const body = document.getElementsByTagName('body')[0];
          body.classList.add('ie-background');
      }

  }
  removeFooter() {
      let titlee = this.location.prepareExternalUrl(this.location.path());
      titlee = titlee.slice( 1 );
      if (titlee === 'signup' || titlee === 'nucleoicons') {
          return false;
      } else {
          return true;
      }
  }
}
