import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    standalone: false
})
export class AppComponent {
  title = 'FuelGuardian';

  isCollapsed = false;

  protected readonly date = new Date();

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
