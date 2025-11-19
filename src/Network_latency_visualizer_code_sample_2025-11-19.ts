interface LatencyData {
  timestamp: number;
  latency: number;
}

class NetworkLatencyVisualizer {
  private data: LatencyData[] = [];
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor(canvasId: string) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!this.canvas) throw new Error(`Canvas with id "${canvasId}" not found.`);
    this.ctx = this.canvas.getContext("2d")!;
    if (!this.ctx) throw new Error("Could not get 2D rendering context.");
    this.resizeCanvas();
    window.addEventListener("resize", () => this.resizeCanvas());
  }

  private resizeCanvas(): void {
    this.canvas.width = window.innerWidth * 0.8;
    this.canvas.height = 200;
  }

  addLatency(latency: number): void {
    this.data.push({ timestamp: Date.now(), latency });
    this.data = this.data.slice(-100);
    this.draw();
  }

  private draw(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.beginPath();
    this.ctx.strokeStyle = "blue";
    this.ctx.lineWidth = 2;

    const maxLatency = Math.max(...this.data.map(d => d.latency), 50); // Ensure a minimum scale
    const xSpacing = this.canvas.width / (this.data.length - 1 || 1);

    this.data.forEach((d, i) => {
      const x = i * xSpacing;
      const y = this.canvas.height - (d.latency / maxLatency) * this.canvas.height;

      if (i === 0) {
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
      }
    });

    this.ctx.stroke();
  }
}

// Example Usage (requires an HTML canvas element with id="latencyCanvas")
// const visualizer = new NetworkLatencyVisualizer("latencyCanvas");
// setInterval(() => {
//   const randomLatency = Math.random() * 40; // Simulate random latency
//   visualizer.addLatency(randomLatency);
// }, 500);