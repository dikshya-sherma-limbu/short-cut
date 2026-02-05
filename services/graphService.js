// base api url
import axios from "axios";

// call the graph api to get the shortest path between two locations
export const getShortestPath = async (origin, destination, travelMode) => {
  try {
    console.log("Fetching shortest path with params:", {
      origin,
      destination,
      travelMode,
    });
    const response = await axios.get(
      "http://192.168.5.173:5000/transit/shortest-route",
      {
        params: {
          origin: JSON.stringify(origin),
          destination: JSON.stringify(destination),
          travelMode,
        },
      },
    );
    console.log(
      "Received response from shortest path API:",
      JSON.stringify(response.data),
    );
    const result = JSON.stringify(response.data); // Convert to string here
    return result;
  } catch (error) {
    console.error(
      "Error fetching shortest path:",
      error,
      JSON.stringify(error.response?.data),
      error.message,
      error.axiosError,
    );
    throw error;
  }
};
