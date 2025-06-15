<script setup lang="ts">
import { useAppStore } from "@/stores/app";
const appStore = useAppStore();
const objectTypesList = [
  {
    text: "All",
    value: "ROCKET BODY,PAYLOAD,UNKNOWN,DEBRIS",
    count: 27893,
  },
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
];
const attributesList = [
  "noradCatId",
  "intlDes",
  "name",
  "launchDate",
  "decayDate",
  "objectType",
  "launchSiteCode",
  "countryCode",
  "orbitCode",
];

const selectedAttributes = ref(["noradCatId", "intlDes", "name"]);
const selectedObjectTypes = ref([objectTypesList[0].value]);
const performSearch = () => {};
const handleObjectTypeChange = () => {
  appStore.selectedObjectTypes = selectedObjectTypes.value;
};
const getSatellites = () => {
  appStore.getSatellites();
};
</script>
<template>
  <v-row>
    <v-col cols="12">
      <v-chip-group
        selected-class="text-primary"
        multiple
        v-model="selectedObjectTypes"
        @change="handleObjectTypeChange"
        mobile
      >
        <v-chip
          v-for="objectType in objectTypesList"
          :key="objectType.value"
          :value="objectType.value"
          variant="outlined"
        >
          {{ objectType.text }} ({{ objectType.count }})
        </v-chip>
      </v-chip-group>
    </v-col>
    <v-col cols="12" md="6">
      <v-text-field
        color="primary"
        v-model="appStore.search"
        variant="outlined"
        type="search"
        density="compact"
        clearable
        @keyup.enter="performSearch"
        rounded
        placeholder="Search by name or NORAD Cat ID"
        append-inner-icon="mdi-magnify"
        hide-details
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="6">
      <v-autocomplete
        v-model="selectedAttributes"
        :items="attributesList"
        variant="outlined"
        density="compact"
        multiple
        chips
        clearable
        label="Select Attributes"
        rounded
        color="primary"
        hide-details
      ></v-autocomplete>
    </v-col>
    <v-col cols="12">
      <v-btn
        color="primary"
        variant="outlined"
        @click="getSatellites"
        rounded
        append-icon="mdi-filter"
        >Apply Filters</v-btn
      >
    </v-col>
  </v-row>
</template>
