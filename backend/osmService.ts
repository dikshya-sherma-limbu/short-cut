// OSM (OpenStreetMap) Service - gets map data from OSM 

import axios from "axios";

// Travel modes to OSM highway types mapping
const travelModeToHighways: Record<string, string[]> = {
  walking: ["footway", "pedestrian", "path", "residential"],
  bicycling: ["cycleway", "residential", "secondary", "tertiary"],
  driving: ["motorway", "primary", "secondary", "tertiary", "residential"],
  transit: ["bus", "tram", "train"], // optional, requires GTFS or public transport data
};

/**
 * Fetch OSM data from Overpass API for a bounding box
 */
export async function fetchOSMData(
  minLat: number,
  minLng: number,
  maxLat: number,
  maxLng: number,
  selectedMode: keyof typeof travelModeToHighways = "driving"
): Promise<string> {
  try {
    const highways = travelModeToHighways[selectedMode];
    const highwayPattern = highways.join("|");

    const query = `
      [out:xml];
       way["highway"~"^(${highwayPattern})$"](${minLat},${minLng},${maxLat},${maxLng});
       out geom;  
    `;

    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
    const response = await axios.get(url);
    console.log("OSM data fetched successfully");
    const subString = response.data.substring(0, 1000); // Get the first 100 characters
    console.log("OSM XML 1st data:", subString);
    return response.data; // raw OSM XML
  } catch (error) {
    console.error("Error fetching OSM data:", error);
    throw error;
  }
}

// Example usage
fetchOSMData(40.7128, -74.0060, 40.7328, -73.9860); // New York City