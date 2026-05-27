import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopNavComponent } from '../topnav/topnav.component';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, TopNavComponent],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.css',
})
export class ShellComponent {
  mobileOpen = signal(false);

  constructor() {
    inject(ThemeService).init();
  }

  toggleMobile() { this.mobileOpen.update(v => !v); }
}
