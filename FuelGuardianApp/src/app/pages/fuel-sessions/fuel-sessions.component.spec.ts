import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelSessionsComponent } from './fuel-sessions.component';

describe('FuelSessionsComponent', () => {
  let component: FuelSessionsComponent;
  let fixture: ComponentFixture<FuelSessionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuelSessionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuelSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
