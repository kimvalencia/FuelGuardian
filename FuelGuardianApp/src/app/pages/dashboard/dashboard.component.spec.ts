import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { of } from 'rxjs';

import { DashboardApiService } from '../../services/api/dashboard-api.service';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let dashboardApiService: jasmine.SpyObj<DashboardApiService>;

  beforeEach(async () => {
    dashboardApiService = jasmine.createSpyObj<DashboardApiService>(
      'DashboardApiService',
      ['getSummary'],
    );
    dashboardApiService.getSummary.and.returnValue(
      of({
        rateTrend: [{ label: 'Jan', value: 18.5 }],
        monthlyBilling: [{ label: 'Jan', value: 2500 }],
      }),
    );

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        { provide: DashboardApiService, useValue: dashboardApiService },
        provideCharts(withDefaultRegisterables()),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load dashboard summary on init', () => {
    expect(dashboardApiService.getSummary).toHaveBeenCalled();
  });
});
