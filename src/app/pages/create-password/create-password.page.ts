import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import firebase from 'firebase/compat';

import { AngularFireAuth } from '@angular/fire/compat/auth';

import { EmailLogin } from 'src/app/models';

import { errorToast } from 'src/app/models/toast';

@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.page.html',
  styleUrls: ['./create-password.page.scss'],
})
export class CreatePasswordPage {

  user: firebase.User | undefined;

  reautenticateForm = new FormGroup({
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
  ) {
    this.auth.currentUser.then(user => {
      this.user = user;
      if (user) {
        this.reautenticateForm.setValue({
          email: user.email, password: '', passwordConfirmation: ''
        });
      }
    });
  }

  async handleCreatePassword() {
    const credential: EmailLogin = this.reautenticateForm.value;
    this.reautenticateForm.disable();
    // Toast in progress
    const registerToast = await this.toast.create({
      message: 'Setting up email & password...',
    });
    registerToast.present();
    try {
      if (!this.user) {
        throw new Error('You must login to continue');
      }
      const hasPassword = this.user.providerData.find(
        provider => provider.providerId === 'password'
      );
      if (hasPassword) {
        throw new Error('You have an email & password already configured');
      }
      if (credential.password !== credential.passwordConfirmation) {
        throw new Error('Password doesn\'t match password confirmation');
      }
      const { email, password } = credential;
      const emailCredential = firebase.auth.EmailAuthProvider.credential(email, password);
      await this.user.linkWithCredential(emailCredential);
      // Success
      registerToast.dismiss();
      this.toast.create({
        message: 'Email and password set successfully!',
        duration: 1500,
        color: 'success'
      }).then(t => t.present());
      this.router.navigateByUrl('/settings', { replaceUrl: true });
    } catch (err) {
      registerToast.dismiss();
      this.reautenticateForm.enable();
      this.toast.create(errorToast(err.message)).then(t => t.present());
    }
  }

}
