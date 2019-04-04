import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MineSweeperTileComponent } from './minesweeper-tile.component';

describe('TileComponent', () => {
  let component: MineSweeperTileComponent;
  let fixture: ComponentFixture<MineSweeperTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MineSweeperTileComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MineSweeperTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
