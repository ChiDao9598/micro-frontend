import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { LogLevel } from '../../../../shared/models';
import { loadLogs } from '../../store/log.actions';
import { selectAllLogs } from '../../store/log.selectors';

@Component({
  selector: 'app-logs-view',
  standalone: true,
  templateUrl: './logs-view.component.html',
  styleUrl: './logs-view.component.css',
})
export class LogsViewComponent implements OnInit {
  private readonly store = inject(Store);

  private allLogs = toSignal(this.store.select(selectAllLogs), { initialValue: [] });
  levelFilter = signal<LogLevel | 'all'>('all');

  readonly levelOpts = [
    { label: 'All',   value: 'all' as const },
    { label: 'ERROR', value: 'ERROR' as const },
    { label: 'WARN',  value: 'WARN' as const },
    { label: 'INFO',  value: 'INFO' as const },
    { label: 'DEBUG', value: 'DEBUG' as const },
  ];

  filtered = computed(() => {
    const logs = this.allLogs();
    const f = this.levelFilter();
    return f === 'all' ? logs : logs.filter(l => l.level === f);
  });

  ngOnInit() { this.store.dispatch(loadLogs()); }

  fmtTime(d: Date): string {
    return d.toLocaleTimeString('en-US', { hour12: false });
  }
}
