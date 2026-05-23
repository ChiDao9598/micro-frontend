import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { KpiCard } from '../../models';

@Component({
  selector: 'cdo-kpi-card',
  standalone: true,
  imports: [NgClass],
  template: `
    <div class="card">
      <div class="card__header">
        <span class="card__label">{{ kpi.label }}</span>
        <div class="card__dot-wrap"
             [style.background]="kpi.iconColor + '1a'"
             [style.border-color]="kpi.iconColor + '40'">
          <span class="card__dot" [style.background]="kpi.iconColor"></span>
        </div>
      </div>

      <div class="card__value">{{ kpi.value }}</div>

      <div class="card__footer">
        @if (kpi.trend !== undefined) {
          <span class="card__trend"
                [class.card__trend--up]="kpi.trend > 0"
                [class.card__trend--down]="kpi.trend < 0">
            {{ kpi.trend > 0 ? '↑' : '↓' }} {{ abs(kpi.trend) }}%
          </span>
        }
        <span class="card__subtitle">{{ kpi.subtitle }}</span>
      </div>
    </div>
  `,
  styles: [`
    .card {
      background: var(--cdo-bg-secondary);
      border: 1px solid var(--cdo-border);
      border-radius: 8px;
      padding: 18px 20px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      transition: border-color .15s, box-shadow .15s;
    }
    .card:hover {
      border-color: var(--cdo-text-faint);
      box-shadow: 0 4px 16px rgba(0,0,0,.28);
    }
    .card__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .card__label {
      font-size: 11px;
      font-weight: 600;
      color: var(--cdo-text-muted);
      text-transform: uppercase;
      letter-spacing: .06em;
    }
    .card__dot-wrap {
      width: 26px; height: 26px;
      border-radius: 6px;
      border: 1px solid;
      display: flex; align-items: center; justify-content: center;
    }
    .card__dot { width: 8px; height: 8px; border-radius: 50%; }
    .card__value {
      font-size: 28px;
      font-weight: 700;
      color: var(--cdo-text);
      line-height: 1;
    }
    .card__footer { display: flex; align-items: center; gap: 6px; }
    .card__trend {
      font-size: 11px; font-weight: 600;
      padding: 1px 5px; border-radius: 4px;
    }
    .card__trend--up   { color: var(--cdo-success); background: rgba(63,185,80,.12); }
    .card__trend--down { color: var(--cdo-danger);  background: rgba(248,81,73,.12); }
    .card__subtitle { font-size: 11px; color: var(--cdo-text-faint); }
  `]
})
export class KpiCardComponent {
  @Input({ required: true }) kpi!: KpiCard;
  protected abs = Math.abs;
}
