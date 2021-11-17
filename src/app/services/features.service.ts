import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { ToastController } from '@ionic/angular';

export const mockFeaturesService = {
  checkUpdates: () => { }
};

@Injectable({
  providedIn: 'root'
})
export class FeaturesService {

  public updateAvailable = false;

  constructor(
    private toast: ToastController,
    private swUpdate: SwUpdate
  ) {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => this.updateAvailable = true);
    }
  }

  public async checkUpdates(silent: boolean = false, onCancel = () => { }) {
    // Toast in progress
    const wipToast = await this.toast.create({
      message: 'Buscando actualizaciones...',
      duration: 5000,
    });
    if (!silent) {
      wipToast.present();
    }
    try {
      if (!this.swUpdate.isEnabled) {
        throw new Error('Las actualizaciones no estan activadas');
      }
      this.swUpdate.checkForUpdate().then(() => {
        wipToast.dismiss();
        onCancel();
      });
    } catch (err) {
      wipToast.dismiss();
      onCancel();
      if (!silent) {
        this.toast.create({
          message: err.message || 'Error desconocido',
          duration: 1500,
          color: 'danger'
        }).then(t => t.present());
      }
    }
  }

  public reload = () => window.location.reload();
}
