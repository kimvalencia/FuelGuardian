import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzTableModule } from 'ng-zorro-antd/table';
import { TripComponent } from './tripModule/trip/trip.component';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AddTripComponent } from './tripModule/add-trip/add-trip.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputModule } from 'ng-zorro-antd/input';
import { HomeComponent } from './ui/admin/home/home.component';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDemoMenuInlineCollapsedComponent } from './test';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { provideRouter, RouterOutlet } from '@angular/router';
import { routes } from './app.routes';

registerLocaleData(en);

@NgModule({ declarations: [AppComponent], bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        FormsModule,
        BrowserAnimationsModule,
        NzLayoutModule,
        NzTableModule,
        NzDividerModule,
        NzButtonModule,
        NzIconModule,
        NzModalModule,
        ReactiveFormsModule,
        NzFormModule,
        NzDatePickerModule,
        NzMenuModule,
        NzCardModule,
        NzStatisticModule,
        NzListModule,
        NzAvatarModule,
        NzBadgeModule,
        NzDropDownModule,
        NzTagModule,
        NzInputModule, TripComponent,
        AddTripComponent,
        NzDemoMenuInlineCollapsedComponent,
        NzTooltipModule,
        NzBreadCrumbModule,
        RouterOutlet,
        HomeComponent], 
        providers: [
        { provide: NZ_I18N, useValue: en_US },
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter(routes)
    ] })
export class AppModule { }
