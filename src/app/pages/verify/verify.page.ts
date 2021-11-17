import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

import { AngularFireAuth } from '@angular/fire/auth';

import { EmailLogin } from 'src/app/models';

import { errorToast } from 'src/app/models/toast';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.page.html',
  styleUrls: ['./verify.page.scss'],
})
export class VerifyPage {

  modeUI = 'verify';
  message = 'Verification in progress';

  changePasswordForm = new FormGroup({
    password: new FormControl('', Validators.required),
    passwordConfirmation: new FormControl('', Validators.required),
  });

  private oobCode = '';

  constructor(
    private route: ActivatedRoute,
    private auth: AngularFireAuth,
    private router: Router,
    private toast: ToastController
  ) { }

  async ionViewWillEnter() {
    const params = this.route.snapshot.queryParams;
    if (params.mode === 'recoverEmail') {
      return this.recoverEmail(params.oobCode);
    }
    if (params.mode === 'verifyEmail') {
      return this.verifyEmail(params.oobCode);
    }
    if (params.mode === 'verifyAndChangeEmail') {
      return this.verifyEmail(params.oobCode);
    }
    if (params.mode === 'resetPassword') {
      return this.resetPassword(params.oobCode);
    }
    // Feature not available
    this.toast.create(errorToast(`Código '${params.mode}' desconocido`)).then(t => t.present());
    return setTimeout(() => this.returnToBase(), 1500);
  }

  async recoverEmail(oobCode: string) {
    try {
      if (!oobCode) {
        throw new Error('No obbCode provided');
      }
      await this.auth.checkActionCode(oobCode);
      await this.auth.applyActionCode(oobCode);
      // Success
      this.toast.create({
        message: 'Email restablished!',
        duration: 1500,
        color: 'success'
      }).then(t => t.present());
    } catch (err) {
      this.toast.create(errorToast(err.message)).then(t => t.present());
    }
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  async verifyEmail(oobCode: string) {
    try {
      if (!oobCode) {
        throw new Error('No obbCode provided');
      }
      await this.auth.checkActionCode(oobCode);
      await this.auth.applyActionCode(oobCode);
      // Success
      this.toast.create({
        message: 'Email veridied',
        duration: 1500,
        color: 'success'
      }).then(t => t.present());
    } catch (err) {
      this.toast.create(errorToast(err.message)).then(t => t.present());
    }
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  async resetPassword(oobCode: string) {
    try {
      if (!oobCode) {
        throw new Error('No obbCode provided');
      }
      await this.auth.checkActionCode(oobCode);
      this.oobCode = oobCode;
      this.modeUI = 'resetPassword';
      this.message = 'Change password';
    } catch (err) {
      this.toast.create(errorToast(err.message)).then(t => t.present());
      return setTimeout(() => this.returnToBase(), 1500);
    }
    if (!oobCode) {
      return setTimeout(() => this.returnToBase(), 1500);
    }
  }

  async handlePasswordReset() {
    const credential: EmailLogin = this.changePasswordForm.value;
    this.changePasswordForm.disable();
    const registerToast = await this.toast.create({
      message: 'Changing password...',
    });
    registerToast.present();
    try {
      if (credential.password !== credential.passwordConfirmation) {
        throw new Error('Password doesn\'t match password confirmation');
      }
      await this.auth.confirmPasswordReset(this.oobCode, credential.password);
      registerToast.dismiss();
      // Success
      this.toast.create({
        message: 'Password changed!',
        duration: 1500,
        color: 'success'
      }).then(t => t.present());
      this.router.navigateByUrl('/login', { replaceUrl: true });
    } catch (err) {
      registerToast.dismiss();
      this.changePasswordForm.disable();
      this.toast.create(errorToast(err.message)).then(t => t.present());
    }
  }

  private returnToBase() {
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

}
