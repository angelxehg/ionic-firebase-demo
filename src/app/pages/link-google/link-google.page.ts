import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

import firebase from 'firebase/app';

import { AngularFireAuth } from '@angular/fire/auth';

import { errorToast } from 'src/app/models/toast';

@Component({
  selector: 'app-link-google',
  templateUrl: './link-google.page.html',
  styleUrls: ['./link-google.page.scss'],
})
export class LinkGooglePage {

  lockUI = false;
  modeUI = 'verify';
  user: firebase.User | undefined;
  defaultEmail = '';
  readyToContinue = false;

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private toast: ToastController
  ) {
    this.auth.currentUser.then(user => {
      this.user = user;
      if (user) {
        this.defaultEmail = user.email;
      }
    });
  }

  async linkGoogleProvider() {
    const wipToast = await this.toast.create({
      message: 'Login in with Google...',
    });
    this.lockUI = true;
    wipToast.present();
    try {
      if (!this.user) {
        throw new Error('You must login to continue');
      }
      const googleProvider = new firebase.auth.GoogleAuthProvider();
      const cred = await this.user.linkWithPopup(googleProvider);
      if (cred.additionalUserInfo) {
        const profile: {
          name?: string;
          picture?: string;
        } = cred.additionalUserInfo.profile;
        const displayName = profile.name;
        const photoURL = profile.picture;
        cred.user.updateProfile({ displayName, photoURL });
      }
      wipToast.dismiss();
      this.toast.create({
        message: 'Google login successful',
        duration: 1500,
        color: 'success'
      }).then(t => t.present());
      this.router.navigateByUrl('/', { replaceUrl: true });
    } catch (err) {
      wipToast.dismiss();
      this.lockUI = false;
      this.toast.create(errorToast(err.message)).then(t => t.present());
    }
  }

}
