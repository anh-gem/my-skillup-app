import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalsManagementComponent } from './goals-management.component';

describe('GoalsManagementComponent', () => {
  let component: GoalsManagementComponent;
  let fixture: ComponentFixture<GoalsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GoalsManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GoalsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
