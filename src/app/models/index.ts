import firebase from 'firebase/app';

export interface EmailLogin {
  email?: string;
  password?: string;
  passwordConfirmation?: string;
}

export const getProviderMeta = (provider: firebase.UserInfo) => {
  switch (provider.providerId) {
    case 'google.com':
      return {
        title: 'Google',
        icon: 'logo-google',
        display: provider.displayName,
      };
    case 'password':
      return {
        title: 'Email & password',
        icon: 'mail-outline',
        display: provider.email,
      };
    default:
      return {
        title: 'Unknown',
        icon: 'help-outline',
        display: provider.email,
      };
  }
};
