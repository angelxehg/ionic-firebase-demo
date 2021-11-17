import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import firebase from 'firebase/app';

import { AngularFireAuth } from '@angular/fire/auth';

import { EmailLogin } from 'src/app/models';

import { errorToast } from 'src/app/models/toast';

@Component({
  selector: 'app-reauthenticate-wall',
  templateUrl: './reauthenticate-wall.component.html',
  styleUrls: ['./reauthenticate-wall.component.scss'],
})
export class ReauthenticateWallComponent {

  @Input() defaultMethod: 'password' | 'google.com';
  readyToContinue = false;
  user: firebase.User | undefined;

  reautenticateForm = new FormGroup({
    email: new FormControl('', Validators.compose([
      Validators.required, Validators.email
    ])),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private auth: AngularFireAuth,
    private location: Location,
    private toast: ToastController
  ) {
    this.auth.currentUser.then(user => {
      this.user = user;
      if (user) {
        this.reautenticateForm.setValue({
          email: user.email, password: ''
        });
      }
    });
  }

  async handleReauthenticate() {
    const credential: EmailLogin = this.reautenticateForm.value;
    this.reautenticateForm.disable();
    const loginToast = await this.toast.create({
      message: 'Login in again...',
    });
    loginToast.present();
    try {
      if (!this.user) {
        throw new Error('You must login to continue');
      }
      const { email, password } = credential;
      const emailCredential = firebase.auth.EmailAuthProvider.credential(email, password);
      await this.user.reauthenticateWithCredential(emailCredential);
      // Success
      loginToast.dismiss();
      this.toast.create({
        message: 'Login successful!',
        duration: 1500,
        color: 'success'
      }).then(t => t.present());
      this.readyToContinue = true;
      this.reautenticateForm.enable();
    } catch (err) {
      loginToast.dismiss();
      this.reautenticateForm.enable();
      this.toast.create(errorToast(err.message)).then(t => t.present());
    }
  }

  async reloginWithGoogle() {
    this.reautenticateForm.disable();
    const loginToast = await this.toast.create({
      message: 'Login in again...',
    });
    loginToast.present();
    try {
      if (!this.user) {
        throw new Error('You must login to continue');
      }
      const googleProvider = new firebase.auth.GoogleAuthProvider();
      await this.user.reauthenticateWithPopup(googleProvider);
      // Success
      loginToast.dismiss();
      this.toast.create({
        message: 'Login successful!',
        duration: 1500,
        color: 'success'
      }).then(t => t.present());
      this.readyToContinue = true;
      this.reautenticateForm.enable();
    } catch (err) {
      loginToast.dismiss();
      this.reautenticateForm.enable();
      this.toast.create(errorToast(err.message)).then(t => t.present());
    }
  }

  cancelAction = () => this.location.back();

}
