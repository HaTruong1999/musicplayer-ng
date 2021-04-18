import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPlayerComponent } from './control-player.component';

describe('ControlPlayerComponent', () => {
  let component: ControlPlayerComponent;
  let fixture: ComponentFixture<ControlPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlPlayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
