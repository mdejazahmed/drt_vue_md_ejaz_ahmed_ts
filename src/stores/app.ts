// Utilities
import { defineStore } from "pinia";
import { satelliteAPI } from "@/services/api";
import type { Satellite } from "@/types/satellite";

interface Header {
  title: string;
  key: string;
  sortable: boolean;
}

export const useAppStore = defineStore("app", {
  state: () => ({
    satellites: [] as Satellite[],
    filteredSatellites: [] as Satellite[],
    selectedItems: [] as Satellite[],
    loading: false,
    search: "",
    headers: [
      { title: "Name", key: "name", sortable: true },
      { title: "NORAD Cat ID", key: "noradCatId", sortable: true },
      { title: "Orbit Code", key: "orbitCode", sortable: false },
      { title: "Object Type", key: "objectType", sortable: false },
      { title: "Country Code", key: "countryCode", sortable: true },
      { title: "Launch Date", key: "launchDate", sortable: true },
    ] as Header[],
    selectedObjectTypes: ["ROCKET BODY", "PAYLOAD", "UNKNOWN", "DEBRIS"],
    selectedAttributes: ["noradCatId", "intlDes", "name"],
    selectedOrbitCode: [] as string[],
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
      "orbitCode",
      "countryCode",
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
      this.loading = true;
      try {
        const satellites = await satelliteAPI.getSatellites({
          objectTypes: this.selectedObjectTypes,
          attributes: this.selectedAttributes,
        });
        this.satellites = satellites;
        this.filteredSatellites = satellites;
      } catch (error) {
        console.error("Failed to fetch satellites:", error);
        const snackbarStore = useSnackbarStore();
        snackbarStore.showSnackbar({
          color: "error",
          msg: "Failed to load satellite data. Please try again later.",
        });
      } finally {
        this.loading = false;
      }
    },
  },
  getters: {
    appliedFiltersCount(state): number {
      const objectTypesCount = state.selectedObjectTypes.length > 0 ? 1 : 0;
      const attributesCount = state.selectedAttributes.length > 0 ? 1 : 0;
      const orbitCodeCount = state.selectedOrbitCode.length > 0 ? 1 : 0;
      return objectTypesCount + attributesCount + orbitCodeCount;
    },
  },
});

export const useSnackbarStore = defineStore("snackbarStore", {
  state: () => ({
    show: false,
    color: "success",
    message: "",
  }),
  actions: {
    showSnackbar({ color = "success", msg = "Operation Successful" }) {
      this.show = true;
      this.color = color;
      this.message = msg;
    },
  },
});
