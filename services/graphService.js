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
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching shortest path:",
      error,
      error.response?.data,
      error.message,
      error.axiosError,
    );
    throw error;
  }
};
