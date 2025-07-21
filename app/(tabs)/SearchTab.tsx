import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MapView from "react-native-maps";
import { RadioGroup } from "react-native-radio-buttons-group";

const SearchTab = () => {
  const [loading, setLoading] = useState(false);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [travelMode, setTravelMode] = useState("driving");

  const radioButtons = [
    { id: "1", label: "Walk", value: "walking" },
    { id: "2", label: "Cycle", value: "bicycling" },
    { id: "3", label: "Drive", value: "driving" },
    { id: "4", label: "Transit", value: "transit" },
  ];

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert("Searching shortest route...");
    }, 1500);
  };

  const handleClear = () => {
    setOrigin("");
    setDestination("");
    setTravelMode("driving");
  };

  return (
    <View style={styles.container}>
      {/* Form Section */}
      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Enter origin"
          value={origin}
          onChangeText={setOrigin}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter destination"
          value={destination}
          onChangeText={setDestination}
        />

        {/* Travel Mode Selector */}
        <Text style={styles.label}>Select Travel Mode:</Text>
        <RadioGroup
          radioButtons={radioButtons}
          onPress={(selectedValue) => {
            setTravelMode(selectedValue || "driving");
          }}
          selectedId={radioButtons.find((b) => b.value === travelMode)?.id}
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
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
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

  input: {
    height: 45,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
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

  map: {
    flex: 1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: "hidden",
  },
});

export default SearchTab;
