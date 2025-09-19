// main.ts
import { buildGraphFromOSM } from "./graphBuilder.js";
import { fetchOSMData } from "./osmService.js";

async function main() {
  const xmlData = await fetchOSMData(
    40.7128,
    -74.0060,
    40.7328,
    -73.9860,
    "driving"
  );

  const graph = buildGraphFromOSM(xmlData);

  console.log("Graph built:", graph);
}

main();
