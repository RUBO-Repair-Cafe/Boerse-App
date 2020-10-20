import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private _authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let accessToken = this._authService.accessToken;
    let tokenExpiresAt = this._authService.tokenExpiresAt;
    let currentSec = parseInt('' + (new Date().valueOf() / 1000));
    let tokenizedReq: HttpRequest<any>;
    if (accessToken) {
      if (tokenExpiresAt < currentSec) {
        console.log('expried');
        // Token expried -> refresh it
        this._authService.refreshExpiredToken()
          .then((data) => {
            console.log('intercepted with new token');
            tokenizedReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${data.access_token}`,
              },
            });
          })
          .catch((err) => {
            console.error('Failed refreshing expired Token in Interceptor Service');
          })
      } else {
        // Token not expired yet
        console.log('intercepted');
        tokenizedReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      }
    } else {
      // No accesstoken present yet -> send request without any token
      tokenizedReq = req.clone();
    }
  
    return next.handle(tokenizedReq);
  }
}
