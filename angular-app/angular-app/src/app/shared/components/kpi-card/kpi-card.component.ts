import { Component, Input } from '@angular/core';
import { KpiCard } from '../../models';

@Component({
  selector: 'cdo-kpi-card',
  standalone: true,
  templateUrl: './kpi-card.component.html',
  styleUrl: './kpi-card.component.css',
})
export class KpiCardComponent {
  @Input({ required: true }) kpi!: KpiCard;
  protected abs = Math.abs;
}
