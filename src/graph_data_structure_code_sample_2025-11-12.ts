interface GraphNode<T> {
  value: T;
  edges: GraphNode<T>[];
}

class Graph<T> {
  nodes: GraphNode<T>[] = [];

  addNode(value: T): GraphNode<T> {
    const newNode: GraphNode<T> = { value, edges: [] };
    this.nodes.push(newNode);
    return newNode;
  }

  addEdge(node1: GraphNode<T>, node2: GraphNode<T>): void {
    node1.edges.push(node2);
    node2.edges.push(node1);
  }

  breadthFirstSearch(startNode: GraphNode<T>, visit: (node: GraphNode<T>) => void): void {
    const visited = new Set<GraphNode<T>>();
    const queue: GraphNode<T>[] = [startNode];

    visited.add(startNode);

    while (queue.length > 0) {
      const node = queue.shift()!;
      visit(node);

      for (const neighbor of node.edges) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
  }
}

// Example Usage
const graph = new Graph<string>();
const a = graph.addNode("A");
const b = graph.addNode("B");
const c = graph.addNode("C");
const d = graph.addNode("D");

graph.addEdge(a, b);
graph.addEdge(b, c);
graph.addEdge(c, d);
graph.addEdge(d, a);

graph.breadthFirstSearch(a, (node) => console.log(node.value));