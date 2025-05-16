import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseroptsComponent } from './useropts.component';

describe('UseroptsComponent', () => {
  let component: UseroptsComponent;
  let fixture: ComponentFixture<UseroptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UseroptsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UseroptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
