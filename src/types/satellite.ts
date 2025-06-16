export interface Satellite {
  noradCatId: string;
  name: string;
  [key: string]: any; // For other dynamic properties that might exist
}
