import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryAddProductsComponent } from './inventory-add-products.component';

describe('InventoryAddProductsComponent', () => {
  let component: InventoryAddProductsComponent;
  let fixture: ComponentFixture<InventoryAddProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryAddProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryAddProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
