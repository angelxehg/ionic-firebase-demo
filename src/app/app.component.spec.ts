import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppComponent } from './app.component';
import { FeaturesService, mockFeaturesService } from './services/features.service';

describe('AppComponent', () => {

  beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        ServiceWorkerModule.register('', { enabled: false })
      ],
      providers: [
        { provide: FeaturesService, useValue: mockFeaturesService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
  // TODO: add more tests!

});
