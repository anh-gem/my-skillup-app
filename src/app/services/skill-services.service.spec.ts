import { TestBed } from '@angular/core/testing';

import { SkillServicesService } from './skill-services.service';

describe('SkillServicesService', () => {
  let service: SkillServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkillServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
