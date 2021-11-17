import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { SettingsPage } from './settings.page';
import { FeaturesService, mockFeaturesService } from '../../services/features.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { mockAngularFireAuth } from 'src/app/models/angular-fire';

describe('SettingsPage', () => {
  let component: SettingsPage;
  let fixture: ComponentFixture<SettingsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsPage],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule,
      ],
      providers: [
        { provide: AngularFireAuth, useValue: mockAngularFireAuth },
        { provide: FeaturesService, useValue: mockFeaturesService }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
