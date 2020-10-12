import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RegisterModalComponent } from '../register-modal/register-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private _modal: ModalController) { }

  async ngOnInit() {
    const modal = await this._modal.create({
      component: RegisterModalComponent
    })
    modal.present();
  }

}
