import { TestBed } from '@angular/core/testing';

import { BingmapsService } from './bingmaps.service';

describe('BingmapsService', () => {
  let service: BingmapsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BingmapsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
