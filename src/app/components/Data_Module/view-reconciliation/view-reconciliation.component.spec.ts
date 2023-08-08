import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReconciliationComponent } from './view-reconciliation.component';

describe('ViewReconciliationComponent', () => {
  let component: ViewReconciliationComponent;
  let fixture: ComponentFixture<ViewReconciliationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewReconciliationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewReconciliationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
