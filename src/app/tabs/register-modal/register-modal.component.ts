import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { ValidateEmail } from 'src/app/Validators/email.validator';
import { validatePhoneNumber } from 'src/app/Validators/phoneNumber.validator';
import { INewUser } from 'src/shared/interfaces/user/newUser.dto';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss'],
})
export class RegisterModalComponent implements OnInit {

  registrationForm: FormGroup
  private _loading: HTMLIonLoadingElement;

  constructor(
    private readonly _modalController: ModalController,
    private readonly _fb: FormBuilder,
    private readonly _authService: AuthService,
    private readonly _loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.createRegistrationForm();
  }

  createRegistrationForm(): void{
    this.registrationForm = this._fb.group({
      email: ['', [Validators.required, ValidateEmail]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required, this.checkPasswordMatch.bind(this)]],
      firstName: ['', [Validators.required]],
      name: ['', [Validators.required]],
      phoneNumber: [null, [validatePhoneNumber]]
    }, {validators: [ ]})

    this.registrationForm.valueChanges.subscribe(() => {
      console.log(this.registrationForm);
      console.log(!this.registrationForm.valid);
    })
  }

  onClose(){
    this._modalController.dismiss();
  }

  private checkPasswordMatch(input): { [s: string]: boolean } {
    console.log('checkPasswordMatch');
    if (input.value != this.registrationForm?.get('password').value) {
      console.log('mismatch');
      return { mismatch: true };
    } else {
      console.log('match');
      return null;
    }
  }

  async onRegister(){
    const data = this.registrationForm.value as INewUser;
    try {
      this._loading = await this._loadingController.create()
      this._loading.present();
      await this._authService.registerUser(data)
    } catch (error) {
      console.error(error);
    } finally {
      this._loading.dismiss();
    }
  }
}
