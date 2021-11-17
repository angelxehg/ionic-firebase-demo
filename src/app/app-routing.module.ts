import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

import { ResponsiveLayoutComponent } from './components/responsive-layout/responsive-layout.component';

const redirectLoggedInToHome = () => redirectLoggedInTo(['/home']);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/login']);

const routes: Routes = [
  {
    path: '',
    component: ResponsiveLayoutComponent,
    ...canActivate(redirectUnauthorizedToLogin),
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
      },
      {
        path: 'settings',
        loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule)
      },
    ]
  },
  {
    path: 'auth',
    redirectTo: ''
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    ...canActivate(redirectLoggedInToHome),
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule),
    ...canActivate(redirectLoggedInToHome),
  },
  {
    path: 'verify',
    loadChildren: () => import('./pages/verify/verify.module').then( m => m.VerifyPageModule)
  },
  {
    path: 'recovery',
    loadChildren: () => import('./pages/recovery/recovery.module').then( m => m.RecoveryPageModule)
  },
  {
    path: 'linkGoogle',
    loadChildren: () => import('./pages/link-google/link-google.module').then( m => m.LinkGooglePageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'changeEmail',
    loadChildren: () => import('./pages/change-email/change-email.module').then( m => m.ChangeEmailPageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'changePassword',
    loadChildren: () => import('./pages/change-password/change-password.module').then( m => m.ChangePasswordPageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'createPassword',
    loadChildren: () => import('./pages/create-password/create-password.module').then( m => m.CreatePasswordPageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'deleteAccount',
    loadChildren: () => import('./pages/delete-account/delete-account.module').then( m => m.DeleteAccountPageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
