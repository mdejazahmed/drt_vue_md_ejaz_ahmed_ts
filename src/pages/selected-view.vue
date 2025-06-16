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
  <v-main style="background:url('https://cdn.prod.website-files.com/64b3e49ec17f22371194291a/64f3316d098c06f3f74354ec_Who%20We%20Are_Unlocking%20Potential%20BG.jpg') no-repeat center center/cover;">

  <v-container style="min-height: 100vh;">
  <v-row>
    <v-col cols="12">
      <v-card-title> Selected Satellites </v-card-title>
      <CustomTable :items="selectedSatellites" :headers="headers" />
    </v-col>
  </v-row>
  </v-container>
  </v-main>
</template>
