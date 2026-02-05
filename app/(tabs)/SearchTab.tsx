import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import GooglePlacesTextInput from "react-native-google-places-textinput";
import MapView, { Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { RadioGroup } from "react-native-radio-buttons-group";
import { getShortestPath } from "../../services/graphService";

const SearchTab = () => {
  const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY ?? "";

  const [loading, setLoading] = useState(false);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [travelMode, setTravelMode] = useState("driving");
  const [routeCoords, setRouteCoords] = useState<
    Array<{ latitude: number; longitude: number }>
  >([]); // For storing route coordinates

  // Define the type for place details (adjust fields as needed)
  type PlaceDetailsFields = {
    location?: { lat: number; lng: number };
    [key: string]: any;
  };

  const [originFullDetails, setOriginFullDetails] =
    useState<PlaceDetailsFields | null>(null);
  const [destinationFullDetails, setDestinationFullDetails] =
    useState<PlaceDetailsFields | null>(null);

  const radioButtons = useMemo(
    () => [
      { id: "1", label: "Walk", value: "walking" },
      { id: "2", label: "Cycle", value: "bicycling" },
      { id: "3", label: "Drive", value: "driving" },
      { id: "4", label: "Transit", value: "transit" },
    ],
    [],
  );

  const handleSearch = async () => {
    if (!originFullDetails || !destinationFullDetails) {
      Alert.alert("Please select both origin and destination");
      return;
    }

    const originPayload = {
      location: {
        latitude: originFullDetails.location?.lat,
        longitude: originFullDetails.location?.lng,
      },
    };

    const destinationPayload = {
      location: {
        latitude: destinationFullDetails.location?.lat,
        longitude: destinationFullDetails.location?.lng,
      },
    };
    // console.log("Origin Payload:", originPayload);
    // console.log("Destination Payload:", destinationPayload);
    // console.log("Travel Mode:", travelMode);
    console.log("Origin Full Details:", originFullDetails);
    console.log("Destination Full Details:", destinationFullDetails);

    try {
      setLoading(true);

      const result = await getShortestPath(
        originFullDetails,
        destinationFullDetails,
        travelMode,
      );
      console.log("----------------");

      // create polyline from result
      const parsedResult =
        typeof result === "string" ? JSON.parse(result) : result; // if result is string, parse it or use as is

      // Extract coordinates from the parsed result and set to state for polyline
      const coords = parsedResult.path.path.map((p: any) => ({
        latitude: p.lat,
        longitude: p.lon,
      }));

      // Set the route coordinates for polyline
      setRouteCoords(coords);

      Alert.alert("Route fetched successfully");
    } catch (err) {
      console.error("Error fetching route:", err);
      Alert.alert("Failed to fetch route");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setOrigin("");
    setDestination("");
    setTravelMode("");
  };

  //Input styles
  const inputStyles = {
    height: 45,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  };

  return (
    <View style={styles.container}>
      {/* Form Section */}
      <View style={styles.card}>
        {/* Origin Input */}
        <GooglePlacesTextInput
          apiKey={GOOGLE_API_KEY}
          placeHolderText="Enter Origin"
          value={origin}
          fetchDetails={true} // Fetch detailed place info
          detailsFields={["location"]} // for later use to capture coordinates
          detailsProxyUrl={null} // Use default proxy
          onPlaceSelect={(place) => {
            setOrigin(place?.structuredFormat?.mainText?.text || "");
            setOriginFullDetails(place.details || null); // Store full details
          }}
          onTextChange={(text) => {
            setOrigin(text);
            setOriginFullDetails(null);
          }}
          style={{
            input: inputStyles,
          }}
        />
        {/* Destination Input */}
        <GooglePlacesTextInput
          apiKey={GOOGLE_API_KEY}
          placeHolderText="Enter Destination"
          value={destination}
          fetchDetails={true} // Fetch detailed place info
          detailsFields={["location"]} // for later use to capture coordinates
          detailsProxyUrl={null} // Use default proxy
          onPlaceSelect={(place) => {
            setDestination(place?.structuredFormat?.mainText?.text || "");
            setDestinationFullDetails(place.details || null); // Store full details
          }}
          onTextChange={(text) => {
            setDestination(text);
            setDestinationFullDetails(null);
          }}
          style={{
            input: inputStyles,
          }}
        />

        {/* Travel Mode Selector */}
        <Text style={styles.label}>Select Travel Mode:</Text>
        <RadioGroup
          radioButtons={radioButtons}
          onPress={(selectedId) => {
            const selected = radioButtons.find((rb) => rb.id === selectedId);
            setTravelMode(selected?.value || "transit");
          }}
          selectedId={radioButtons.find((rb) => rb.value === travelMode)?.id}
          layout="row"
          containerStyle={{ marginVertical: 10 }}
        />

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.buttonPrimary} onPress={handleSearch}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Search</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonSecondary}
            onPress={handleClear}
          >
            <Text style={styles.buttonTextSecondary}>Clear</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Map Section */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: 43.6532,
            longitude: -79.3832,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {/* <Marker
            coordinate={{
              latitude: 43.6532,
              longitude: -79.3832,
            }}
            title="Marker Title"
            description="Marker Description"
          /> */}
          {/* Add red polyline for the route here when you have the route data from soure to destination */}
          {routeCoords.length > 0 && (
            <Polyline
              coordinates={routeCoords}
              strokeWidth={3}
              strokeColor="blue"
            />
          )}
        </MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f4f7",
  },

  card: {
    backgroundColor: "#ffffff",
    padding: 20,
    margin: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
    color: "#333",
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },

  buttonPrimary: {
    flex: 1,
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 10,
  },

  buttonSecondary: {
    flex: 1,
    backgroundColor: "#e4e6eb",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginLeft: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },

  buttonTextSecondary: {
    color: "#333",
    fontWeight: "600",
    fontSize: 16,
  },
  mapContainer: {
    flex: 1,
    margin: 16,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
    backgroundColor: "#aa1b1bff",
  },

  map: {
    flex: 1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: "hidden",
    height: 200,
    width: "100%",
    zIndex: 1,
  },
});

export default SearchTab;
