import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalsPopupComponent } from './goals-popup.component';

describe('GoalsPopupComponent', () => {
  let component: GoalsPopupComponent;
  let fixture: ComponentFixture<GoalsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GoalsPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GoalsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
