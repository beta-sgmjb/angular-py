import { TestBed } from '@angular/core/testing';

import { PppService } from './ppp.service';

describe('PppService', () => {
  let service: PppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
