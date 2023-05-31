import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdcutaddComponent } from './prodcutadd.component';

describe('ProdcutaddComponent', () => {
  let component: ProdcutaddComponent;
  let fixture: ComponentFixture<ProdcutaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdcutaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdcutaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
