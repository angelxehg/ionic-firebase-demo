import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { AngularFireAuth } from '@angular/fire/auth';
import { mockAngularFireAuth } from 'src/app/models/angular-fire';

import { ChangeEmailPage } from './change-email.page';

describe('ChangeEmailPage', () => {
  let component: ChangeEmailPage;
  let fixture: ComponentFixture<ChangeEmailPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeEmailPage ],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: AngularFireAuth, useValue: mockAngularFireAuth },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeEmailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
