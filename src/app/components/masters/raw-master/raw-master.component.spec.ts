import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawMasterComponent } from './raw-master.component';

describe('RawMasterComponent', () => {
  let component: RawMasterComponent;
  let fixture: ComponentFixture<RawMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RawMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RawMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
