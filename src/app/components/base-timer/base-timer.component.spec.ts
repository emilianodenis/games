import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseTimerComponent } from './base-timer.component';

xdescribe('BaseTimerComponent', () => {
  let component: BaseTimerComponent;
  let fixture: ComponentFixture<BaseTimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BaseTimerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
