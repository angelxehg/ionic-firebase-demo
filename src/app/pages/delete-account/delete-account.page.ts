import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import firebase from 'firebase/compat/app';

import { AngularFireAuth } from '@angular/fire/compat/auth';

import { errorToast } from 'src/app/models/toast';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.page.html',
  styleUrls: ['./delete-account.page.scss'],
})
export class DeleteAccountPage {

  user: firebase.User | undefined;
  lockUI = false;
  defaultEmail = '';

  constructor(
    private auth: AngularFireAuth,
    private toast: ToastController,
    private router: Router,
  ) {
    this.auth.currentUser.then(user => {
      this.user = user;
      if (user) {
        this.defaultEmail = user.email;
      }
    });
  }

  async deleteAccount() {
    this.lockUI = true;
    const wipToast = await this.toast.create({
      message: 'Deleting account...',
    });
    wipToast.present();
    try {
      await this.user.delete();
      wipToast.dismiss();
      this.toast.create({
        message: 'Account deleted',
        duration: 1500,
        color: 'success'
      }).then(t => t.present());
      await this.auth.signOut();
      this.router.navigateByUrl('/login', { replaceUrl: true });
    } catch (err) {
      wipToast.dismiss();
      this.lockUI = false;
      this.toast.create(errorToast(err.message)).then(t => t.present());
    }
  }

}
