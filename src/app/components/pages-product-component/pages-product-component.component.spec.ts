import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesProductComponentComponent } from './pages-product-component.component';

describe('PagesProductComponentComponent', () => {
  let component: PagesProductComponentComponent;
  let fixture: ComponentFixture<PagesProductComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagesProductComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagesProductComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
