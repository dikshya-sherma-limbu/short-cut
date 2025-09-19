// Type definitions for @mapbox/togeojson - because it is not included in the default TypeScript types so, 
// //we define it here

declare module '@mapbox/togeojson' {
  export const osm: (doc: Document) => any;
  export const kml: (doc: Document) => any;
}