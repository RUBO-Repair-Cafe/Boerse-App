import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { ValidateEmail } from 'src/app/Validators/email.validator';
import { ILoginRequest } from 'src/shared/interfaces/auth/loginRequest.interface';
import { RegisterModalComponent } from '../register-modal/register-modal.component';
import { Plugins } from '@capacitor/core'

const { Device } = Plugins;

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent implements OnInit {

  loginForm: FormGroup;
  isIOS = false;
  init = false;

  constructor(
    private readonly _modalController: ModalController,
    private readonly _fb: FormBuilder,
    private _auth: AuthService,
    private readonly _loading: LoadingController
  ) { }

  ngOnInit() {
    Device.getInfo()
    .then((info) => {
      if (info.platform === 'ios'){
        this.isIOS = true;
      }
      this.init = true;
    })
    this._createLoginForm();
  }

  private _createLoginForm(){
    this.loginForm = this._fb.group({
      email: ['', [ValidateEmail, Validators.required]],
      password: ['', Validators.required]
    });
  }

  onClose(){
    this._modalController.dismiss();
  }

 async onOpenRegister(){
    const modal = await this._modalController.create({
      component: RegisterModalComponent
    });
    modal.present();
  }

  async onLogin(){
    const loginValues: ILoginRequest = this.loginForm.value;
    const loading = await this._loading.create();
    loading.present();
    try {
      await this._auth.loginUser(loginValues);
      this._modalController.dismiss();
    } catch (error) {
      console.error(error);
    } finally {
      loading.dismiss();
    }
  }

}
