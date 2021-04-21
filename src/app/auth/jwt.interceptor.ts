import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor{

    constructor(public authService: AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const isLoggedIn = this.authService.isAuthenticatedSubject.getValue();
        const isApiRoute = req.url.startsWith(environment.baseUrl);
        if (isLoggedIn && isApiRoute){
            const tokenValue = localStorage.getItem('token');
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${tokenValue}`
                }
            });
        } 
        return next.handle(req);
    }

}