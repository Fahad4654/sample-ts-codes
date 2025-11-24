interface Node {
  id: string;
  dependencies: string[];
}

function generateDependencyGraph(nodes: Node[]): Record<string, string[]> {
  const graph: Record<string, string[]> = {};

  for (const node of nodes) {
    graph[node.id] = node.dependencies;
  }

  return graph;
}

function topologicalSort(graph: Record<string, string[]>): string[] {
  const visited: Record<string, boolean> = {};
  const stack: string[] = [];

  function visit(node: string): void {
    if (visited[node]) {
      return;
    }

    visited[node] = true;

    if (graph[node]) {
      for (const dependency of graph[node]) {
        visit(dependency);
      }
    }

    stack.push(node);
  }

  for (const node in graph) {
    if (!visited[node]) {
      visit(node);
    }
  }

  return stack.reverse();
}

function findCircularDependencies(graph: Record<string, string[]>): string[][] {
    const visiting: Record<string, boolean> = {};
    const visited: Record<string, boolean> = {};
    const cycles: string[][] = [];

    function detectCycle(node: string, path: string[] = []): boolean {
        visiting[node] = true;
        path.push(node);

        if (graph[node]) {
            for (const neighbor of graph[node]) {
                if (visiting[neighbor]) {
                    const cycleStart = path.indexOf(neighbor);
                    cycles.push(path.slice(cycleStart));
                    return true;
                }

                if (!visited[neighbor] && detectCycle(neighbor, [...path])) {
                    return true;
                }
            }
        }

        visiting[node] = false;
        visited[node] = true;
        return false;
    }

    for (const node in graph) {
        if (!visited[node]) {
            detectCycle(node);
        }
    }

    return cycles;
}

// Example usage:
const nodes: Node[] = [
  { id: 'A', dependencies: ['B', 'C'] },
  { id: 'B', dependencies: ['D'] },
  { id: 'C', dependencies: ['D'] },
  { id: 'D', dependencies: [] },
  { id: 'E', dependencies: ['A', 'F'] },
  { id: 'F', dependencies: ['B'] },
  { id: 'G', dependencies: ['H'] },
  { id: 'H', dependencies: ['G']} // Circular dependency
];

const graph = generateDependencyGraph(nodes);
const sorted = topologicalSort(graph);
const circularDependencies = findCircularDependencies(graph);

console.log("Graph:", graph);
console.log("Topological Sort:", sorted);
console.log("Circular Dependencies:", circularDependencies);