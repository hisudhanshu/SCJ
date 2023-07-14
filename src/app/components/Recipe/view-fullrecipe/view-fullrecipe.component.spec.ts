import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFullrecipeComponent } from './view-fullrecipe.component';

describe('ViewFullrecipeComponent', () => {
  let component: ViewFullrecipeComponent;
  let fixture: ComponentFixture<ViewFullrecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewFullrecipeComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ViewFullrecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
