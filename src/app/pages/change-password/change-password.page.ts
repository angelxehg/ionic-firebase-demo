import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import firebase from 'firebase/app';

import { AngularFireAuth } from '@angular/fire/auth';

import { EmailLogin } from 'src/app/models';

import { errorToast } from 'src/app/models/toast';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage {

  user: firebase.User | undefined;

  changePasswordForm = new FormGroup({
    password: new FormControl('', Validators.required),
    passwordConfirmation: new FormControl('', Validators.required),
  });

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private toast: ToastController
  ) {
    this.auth.currentUser.then(user => this.user = user);
  }

  async handlePasswordChange() {
    this.changePasswordForm.disable();
    const credential: EmailLogin = this.changePasswordForm.value;
    const wipToast = await this.toast.create({
      message: 'Updating password...',
    });
    wipToast.present();
    try {
      if (credential.password !== credential.passwordConfirmation) {
        throw new Error('Password doesn\'t match password confirmation');
      }
      if (!this.user) {
        throw new Error('You must login to continue');
      }
      await this.user.updatePassword(credential.password);
      wipToast.dismiss();
      this.toast.create({
        message: 'Password updated. Login again with your new password',
        duration: 1500,
        color: 'success'
      }).then(t => t.present());
      await this.auth.signOut();
      this.router.navigateByUrl('/login', { replaceUrl: true });
    } catch (err) {
      wipToast.dismiss();
      this.changePasswordForm.enable();
      this.toast.create(errorToast(err.message)).then(t => t.present());
    }
  }

}
