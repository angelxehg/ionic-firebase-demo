import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import firebase from 'firebase/app';

import { AngularFireAuth } from '@angular/fire/auth';

import { EmailLogin } from 'src/app/models';

import { errorToast } from 'src/app/models/toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  loginForm = new FormGroup({
    email: new FormControl('', Validators.compose([
      Validators.required, Validators.email
    ])),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private auth: AngularFireAuth,
    private toast: ToastController,
    private router: Router,
  ) { }

  async handleLogin() {
    const credential: EmailLogin = this.loginForm.value;
    this.loginForm.disable();
    // Toast in progress
    const loginToast = await this.toast.create({
      message: 'Login in...',
    });
    loginToast.present();
    try {
      const { email, password } = credential;
      await this.auth.signInWithEmailAndPassword(email, password);
      // Success
      loginToast.dismiss();
      this.toast.create({
        message: 'Login successful',
        duration: 1500,
        color: 'success'
      }).then(t => t.present());
      this.router.navigateByUrl('/', { replaceUrl: true });
    } catch (err) {
      loginToast.dismiss();
      this.loginForm.enable();
      this.toast.create(errorToast(err.message)).then(t => t.present());
    }
  }

  async googleLogin() {
    this.loginForm.disable();
    // Toast in progress
    const loginToast = await this.toast.create({
      message: 'Login in with Google...',
    });
    loginToast.present();
    try {
      const googleProvider = new firebase.auth.GoogleAuthProvider();
      await this.auth.signInWithPopup(googleProvider);
      // Success
      loginToast.dismiss();
      this.toast.create({
        message: 'Login successful',
        duration: 1500,
        color: 'success'
      }).then(t => t.present());
      this.router.navigateByUrl('/', { replaceUrl: true });
    } catch (err) {
      loginToast.dismiss();
      this.loginForm.enable();
      this.toast.create(errorToast(err.message)).then(t => t.present());
    }
  }

}
