import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisManagerComponent } from './vis-manager.component';

describe('VisManagerComponent', () => {
  let component: VisManagerComponent;
  let fixture: ComponentFixture<VisManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
