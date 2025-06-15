<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { ROUTES } from "@/constants/routeKeys";
import { useAppStore } from "@/stores/app";
const appStore = useAppStore();
const router = useRouter();
const emit = defineEmits(["clearSelection", "removeSatellite"]);
const clearSelection = () => {
  appStore.selectedItems = [];
};
const proceed = () => {
  localStorage.setItem("selectedSatellites", JSON.stringify(appStore.selectedItems));
  router.push({ name: ROUTES.SELECTED_VIEW.name });
};
const removeSatellite = (satellite: any) => {
  appStore.selectedItems = appStore.selectedItems.filter(
    (item) => item.noradCatId !== satellite.noradCatId
  );
};
</script>
<template>
  <v-row>
    <v-col cols="12">
      <h2>Selected Assets</h2>
    </v-col>
    <v-col cols="12">
      <div class="border-image">
        <div
          class="d-flex align-center justify-space-between pa-2"
          v-if="appStore.selectedItems.length > 0"
        >
          <div class="text-primary">
            {{ appStore.selectedItems.length }} Object Selected
          </div>
          <div>
            <v-btn
              density="compact"
              size="small"
              color="primary"
              variant="text"
              @click="clearSelection"
              append-icon="mdi-close"
              >Clear Selection</v-btn
            >
          </div>
        </div>
        <v-divider />

        <v-list class="bg-transparent" v-if="appStore.selectedItems.length > 0">
          <v-list-item
            v-for="(satellite, index) in appStore.selectedItems"
            :key="index"
            :value="satellite"
          >
            <div class="d-flex align-center gap-4">
              <div>
                {{ satellite.noradCatId }}
              </div>
              <div>
                {{ satellite.name }}
              </div>
              <v-spacer />
              <v-btn
                icon="mdi-close"
                @click="removeSatellite(satellite)"
                variant="text"
                size="small"
                density="compact"
              >
              </v-btn>
            </div>
          </v-list-item>
        </v-list>
        <v-empty-state
          v-else
          icon="mdi-playlist-remove"
          title="No selected satellites"
          text="Please select satellites"
        ></v-empty-state>
      </div>
      <v-btn
        class="w-100 mt-4"
        variant="flat"
        color="secondary"
        v-if="appStore.selectedItems.length > 0"
        @click="proceed"
        >Proceed</v-btn
      >
    </v-col>
  </v-row>
</template>
<style scoped>
.border-image {
  border: 1px solid;
  border-image: linear-gradient(45deg, #00c7f7, #9026ff) 1;
  font-weight: 500;
  height: calc(100vh - 250px);
}
</style>
