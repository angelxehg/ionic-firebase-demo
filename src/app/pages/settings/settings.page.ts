import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import firebase from 'firebase/app';

import { AngularFireAuth } from '@angular/fire/auth';
import { FeaturesService } from 'src/app/services/features.service';

import { errorToast, successUnlinkProvider, waitUnlinkProvider } from 'src/app/models/toast';
import { getProviderMeta } from 'src/app/models';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {

  user: firebase.User | undefined;
  fetchingUpdates = false;
  lockVerifyButton = false;

  getProviderMeta = getProviderMeta;

  constructor(
    private auth: AngularFireAuth,
    private alert: AlertController,
    private router: Router,
    private toast: ToastController,
    public features: FeaturesService,
  ) { }

  ionViewWillEnter() {
    this.auth.currentUser.then(user => this.user = user);
  }

  hasProvider = (providerId: string) => {
    if (!this.user) {
      return false;
    }
    const foundProvider = this.user.providerData.find(
      provider => provider.providerId === providerId
    );
    if (foundProvider) {
      return true;
    }
    return false;
  };

  checkUpdates() {
    if (this.features.updateAvailable) {
      return this.features.reload();
    }
    this.fetchingUpdates = true;
    setTimeout(() => this.fetchingUpdates = false, 10000);
    this.features.checkUpdates(false, () => { this.fetchingUpdates = false; });
  }

  async logout() {
    await this.auth.signOut();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

  async sendEmailVerification() {
    if (this.user.emailVerified) {
      return this.toast.create({
        message: 'Email has already been verified',
        duration: 1500,
        color: 'success'
      }).then(t => t.present());
    }
    if (this.lockVerifyButton) {
      return this.toast.create({
        message: 'Wait to send another verification email',
        duration: 1500,
        color: 'danger'
      }).then(t => t.present());
    }
    // Toast in progress
    this.lockVerifyButton = true;
    const wipToast = await this.toast.create({
      message: 'Sending verification email...',
    });
    wipToast.present();
    try {
      if (!this.user) {
        throw new Error('You must login to continue');
      }
      await this.user.sendEmailVerification();
      // Success
      wipToast.dismiss();
      this.toast.create({
        message: 'Verification email sent!',
        duration: 1500,
        color: 'success'
      }).then(t => t.present());
      setTimeout(() => this.lockVerifyButton = false, 5000);
    } catch (err) {
      wipToast.dismiss();
      this.toast.create(errorToast(err.message)).then(t => t.present());
      setTimeout(() => this.lockVerifyButton = false, 1000);
    }
  }

  removeProvider(provider: firebase.UserInfo) {
    if (this.user.providerData.length <= 1) {
      return;
    }
    if (provider.providerId === 'password') {
      return;
    }
    const providerMeta = getProviderMeta(provider);
    this.alert.create({
      header: 'Remove provider',
      message: `Do you want to remove ${providerMeta.title}?`,
      buttons: ['Cancel',
        {
          text: 'Remove',
          handler: async () => {
            const wipToast = await this.toast.create(waitUnlinkProvider(providerMeta.title));
            wipToast.present();
            try {
              if (this.user.providerData.length <= 1) {
                throw new Error('You must keep at least one authentication provider');
              }
              await this.user.unlink(provider.providerId);
              wipToast.dismiss();
              this.toast.create(successUnlinkProvider(providerMeta.title)).then(t => t.present());
            } catch (err) {
              wipToast.dismiss();
              this.toast.create(errorToast(err.message)).then(t => t.present());
            }
          }
        }
      ]
    }).then(a => a.present());
  }

  nameChangePopup() {
    this.alert.create({
      header: 'Change name',
      inputs: [
        {
          name: 'newName',
          type: 'text',
          placeholder: 'Input your name'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Cambiar',
          handler: async ({ newName }) => {
            const wipToast = await this.toast.create({
              message: 'Updating profile...',
            });
            wipToast.present();
            try {
              if (!this.user) {
                throw new Error('You must login to continue');
              }
              await this.user.updateProfile({
                displayName: newName
              });
              wipToast.dismiss();
              this.toast.create({
                message: 'Profile updated',
                duration: 1500,
                color: 'success'
              }).then(t => t.present());
            } catch (err) {
              wipToast.dismiss();
              this.toast.create(errorToast(err.message)).then(t => t.present());
            }
          }
        }
      ]
    }).then(a => a.present());
  }

}
