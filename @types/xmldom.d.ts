// Type definitions for xmldom - because it is not included in the default TypeScript types
declare module 'xmldom' {
  export class DOMParser {
    parseFromString(xmlString: string, contentType: string): Document;
  }
}
