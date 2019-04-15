import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AuthService } from '../../../services/authentication/auth.service';
import { Router } from '@angular/router';
import { TokenService } from '../../../services/authentication/token.service';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { Subscription } from 'rxjs';
import { LoadingScreenService } from '../../../services/shared/loading-screen/loading-screen.service';
import { UserService } from 'src/app/services/user/user.service';
import { User } from './../../../models';
@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
    private toggleButton: any;
    private sidebarVisible: boolean;
    public loggedIn: boolean;
    public logoutSubscription: Subscription;
    public currentUser: User = null;
    constructor(
        public location: Location,
        private element: ElementRef,
        private router: Router,
        private authService: AuthService,
        private authenticationService: AuthenticationService,
        private loaderService: LoadingScreenService
        ) {
        this.sidebarVisible = false;
    }


    ngOnInit() {
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
        this.authService.authStatus.subscribe(value => this.loggedIn = value);
        this.currentUser = this.authService.currentUserValue;
    }
    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        // console.log(toggleButton, 'toggle');

        setTimeout(  () => {
            toggleButton.classList.add('toggled');
        }, 500);
        html.classList.add('nav-open');

        this.sidebarVisible = true;
    }
    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    }
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    }
    isHome() {
        const titlee = this.location.prepareExternalUrl(this.location.path());

        if ( titlee === '/home' ) {
            return true;
        } else {
            return false;
        }
    }
    isDocumentation() {
        const titlee = this.location.prepareExternalUrl(this.location.path());
        if ( titlee === '/documentation' ) {
            return true;
        } else {
            return false;
        }
    }
    async logout(event: MouseEvent) {
        event.preventDefault();
        await this.loaderService.startLoading();
        this.logoutSubscription = this.authenticationService.logout().subscribe(
            data => {
                // Successfully logged out
                this.authService.remove();
            },
            error => {
                this.authService.remove();
                this.loaderService.stopLoading();
                this.router.navigateByUrl('/login');
            },
            () => {
                this.loaderService.stopLoading();
                this.router.navigateByUrl('/login');
            }
        );

    }

    ngOnDestroy() {
        this.logoutSubscription.unsubscribe();
    }
}
