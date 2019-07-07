import { TestBed } from '@angular/core/testing';

import { IpgenService } from './ipgen.service';

describe('IpgenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IpgenService = TestBed.get(IpgenService);
    expect(service).toBeTruthy();
  });
});
