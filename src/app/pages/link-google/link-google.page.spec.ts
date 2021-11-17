import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { mockAngularFireAuth } from 'src/app/models/angular-fire';
import { LinkGooglePage } from './link-google.page';

describe('LinkGooglePage', () => {
  let component: LinkGooglePage;
  let fixture: ComponentFixture<LinkGooglePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkGooglePage ],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule,
        FormsModule,
      ],
      providers: [
        { provide: AngularFireAuth, useValue: mockAngularFireAuth },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LinkGooglePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
