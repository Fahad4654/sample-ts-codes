import { Subject, interval } from 'rxjs';
import { map, scan, startWith } from 'rxjs/operators';

interface ChartDataPoint {
  timestamp: number;
  value: number;
}

class RealtimeChart {
  private dataStream = new Subject<number>();
  public chartData$ = this.dataStream.pipe(
    startWith([] as ChartDataPoint[]),
    scan((acc: ChartDataPoint[], value: number) => {
      const timestamp = Date.now();
      const newDataPoint = { timestamp, value };
      return [...acc.slice(-99), newDataPoint]; // Keep only last 100 points
    }, [] as ChartDataPoint[])
  );

  constructor() {
    interval(1000).pipe(
      map(() => Math.random() * 100)
    ).subscribe(value => this.dataStream.next(value));
  }
}

const chart = new RealtimeChart();

// Example subscription (for demonstration purposes only)
chart.chartData$.subscribe(data => {
  //  Here you would update your chart library with the new data
  //  e.g., chart.updateData(data);
  console.log("Chart Data:", data);
});

export { RealtimeChart, ChartDataPoint };