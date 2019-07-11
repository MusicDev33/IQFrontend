import { TestBed } from '@angular/core/testing';

import { VotesService } from './votes.service';

describe('VotesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VotesService = TestBed.get(VotesService);
    expect(service).toBeTruthy();
  });
});
