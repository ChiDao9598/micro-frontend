import { Component, Input } from '@angular/core';

@Component({
  selector: 'cdo-icon',
  standalone: true,
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.css',
})
export class IconComponent {
  @Input({ required: true }) name!: string;
  @Input() size: number = 18;
}
