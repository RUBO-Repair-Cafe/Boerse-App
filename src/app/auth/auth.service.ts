import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { INewUser } from 'src/shared/interfaces/user/newUser.dto';
import { IOwnUser } from 'src/shared/interfaces/user/ownUser.interface';
import { map } from 'rxjs/operators';
import { ILoginRequest } from 'src/shared/interfaces/auth/loginRequest.interface';
import { ILoginResponse } from 'src/shared/interfaces/auth/loginResponse.interface';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _accessToken: string;
  private _refreshToken: string;
  private _tokenExpiresAt: number;

  constructor(
    private readonly _http: HttpClient
  ) { }

  async registerUser(userData: INewUser): Promise<IOwnUser>{
    return this._http.post<IOwnUser>(`${environment.apiUrl}/auth/register`, userData)
    .pipe(map(async (user: IOwnUser) => {
      await this.loginUser({
        email: userData.email,
        password: userData.password
      });
      return user;
    }))
    .toPromise();
  }

  async loginUser(loginData: ILoginRequest): Promise<ILoginResponse>{
    const loginResponse = await this._http.post<ILoginResponse>(`${environment.apiUrl}/auth/login`, loginData).toPromise()
    this._accessToken = loginResponse.access_token;
    this._refreshToken = loginResponse.refresh_token;
    const token = jwtDecode(loginResponse.access_token);
    this._tokenExpiresAt = token.exp;

    return loginResponse;
  }

  async refreshExpiredToken(): Promise<ILoginResponse>{
    return this._http.get<ILoginResponse>(``)
      .pipe(map((loginResponse: ILoginResponse) => {
        this._accessToken = loginResponse.access_token;
        this._refreshToken = loginResponse.refresh_token;
        let token = jwtDecode(this.accessToken);
        this._tokenExpiresAt = token.exp;
        return loginResponse;
      }))
      .toPromise();
  }

  get accessToken(): string{
    return this._accessToken;
  }

  get refreshToken(): string {
    return this._refreshToken;
  }

  get tokenExpiresAt(): number {
    return this._tokenExpiresAt;
  }

  get isLoggedIn(): boolean{
    return (this._accessToken && this._accessToken.length > 0) ? true : false
  }
}
