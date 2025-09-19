class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }
  
  // Add a node to the graph
  addNode(node) {
    if (!this.adjacencyList[node]) {
        console.log("Adding node:", node);
      this.adjacencyList[node] = [];
      console.log("Current graph nodes:", this.getAllNodes());
    } else {
      console.log("Node already exists:", node);
    }
  }
  
  // Add a weighted edge between two nodes
  addEdge(from, to, weight) {
    this.addNode(from);
    this.addNode(to);
    console.log(`Adding edge from ${from} to ${to} with weight ${weight}`);
    this.adjacencyList[from].push({ node: to, weight: weight }); 
    console.log(`Current edges from ${from}:`, this.adjacencyList[from]);
  }
  
  // Get all neighbors of a node
  getNeighbors(node) {
    return this.adjacencyList[node] || [];
  }
  
  // Get all nodes in the graph
  getAllNodes() {
    return Object.keys(this.adjacencyList);
  }
  
  // Display the graph
  display() {
    for (let node in this.adjacencyList) {
      const neighbors = this.adjacencyList[node]
        .map(n => `${n.node}(${n.weight})`)
        .join(', ');
      console.log(`${node} -> ${neighbors}`);
    }
  }
  
  // Check if edge exists
  hasEdge(from, to) {
    return this.adjacencyList[from]?.some(neighbor => neighbor.node === to) || false;
  }
  
  // Get edge weight
  getWeight(from, to) {
    const neighbor = this.adjacencyList[from]?.find(n => n.node === to);
    return neighbor ? neighbor.weight : null;
  }
}

// Usage Example:
const graph = new WeightedGraph();

// Add edges (automatically adds nodes)
graph.addEdge('A', 'B', 5);
graph.addEdge('A', 'C', 8);
// graph.addEdge('B', 'C', 3);
// graph.addEdge('C', 'D', 2);


// Display the graph
graph.display();
// Output:
// A -> B(5), C(8)
// B -> C(3)
// C -> D(2)
// D -> 

// Check connections
console.log(graph.hasEdge('A', 'B'));  // true
console.log(graph.getWeight('A', 'B')); // 5
console.log(graph.getNeighbors('A'));   // [{ node: 'B', weight: 5 }, { node: 'C', weight: 8 }]