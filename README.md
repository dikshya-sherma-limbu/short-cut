# 🚀 Short-Cut

Short-Cut is a simple mobile application built with React Native and Expo that helps users find the **shortest route** between two locations. Users can input or select their source and destination on a map, choose a mode of travel, and view the shortest path displayed visually.

This project is mainly focused on helping me understand and implement pathfinding algorithms in a practical way, without any backend storage — just focusing on logic and UI.
This is my learning journey to dive into routing algorithms like Dijkstra or A\*. Later, I plan to add more advanced features like real-time transit data and ML-based optimizations.

---

## ✨ Features

- Location input with autocomplete suggestion (like Google Maps)
- Map interface for selecting source and destination
- Travel mode options: **driving, walking, transit, cycling**
- Shortest route calculated and drawn based on selected mode
- Lightweight, beginner-to-intermediate level routing app

---

## 🧰 Tech Stack

- React Native (with Expo)
- `react-native-maps` for map rendering
- Expo Location or `@react-native-community/geolocation` for fetching user location
- Google Places API (for autocomplete)

---

## 📌 Note

- This is a work-in-progress and currently focuses only on UI and route calculation logic. No user authentication or backend is implemented .

## 🚀 Getting Started

Clone the repo and run:

```bash
git clone https://github.com/my-username/short-cut.git
cd short-cut
npm install
npx expo start

```
