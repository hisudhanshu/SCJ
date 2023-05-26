import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostAdjustmentComponent } from './cost-adjustment.component';

describe('CostAdjustmentComponent', () => {
  let component: CostAdjustmentComponent;
  let fixture: ComponentFixture<CostAdjustmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostAdjustmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CostAdjustmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
