import { TestBed } from '@angular/core/testing';

import { CallstoredService } from './callstored.service';

describe('CallstoredService', () => {
  let service: CallstoredService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CallstoredService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
