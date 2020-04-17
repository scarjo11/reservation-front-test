import { TestBed } from '@angular/core/testing';

import { ChooseslotService } from './chooseslot.service';

describe('ChooseslotService', () => {
  let service: ChooseslotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChooseslotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
