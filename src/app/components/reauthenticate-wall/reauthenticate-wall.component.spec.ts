import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { mockAngularFireAuth } from 'src/app/models/angular-fire';

import { ReauthenticateWallComponent } from './reauthenticate-wall.component';

describe('ReauthenticateWallComponent', () => {
  let component: ReauthenticateWallComponent;
  let fixture: ComponentFixture<ReauthenticateWallComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReauthenticateWallComponent ],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: AngularFireAuth, useValue: mockAngularFireAuth },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ReauthenticateWallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
