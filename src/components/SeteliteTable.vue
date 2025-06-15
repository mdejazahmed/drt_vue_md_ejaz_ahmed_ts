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
      v-slot:header.data-table-select="{ allSelected, selectAll, someSelected }"
    >
    </template>
    <template
      v-slot:item.data-table-select="{ internalItem, isSelected, toggleSelect }"
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
    <template v-slot:item.name="props">
      {{ props.item.name||'--' }}
    </template>
    <template v-slot:item.noradCatId="props">
      {{ props.item.noradCatId||'--' }}
    </template>
    <template v-slot:item.intlDes="props">
      {{ props.item.intlDes||'--' }}
    </template>
    <template v-slot:item.launchDate="props">
      {{ props.item.launchDate||'--' }}
    </template>
    <template v-slot:item.decayDate="props">
      {{ props.item.decayDate||'--' }}
    </template>
    <template v-slot:item.objectType="props">
      {{ props.item.objectType||'--' }}
    </template>
    <template v-slot:item.launchSiteCode="props">
      {{ props.item.launchSiteCode||'--' }}
    </template>
    <template v-slot:item.countryCode="props">
      {{ props.item.countryCode||'--' }}
    </template>
    <template v-slot:item.orbitCode="props">
      {{ props.item.orbitCode||'--' }}
    </template>
  </v-data-table-virtual>
</template>
<style scoped>
.v-data-table{
    border-radius: 8px !important;
overflow: hidden !important;
}
.v-data-table.v-table--fixed-header:deep(th){
    background: linear-gradient(360deg, #00c7f7, #9026ff) !important;
}
</style>
