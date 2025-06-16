<script setup>
import { ref } from "vue";
import { satelliteAPI } from "@/services/api.ts";
import { useSnackbarStore } from "@/stores/app";
import { useRouter } from "vue-router";
import { ROUTES } from "@/constants/routeKeys";
import SeteliteTable from "@/components/SeteliteTable.vue";
import SelectedItems from "@/components/SelectedItems.vue";
import Filters from "@/components/Filters.vue";
import { useAppStore } from "@/stores/app";
const router = useRouter();
const snackbarStore = useSnackbarStore();
const appStore = useAppStore();
</script>
<template>
  <v-main style="background:url('https://cdn.prod.website-files.com/64b3e49ec17f22371194291a/64f3316d098c06f3f74354ec_Who%20We%20Are_Unlocking%20Potential%20BG.jpg') no-repeat center center/cover;">
  <v-container style="min-height: 100vh">
    <v-row>
      <v-col cols="12">
        <h2>Create my satellite list</h2>
      </v-col>
      <v-col cols="12" md="4" order-md="2">
        <SelectedItems />
      </v-col>
      <v-divider vertical class="vertical-divider" order-md="1" />
      <v-col cols="12" md="8">
        <v-row>
          <v-col cols="12">
            <Filters />
          </v-col>
          <v-col cols="12">
            <SeteliteTable />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</v-main>
</template>
<style scoped>
.vertical-divider {
  border-image: linear-gradient(345deg, rgb(1 121 248), #ff3900, #00ff97) 1;
}
</style>
