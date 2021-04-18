import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnVolumeComponent } from './btn-volume.component';

describe('BtnVolumeComponent', () => {
  let component: BtnVolumeComponent;
  let fixture: ComponentFixture<BtnVolumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnVolumeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnVolumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
