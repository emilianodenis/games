import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasePuzzleTileComponent } from './base-puzzle-tile.component';

xdescribe('BasePuzzleTileComponent', () => {
  let component: BasePuzzleTileComponent;
  let fixture: ComponentFixture<BasePuzzleTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BasePuzzleTileComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasePuzzleTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
