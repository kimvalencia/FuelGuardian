import { Component } from '@angular/core';
import { NzMenuItemComponent, NzMenuDirective, NzSubMenuComponent, NzMenuDividerDirective } from 'ng-zorro-antd/menu';
import { NzLayoutComponent, NzSiderComponent, NzHeaderComponent, NzContentComponent, NzFooterComponent } from 'ng-zorro-antd/layout';
import { ɵNzTransitionPatchDirective } from 'ng-zorro-antd/core/transition-patch';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzSpaceCompactItemDirective } from 'ng-zorro-antd/space';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { NzWaveDirective } from 'ng-zorro-antd/core/wave';
import { NzBadgeComponent } from 'ng-zorro-antd/badge';
import { NzDropdownMenuComponent, NzDropDownADirective, NzDropDownDirective } from 'ng-zorro-antd/dropdown';
import { NzAvatarComponent } from 'ng-zorro-antd/avatar';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzStatisticComponent } from 'ng-zorro-antd/statistic';
import { NzTableComponent, NzTheadComponent, NzTrDirective, NzTableCellDirective, NzThMeasureDirective, NzTbodyComponent } from 'ng-zorro-antd/table';
import { NzTagComponent } from 'ng-zorro-antd/tag';
import { NzListComponent, NzListItemComponent, NzListItemMetaComponent } from 'ng-zorro-antd/list';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [
        NzLayoutComponent,
        NzSiderComponent,
        NzMenuDirective,
        ɵNzTransitionPatchDirective,
        NzMenuItemComponent,
        NzIconDirective,
        NzSubMenuComponent,
        NzSpaceCompactItemDirective,
        NzButtonComponent,
        NzHeaderComponent,
        NzInputDirective,
        NzWaveDirective,
        NzBadgeComponent,
        NzDropdownMenuComponent,
        NzDropDownADirective,
        NzDropDownDirective,
        NzAvatarComponent,
        NzMenuDividerDirective,
        NzContentComponent,
        NzCardComponent,
        NzStatisticComponent,
        NzTableComponent,
        NzTheadComponent,
        NzTrDirective,
        NzTableCellDirective,
        NzThMeasureDirective,
        NzTbodyComponent,
        NzTagComponent,
        NzListComponent,
        NzListItemComponent,
        NzListItemMetaComponent,
        NzFooterComponent,
    ],
})
export class HomeComponent {

}
