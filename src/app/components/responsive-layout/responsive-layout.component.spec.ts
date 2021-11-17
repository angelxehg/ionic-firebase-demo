import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';

import { ResponsiveLayoutComponent } from './responsive-layout.component';
import { FeaturesService, mockFeaturesService } from 'src/app/services/features.service';

describe('ResponsiveLayoutComponent', () => {
  let component: ResponsiveLayoutComponent;
  let fixture: ComponentFixture<ResponsiveLayoutComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ResponsiveLayoutComponent],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule
      ],
      providers: [
        { provide: FeaturesService, useValue: mockFeaturesService }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ResponsiveLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
