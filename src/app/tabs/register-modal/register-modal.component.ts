import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss'],
})
export class RegisterModalComponent implements OnInit {

  constructor(
    private readonly _modalController: ModalController
  ) { }

  ngOnInit() {}

  onClose(){
    this._modalController.dismiss();
  }
}
