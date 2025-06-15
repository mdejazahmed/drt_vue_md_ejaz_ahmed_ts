import request from "@/plugins/axios";

interface SatelliteParams {
  objectTypes?: string[];
  attributes?: string[];
}

interface Satellite {
  noradCatId: string;
  intlDes: string;
  name: string;
  [key: string]: any;
}

export const satelliteAPI = {
  async getSatellites(params: SatelliteParams = {}): Promise<Satellite[]> {
    const queryParams = new URLSearchParams();
    
    if (params.objectTypes?.length) {
      queryParams.append('objectTypes', params.objectTypes.join(','));
    }
    
    if (params.attributes?.length) {
      queryParams.append('attributes', params.attributes.join(','));
    } else {
      queryParams.append('attributes', 'noradCatId,intlDes,name');
    }
    
    const url = `/satellites?${queryParams.toString()}`;
    
    try {
      const response = await request.get<{ data: Satellite[] }>(url);
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
};
