import { TestBed } from '@angular/core/testing';
import { ServiceWorkerModule } from '@angular/service-worker';

import { FeaturesService } from './features.service';

describe('FeaturesService', () => {
  let service: FeaturesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ServiceWorkerModule.register('', { enabled: false })
      ]
    });
    service = TestBed.inject(FeaturesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
