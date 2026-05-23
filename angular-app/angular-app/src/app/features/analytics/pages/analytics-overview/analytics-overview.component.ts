import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy, inject } from '@angular/core';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement, LineElement, LineController,
  BarElement, BarController, Tooltip, Legend, Filler,
} from 'chart.js';
import { MockDataService } from '../../../../core/services/mock-data.service';
import { KpiCardComponent } from '../../../../shared/components/kpi-card/kpi-card.component';

@Component({
  selector: 'app-analytics-overview',
  standalone: true,
  imports: [KpiCardComponent],
  templateUrl: './analytics-overview.component.html',
  styleUrl: './analytics-overview.component.css',
})
export class AnalyticsOverviewComponent implements AfterViewInit, OnDestroy {
  @ViewChild('cpuMemCanvas') private cpuMemRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('reqCanvas')    private reqRef!: ElementRef<HTMLCanvasElement>;

  private svc = inject(MockDataService);

  private cpuMemChart?: ChartJS;
  private reqChart?: ChartJS;

  readonly kpis      = this.svc.getAnalyticsKpis();
  readonly trend     = this.svc.getCpuMemTrend();
  readonly reqRate   = this.svc.getRequestRate();
  readonly heatmap   = this.svc.getUptimeHeatmap();
  readonly costs     = this.svc.getCostBreakdown();
  readonly totalCost = this.costs.reduce((s, c) => s + c.total, 0);

  ngAfterViewInit(): void {
    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, LineController, BarElement, BarController, Tooltip, Legend, Filler);
    this.initCpuMemChart();
    this.initReqChart();
  }

  ngOnDestroy(): void {
    this.cpuMemChart?.destroy();
    this.reqChart?.destroy();
  }

  cellColor(v: number): string {
    if (v >= 99.95) return 'rgba(63,185,80,0.9)';
    if (v >= 99.5)  return 'rgba(63,185,80,0.4)';
    if (v >= 99.0)  return 'rgba(210,153,34,0.7)';
    return 'rgba(248,81,73,0.7)';
  }

  costPct(total: number): number {
    return Math.round((total / this.totalCost) * 100);
  }

  private initCpuMemChart(): void {
    if (!this.cpuMemRef) return;
    const grid = 'rgba(48,54,61,0.5)';
    const tick = '#6e7681';
    this.cpuMemChart = new ChartJS(this.cpuMemRef.nativeElement, {
      type: 'line',
      data: {
        labels: this.trend.labels,
        datasets: [
          {
            label: 'CPU %',
            data: this.trend.cpu,
            borderColor: 'rgba(88,166,255,1)',
            backgroundColor: 'rgba(88,166,255,0.07)',
            borderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 4,
            fill: true,
            tension: 0.4,
          },
          {
            label: 'Memory %',
            data: this.trend.memory,
            borderColor: 'rgba(188,140,255,1)',
            backgroundColor: 'rgba(188,140,255,0.07)',
            borderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 4,
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#161b22',
            borderColor: '#30363d',
            borderWidth: 1,
            titleColor: '#e6edf3',
            bodyColor: '#8b949e',
            padding: 10,
          },
        },
        scales: {
          x: {
            grid: { color: grid },
            ticks: { color: tick, font: { size: 11 }, maxTicksLimit: 8 },
            border: { color: grid },
          },
          y: {
            min: 0,
            max: 100,
            grid: { color: grid },
            ticks: {
              color: tick,
              font: { size: 11 },
              callback: function(v) { return v + '%'; },
            },
            border: { color: grid },
          },
        },
      },
    });
  }

  private initReqChart(): void {
    if (!this.reqRef) return;
    const grid = 'rgba(48,54,61,0.5)';
    const tick = '#6e7681';
    this.reqChart = new ChartJS(this.reqRef.nativeElement, {
      type: 'bar',
      data: {
        labels: this.reqRate.labels,
        datasets: [{
          label: 'Req/min',
          data: this.reqRate.values,
          backgroundColor: 'rgba(63,185,80,0.45)',
          borderColor: 'rgba(63,185,80,0.85)',
          borderWidth: 1,
          borderRadius: 3,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#161b22',
            borderColor: '#30363d',
            borderWidth: 1,
            titleColor: '#e6edf3',
            bodyColor: '#8b949e',
            padding: 10,
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: tick, font: { size: 11 }, maxTicksLimit: 8 },
            border: { color: grid },
          },
          y: {
            grid: { color: grid },
            ticks: {
              color: tick,
              font: { size: 11 },
              callback: function(v) { return v + ' r/m'; },
            },
            border: { color: grid },
          },
        },
      },
    });
  }
}
