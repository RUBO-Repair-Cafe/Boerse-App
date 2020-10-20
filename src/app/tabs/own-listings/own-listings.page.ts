import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { LoginModalComponent } from '../login-modal/login-modal.component';

@Component({
  selector: 'rubo-own-listings',
  templateUrl: './own-listings.page.html',
  styleUrls: ['./own-listings.page.scss'],
})
export class OwnListingsPage implements OnInit {

  constructor(
    private _auth: AuthService,
    private _modal: ModalController,
  ) { }

  ngOnInit() {
  }

  async ionViewWillEnter(){
    if (!this.isLoggedIn) {
      const modal = await this._modal.create({
        component: LoginModalComponent,
      })
      modal.present();
    }
  }

  get isLoggedIn(): boolean {
    return this._auth.isLoggedIn;
  }

}
