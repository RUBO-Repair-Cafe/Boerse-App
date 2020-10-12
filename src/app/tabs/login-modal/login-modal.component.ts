import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RegisterModalComponent } from '../register-modal/register-modal.component';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent implements OnInit {

  constructor(
    private readonly _modalController: ModalController
  ) { }

  ngOnInit() {}

  onClose(){
    this._modalController.dismiss();
  }

 async onOpenRegister(){
    const modal = await this._modalController.create({
      component: RegisterModalComponent
    });
    modal.present();
  }

}
