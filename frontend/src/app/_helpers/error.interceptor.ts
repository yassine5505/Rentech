import { Injectable, OnDestroy } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from './../services/authentication/authentication.service';
import { AuthService } from '../services/authentication/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingScreenService } from '../services/shared/loading-screen/loading-screen.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    public exceptedRoutes = [
        'login'
    ];
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private loadScreenService: LoadingScreenService
        ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            const routeName = request.url.split('/');
            if (err.status === 401 && this.exceptedRoutes.indexOf(routeName[routeName.length - 1 ]) <= -1) {
                // auto logout if 401 response returned from api
                this.authService.remove();
                this.loadScreenService.stopLoading();
                this.router.navigate(['/login', {redirectUrl: this.router.url}], { relativeTo: this.activatedRoute});
            }
            const error = err.error || err.statusText;
            return throwError(error);
        }));
    }
}

