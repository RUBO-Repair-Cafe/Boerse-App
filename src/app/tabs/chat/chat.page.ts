import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoginModalComponent } from '../login-modal/login-modal.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  constructor(
    private readonly _modalController: ModalController
  ) { }

  ngOnInit() {
  }

  async onLogin(){
    const modal = await this._modalController.create({
      component: LoginModalComponent,
      swipeToClose: true,
    });

    return await modal.present();
  }

}
