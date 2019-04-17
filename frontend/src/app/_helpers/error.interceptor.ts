import { Injectable, OnDestroy } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from './../services/authentication/authentication.service';
import { AuthService } from '../services/authentication/auth.service';
import { Router } from '@angular/router';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    public exceptedRoutes = [
        'login'
    ];
    constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
        private authService: AuthService,
        ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            const routeName = request.url.split('/');
            if (err.status === 401 && this.exceptedRoutes.indexOf(routeName[routeName.length - 1 ]) <= -1) {
                // auto logout if 401 response returned from api
                this.authService.remove();

                this.router.navigateByUrl('/login');
            }
            const error = err.error || err.statusText;
            return throwError(error);
        }));
    }
}

