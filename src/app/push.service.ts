import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IRegisterToken } from 'src/shared/interfaces/push/registerToken.interface';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  private _fcmToken: string;

  constructor(private _http: HttpClient) { }

  set fcmToken (token: string){
    this._fcmToken = token;
  }

  get fcmToken(): string {
    return this._fcmToken;
  }

  // Register the current device in backend.
  registerInBackend(){
    const body: IRegisterToken = {
      fcmToken: this._fcmToken
    }
    return this._http.post(`${environment.apiUrl}/push`, body).toPromise();
  }
}
