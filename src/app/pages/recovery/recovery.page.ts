import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

import { AngularFireAuth } from '@angular/fire/auth';

import { errorToast } from 'src/app/models/toast';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.page.html',
  styleUrls: ['./recovery.page.scss'],
})
export class RecoveryPage {

  recoveryForm = new FormGroup({
    email: new FormControl('', Validators.compose([
      Validators.required, Validators.email
    ])),
  });

  constructor(
    private auth: AngularFireAuth,
    private toast: ToastController,
    private router: Router,
  ) { }

  async handleRecovery() {
    const {email} = this.recoveryForm.value;
    this.recoveryForm.disable();
    // Toast in progress
    const loginToast = await this.toast.create({
      message: 'Sending recovery email...',
      color: 'primary'
    });
    loginToast.present();
    try {
      if (email === '') {
        throw new Error('Email is required');
      }
      await this.auth.sendPasswordResetEmail(email);
      loginToast.dismiss();
      this.toast.create({
        message: 'Recovery email sent!',
        duration: 1500,
        color: 'success'
      }).then(t => t.present());
      this.router.navigateByUrl('/login', { replaceUrl: true });
    } catch (err) {
      loginToast.dismiss();
      this.recoveryForm.enable();
      this.toast.create(errorToast(err.message)).then(t => t.present());
    }
  }

}
