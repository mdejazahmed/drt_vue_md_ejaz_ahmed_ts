// Utilities
import { defineStore } from "pinia";
import { satelliteAPI } from "@/services/api.ts";
export const useAppStore = defineStore("app", {
  state: () => ({
    satellites: [],
    filteredSatellites: [],
    selectedItems: [],
    loading: false,
    search: "",
    headers: [
      { title: "Name", key: "name", sortable: true },
      { title: "NORAD Cat ID", key: "noradCatId", sortable: true },
      { title: "Orbit Code", key: "orbitCode", sortable: false },
      { title: "Object Type", key: "objectType", sortable: false },
      { title: "Country Code", key: "countryCode", sortable: true },
      { title: "Launch Date", key: "launchDate", sortable: true },
    ],
    selectedObjectTypes: ["ROCKET BODY","PAYLOAD","UNKNOWN","DEBRIS"],
    selectedAttributes: ["noradCatId", "intlDes", "name"],
    selectedOrbitCode:[],
    objectTypesList: [
      {
        text: "ROCKET BODY",
        value: "ROCKET BODY",
        count: 2167,
      },
      {
        text: "PAYLOAD",
        value: "PAYLOAD",
        count: 13997,
      },
      {
        text: "UNKNOWN",
        value: "UNKNOWN",
        count: 559,
      },
      {
        text: "DEBRIS",
        value: "DEBRIS",
        count: 10595,
      },
    ],
    attributesList: [
      "noradCatId",
      "intlDes",
      "name",
      "launchDate",
      "decayDate",
      "objectType",
      "launchSiteCode",
      "countryCode",
      "orbitCode",
    ],
    orbitCode: [
      "LEO",
      "LEO1",
      "LEO2",
      "LEO3",
      "LEO4",
      "MEO",
      "GEO",
      "HEO",
      "IGO",
      "EGO",
      "NSO",
      "GTO",
      "GHO",
      "HAO",
      "MGO",
      "LMO",
      "UFO",
      "ESO",
      "UNKNOWN",
    ],
  }),
  actions: {
    async getSatellites() {
      console.log(this.selectedObjectTypes);
      console.log(this.selectedAttributes);
      
      this.loading = true;
      try {
        const response = await satelliteAPI.getSatellites({
          objectTypes: this.selectedObjectTypes,
          attributes: this.selectedAttributes,
        });
        this.satellites = response.data;
        this.filteredSatellites = response.data;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
  getters: {
    appliedFiltersCount(): number {
      const objectTypesCount = this.selectedObjectTypes.length>0?1:0;
      const attributesCount = this.selectedAttributes.length>0?1:0;
      const orbitCodeCount = this.selectedOrbitCode.length>0?1:0;
      const totalFilters = objectTypesCount + attributesCount + orbitCodeCount;
     return totalFilters;
    }
  }
});
export const useSnackbarStore = defineStore("snackbarStore", {
  state: () => ({
    show: false,
    color: "success",
    msg: "Operation Successful",
  }),
  actions: {
    showSnackbar({ color = "success", msg = "Operation Successful" }) {
      this.show = true;
      this.color = color;
      this.msg = msg;
    },
  },
});
