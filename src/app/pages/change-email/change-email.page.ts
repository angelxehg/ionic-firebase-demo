import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import firebase from 'firebase/app';

import { AngularFireAuth } from '@angular/fire/auth';

import { EmailLogin } from 'src/app/models';

import { errorToast } from 'src/app/models/toast';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.page.html',
  styleUrls: ['./change-email.page.scss'],
})
export class ChangeEmailPage {

  user: firebase.User | undefined;

  changeEmailForm = new FormGroup({
    email: new FormControl('', Validators.compose([
      Validators.required, Validators.email
    ])),
  });

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private toast: ToastController
  ) {
    this.auth.currentUser.then(user => this.user = user);
  }

  async handleEmailChange() {
    this.changeEmailForm.disable();
    const credential: EmailLogin = this.changeEmailForm.value;
    const wipToast = await this.toast.create({
      message: 'Updating email...',
    });
    wipToast.present();
    try {
      if (!this.user) {
        throw new Error('You must login to continue');
      }
      await this.user.verifyBeforeUpdateEmail(credential.email);
      wipToast.dismiss();
      this.toast.create({
        message: 'A verification email was sent to your new address. You must login again with your new email',
        duration: 1500,
        color: 'success'
      }).then(t => t.present());
      await this.auth.signOut();
      this.router.navigateByUrl('/login', { replaceUrl: true });
    } catch (err) {
      wipToast.dismiss();
      this.changeEmailForm.enable();
      this.toast.create(errorToast(err.message)).then(t => t.present());
    }
  }

}
