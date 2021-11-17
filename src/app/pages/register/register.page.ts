import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

import { AngularFireAuth } from '@angular/fire/compat/auth';

import { EmailLogin } from 'src/app/models';

import { errorToast } from 'src/app/models/toast';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  registerForm = new FormGroup({
    email: new FormControl('', Validators.compose([
      Validators.required, Validators.email
    ])),
    password: new FormControl('', Validators.required),
    passwordConfirmation: new FormControl('', Validators.required),
  });

  constructor(
    private auth: AngularFireAuth,
    private toast: ToastController,
    private router: Router,
  ) { }

  async handleEmailRegister() {
    const credential: EmailLogin = this.registerForm.value;
    this.registerForm.disable();
    // Toast in progress
    const registerToast = await this.toast.create({
      message: 'Creating account...',
    });
    registerToast.present();
    try {
      if (credential.password !== credential.passwordConfirmation) {
        throw new Error('Password doesn\'t match password confirmation');
      }
      const { email, password } = credential;
      const newCredential = await this.auth.createUserWithEmailAndPassword(email, password);
      await newCredential.user.sendEmailVerification();
      // Success
      registerToast.dismiss();
      this.toast.create({
        message: 'Successful register! Verification email sent!',
        duration: 1500,
        color: 'success'
      }).then(t => t.present());
      this.router.navigateByUrl('/', { replaceUrl: true });
    } catch (err) {
      registerToast.dismiss();
      this.registerForm.enable();
      this.toast.create(errorToast(err.message)).then(t => t.present());
    }
  }

}
