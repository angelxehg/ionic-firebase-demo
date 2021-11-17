import { ToastOptions } from '@ionic/core';

export const waitUnlinkProvider = (name: string): ToastOptions => ({
  message: `Unlinking ${name}...`,
});

export const successUnlinkProvider = (name: string): ToastOptions => ({
  message: `${name} was unlinked`,
  duration: 1500,
  color: 'success'
});

export const errorToast = (message?: string): ToastOptions => ({
  message: message || 'Unknown error',
  duration: 1500,
  color: 'danger'
});
