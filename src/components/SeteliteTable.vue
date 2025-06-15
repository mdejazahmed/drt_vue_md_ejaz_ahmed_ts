<script setup lang="ts">
import { useAppStore } from "@/stores/app";
import { useSnackbarStore } from "@/stores/app";
import { ref } from "vue";
import { satelliteAPI } from "@/services/api.ts";
const appStore = useAppStore();
const snackbarStore = useSnackbarStore();
onMounted(() => {
  if (appStore.satellites.length == 0) {
    appStore.getSatellites();
  }
});

</script>
<template>
    <v-skeleton-loader
              class="bg-transparent"
              style="height: calc(100vh - 300px)"
              v-if="appStore.loading"
              type="table"
            >
            </v-skeleton-loader>
            <v-data-table-virtual
              class="bg-transparent"
              style="height: calc(100vh - 300px)"
              v-else
              :headers="appStore.headers"
              :items="appStore.satellites"
              fixed-header
              :loading="appStore.loading"
              show-select
              v-model="appStore.selectedItems"
              hover
              :search="appStore.search"
              return-object
            >
              <template
                v-slot:header.data-table-select="{
                  allSelected,
                  selectAll,
                  someSelected,
                }"
              >
              </template>
              <template
                v-slot:item.data-table-select="{
                  internalItem,
                  isSelected,
                  toggleSelect,
                }"
              >
                <v-checkbox-btn
                  hide-details
                  :model-value="isSelected(internalItem)"
                  color="primary"
                  rounded
                  @update:model-value="
                    (value) => {
                      if (isSelected(internalItem)) {
                        toggleSelect(internalItem);
                      } else if (appStore.selectedItems.length < 10) {
                        toggleSelect(internalItem);
                      } else {
                        snackbarStore.showSnackbar({
                          msg: 'You can select maximum 10 items',
                          color: 'error',
                        });
                      }
                    }
                  "
                ></v-checkbox-btn>
              </template>
            </v-data-table-virtual>
</template>
<style scoped>
.v-table.v-table--fixed-header > .v-table__wrapper > table > thead > tr > th {
  background: linear-gradient(45deg, rgb(107, 179, 255), #4ecdc4) 1 !important;
}
</style>