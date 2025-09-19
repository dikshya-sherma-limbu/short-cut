// graphBuilder.ts
import { DOMParser } from "xmldom";

export interface Graph {
  [nodeId: string]: { [neighborId: string]: number }; // adjacency list with weights
}

/**
 * Parse OSM XML and build a graph
 */
export function buildGraphFromOSM(xmlData: string): Graph {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlData, "text/xml");

  const graph: Graph = {};

  // Collect nodes
  const nodes: Record<string, { lat: number; lon: number }> = {};
  const nodeElements = xmlDoc.getElementsByTagName("node");
  for (let i = 0; i < nodeElements.length; i++) {
    const node = nodeElements[i];
    const id = node.getAttribute("id")!;
    const lat = parseFloat(node.getAttribute("lat")!);
    const lon = parseFloat(node.getAttribute("lon")!);
    nodes[id] = { lat, lon };
    console.log(`Node ${id}: (${lat}, ${lon})`);
  }

  // Collect ways → edges
  const wayElements = xmlDoc.getElementsByTagName("way");
  for (let i = 0; i < wayElements.length; i++) {
    const way = wayElements[i];
    const nds = way.getElementsByTagName("nd");
    const refs: string[] = [];

    for (let j = 0; j < nds.length; j++) {
      refs.push(nds[j].getAttribute("ref")!);
    }

    console.log(`Way ${way.getAttribute("id")}: refs = [${refs.join(", ")}]`);

    // Add edges between consecutive nodes
    for (let j = 0; j < refs.length - 1; j++) {
      const a = refs[j];
      const b = refs[j + 1];

      const dist = haversine(nodes[a], nodes[b]);

      if (!graph[a]) graph[a] = {};
      if (!graph[b]) graph[b] = {};

      graph[a][b] = dist;
      graph[b][a] = dist; // undirected
    }
  }
    console.log("Graph built with nodes:", Object.keys(graph).length);
    console.log("Sample graph data:", JSON.stringify(graph).slice(0, 200), "...");

  return graph;
}

/**
 * Haversine distance (in meters) between two lat/lon points
 */
function haversine(a: { lat: number; lon: number }, b: { lat: number; lon: number }): number {
  const R = 6371e3; // meters
  const toRad = (x: number) => (x * Math.PI) / 180;

  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const x =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  return R * (2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x)));
}
