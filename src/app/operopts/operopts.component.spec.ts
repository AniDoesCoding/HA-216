import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperoptsComponent } from './operopts.component';

describe('OperoptsComponent', () => {
  let component: OperoptsComponent;
  let fixture: ComponentFixture<OperoptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperoptsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperoptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
