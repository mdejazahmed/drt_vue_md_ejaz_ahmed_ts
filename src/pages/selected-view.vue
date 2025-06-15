<script setup>
import { useStorage } from "@vueuse/core";
import CustomTable from "@/components/CustomeTable.vue";
const selectedSatellites = useStorage("selectedSatellites", []);
const headers = [
  { title: "Name", key: "name", sortable: true },
  { title: "NORAD Cat ID", key: "noradCatId", sortable: true },
  { title: "Orbit Code", key: "orbitCode", sortable: false },
  { title: "Object Type", key: "objectType", sortable: false },
  { title: "Country Code", key: "countryCode", sortable: true },
  { title: "Launch Date", key: "launchDate", sortable: true },
];
</script>

<template>
  <v-container style="min-height: 100vh;">
  <v-row>
    <v-col cols="12">
      <v-card-title> Selected Satellites </v-card-title>
      <CustomTable :items="selectedSatellites" :headers="headers" />
    </v-col>
  </v-row>
  </v-container>
</template>
