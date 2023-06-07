import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawmaterialmanagmentComponent } from './rawmaterialmanagment.component';

describe('RawmaterialmanagmentComponent', () => {
  let component: RawmaterialmanagmentComponent;
  let fixture: ComponentFixture<RawmaterialmanagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RawmaterialmanagmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RawmaterialmanagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
