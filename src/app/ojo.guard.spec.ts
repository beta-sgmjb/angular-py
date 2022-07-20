import { TestBed } from '@angular/core/testing';

import { OjoGuard } from './ojo.guard';

describe('OjoGuard', () => {
  let guard: OjoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OjoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
