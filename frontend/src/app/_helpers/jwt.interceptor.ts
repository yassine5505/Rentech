import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/authentication/token.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private tokenService: TokenService) { }


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Add authorization header with jwt token if available
        const userToken = this.tokenService.get();
        if (userToken && this.tokenService.isValid()) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${userToken}`
                }
            });
        }

        return next.handle(request);
    }
}

