import { Routes } from "@angular/router";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { TripComponent } from "./tripModule/trip/trip.component";

export const routes: Routes = [
    {
        path: '', 
        loadComponent: () => import('./pages/dashboard/dashboard.component')
        .then(m => m.DashboardComponent),
    },
    {
        path: 'trips',
        component:TripComponent,
    },
    {
        path: 'fuel-sessions',
        loadComponent: () => import('./pages/fuel-sessions/fuel-sessions.component')
        .then(m => m.FuelSessionsComponent),
    },
    {
        path: 'billing',
        loadComponent: () => import('./pages/billing/billing.component')
        .then(m => m.BillingComponent),
    }

]