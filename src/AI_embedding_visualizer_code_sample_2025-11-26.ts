interface Embedding {
  vector: number[];
  label: string;
}

type VisualizationConfig = {
  containerId: string;
  width: number;
  height: number;
  colorScale: (value: number) => string;
};

class EmbeddingVisualizer {
  private embeddings: Embedding[] = [];
  private config: VisualizationConfig;
  private svg: d3.Selection<SVGSVGElement, undefined, null, undefined> | null = null;

  constructor(config: VisualizationConfig) {
    this.config = config;
  }

  setEmbeddings(embeddings: Embedding[]) {
    this.embeddings = embeddings;
  }

  render() {
    if (!this.embeddings.length) {
      console.warn("No embeddings to render.");
      return;
    }

    const container = document.getElementById(this.config.containerId);
    if (!container) {
      console.error(`Container with ID '${this.config.containerId}' not found.`);
      return;
    }

    container.innerHTML = ''; // Clear previous content

    this.svg = d3.select(container)
      .append("svg")
      .attr("width", this.config.width)
      .attr("height", this.config.height);


    const xScale = d3.scaleLinear()
      .domain([d3.min(this.embeddings, d => d.vector[0])!, d3.max(this.embeddings, d => d.vector[0])!])
      .range([50, this.config.width - 50]);

    const yScale = d3.scaleLinear()
      .domain([d3.min(this.embeddings, d => d.vector[1])!, d3.max(this.embeddings, d => d.vector[1])!])
      .range([50, this.config.height - 50]);


    this.svg.selectAll("circle")
      .data(this.embeddings)
      .enter()
      .append("circle")
      .attr("cx", d => xScale(d.vector[0]))
      .attr("cy", d => yScale(d.vector[1]))
      .attr("r", 5)
      .attr("fill", d => this.config.colorScale(d.vector[0]));


    this.svg.selectAll("text")
      .data(this.embeddings)
      .enter()
      .append("text")
      .attr("x", d => xScale(d.vector[0]) + 10)
      .attr("y", d => yScale(d.vector[1]) + 5)
      .text(d => d.label)
      .attr("font-size", "10px");
  }
}