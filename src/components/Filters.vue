<script setup lang="ts">
import { useAppStore } from "@/stores/app";
import type { Satellite } from "@/types/satellite";
const appStore = useAppStore();

const menu = ref(false);
const performSearch = (e:Event) => {
  const target = e.target as HTMLInputElement;
  const query = target.value.toLowerCase();
  appStore.filteredSatellites = appStore.satellites.filter((satellite:Satellite) => {
    return (
      satellite.name.toLowerCase().includes(query) ||
      satellite.noradCatId.toLowerCase().includes(query)
    );
  });
};

const getSatellites = () => {
  menu.value = false;
  appStore.getSatellites();
};
const handleAllClick = (value: boolean | null) => {
  if (value === null) {
    appStore.selectedObjectTypes = [];
  } else {
    appStore.selectedObjectTypes = value
      ? appStore.objectTypesList.map((item) => item.value)
      : [];
  }
};
</script>
<template>
  <v-row>
    <v-col cols="12">
      <v-chip-group
        selected-class="text-primary"
        multiple
       :model-value="appStore.selectedObjectTypes"
        mobile
      >
        <v-chip
          v-for="objectType in appStore.objectTypesList"
          :key="objectType.value"
          :value="objectType.value"
          variant="outlined"
        >
          {{ objectType.text }} ({{ objectType.count }})
        </v-chip>
      </v-chip-group>
    </v-col>
    <v-col cols="12" md="6" class="d-flex align-center gap-2">
      <v-text-field
        color="primary"
        v-model.trim="appStore.search"
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
      <v-menu v-model="menu" :close-on-content-click="false" location="end">
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            variant="text"
            icon="mdi-filter-outline"
            color="primary"
          >
            <v-badge color="secondary" :content="appStore.appliedFiltersCount">
              <v-icon>mdi-filter-outline</v-icon>
            </v-badge>
          </v-btn>
        </template>

        <v-card rounded="lg" bg="transparent" width="400">
          <v-card-text>
              <div class="text-subtitle-1 font-weight-bold py-2">Object Types</div>
            <v-row>
              <v-col cols="12" class="d-flex flex-wrap gap-2">
                <v-checkbox
                  :label="`All (${appStore.objectTypesList.reduce(
                    (acc, crr) => acc + crr.count,
                    0
                  )})`"
                  @update:model-value="handleAllClick"
                  density="compact"
                  :model-value="
                    appStore.selectedObjectTypes.length ===
                    appStore.objectTypesList.length
                  "
                  hide-details
                ></v-checkbox>
                <v-checkbox
                  v-for="objectType in appStore.objectTypesList"
                  :key="objectType.value"
                  v-model="appStore.selectedObjectTypes"
                  :label="`${objectType.text} (${objectType.count})`"
                  :value="objectType.value"
                  density="compact"
                  hide-details
                ></v-checkbox>
              </v-col>
            </v-row>
            <v-divider></v-divider>
              <div class="text-subtitle-1 font-weight-bold py-2">Attributes</div>
            <v-row>
              <v-col cols="12" class="d-flex flex-wrap gap-2">
                <v-checkbox
                  v-for="attribute in appStore.attributesList"
                  :key="attribute"
                  v-model="appStore.selectedAttributes"
                  :label="attribute"
                  :value="attribute"
                  density="compact"
                  hide-details
                ></v-checkbox>
              </v-col>
            </v-row>
              <v-divider></v-divider>
              <div class="text-subtitle-1 font-weight-bold py-2">Orbit Code</div>
            <v-row>
              <v-col cols="12" class="d-flex flex-wrap gap-2">
                <v-checkbox
                  v-for="orbitCode in appStore.orbitCode"
                  :key="orbitCode"
                  v-model="appStore.selectedOrbitCode"
                  :label="orbitCode"
                  :value="orbitCode"
                  density="compact"
                  hide-details
                ></v-checkbox>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions>
            <v-btn
              color="primary"
              class="w-100"
              variant="outlined"
              @click="getSatellites"
              rounded
              append-icon="mdi-filter"
              >Apply Filters</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-col>
  </v-row>
</template>
