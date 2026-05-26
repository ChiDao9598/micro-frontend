import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { MockDataService } from '../../../../core/services/mock-data.service';
import { LogEntry, LogLevel } from '../../../../shared/models';

@Component({
  selector: 'app-logs-view',
  standalone: true,
  templateUrl: './logs-view.component.html',
  styleUrl: './logs-view.component.css',
})
export class LogsViewComponent implements OnInit {
  private readonly data = inject(MockDataService);

  private allLogs: LogEntry[] = [];
  levelFilter = signal<LogLevel | 'all'>('all');

  readonly levelOpts = [
    { label: 'All',   value: 'all' as const },
    { label: 'ERROR', value: 'ERROR' as const },
    { label: 'WARN',  value: 'WARN' as const },
    { label: 'INFO',  value: 'INFO' as const },
    { label: 'DEBUG', value: 'DEBUG' as const },
  ];

  filtered = computed(() => {
    const f = this.levelFilter();
    return f === 'all' ? this.allLogs : this.allLogs.filter(l => l.level === f);
  });

  ngOnInit() { this.allLogs = this.data.getLogs(); }

  fmtTime(d: Date): string {
    return d.toLocaleTimeString('en-US', { hour12: false });
  }
}
