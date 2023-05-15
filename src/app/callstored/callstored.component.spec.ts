import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallstoredComponent } from './callstored.component';

describe('CallstoredComponent', () => {
  let component: CallstoredComponent;
  let fixture: ComponentFixture<CallstoredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallstoredComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallstoredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
