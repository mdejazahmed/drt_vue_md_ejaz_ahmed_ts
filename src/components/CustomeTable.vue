<script setup>
const { headers, items } = defineProps({
  headers: {
    type: Array,
    required: true,
    default: () => [],
  },
  items: {
    type: Array,
    required: true,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
</script>
<template>
  <div class="d-flex flex-column gap-2">
    <!-- Header -->
    <v-card
      class="rounded-lg bg-surface-light"
      border="#E4E4E4 sm"
      :loading="loading"
      color="primary"

    >
      <v-card-title class="d-flex align-center justify-space-between">
        <div
          v-for="(header, index) in headers"
          :key="header.key || index"
          :style="`width: ${header.width || '20%'}`"
          :class="header.align ? `text-${header.align}` : 'text-left'"
          class="text-subtitle-2 font-weight-bold text-medium-emphasis"
        >
          {{ header.title }}
        </div>
      </v-card-title>
    </v-card>
    <!-- Rows -->
          <v-card class="rounded-lg" variant="flat" border="#E4E4E4 sm" v-for="(item, index) in items" :key="index">
          <div class="d-flex align-center pa-2">
            <template
              v-for="(header, headerIndex) in headers"
              :key="header.key || headerIndex"
            >
              <div
                :style="`width: ${header.width || '20%'}`"
                :class="[
                  'text-subtitle-2',
                  header.align ? `text-${header.align}` : 'text-left',
                ]"
              >
                <template v-if="$slots[header.key]">
                  <slot :name="header.key" :item="item" :index="index"></slot>
                </template>
                <template v-else>
                  {{ item[header.key]||'--' }}
                </template>
              </div>
            </template>
          </div>
        </v-card>
     
  </div>
</template>
<style scoped>
.scroller {
  height: 500px;
}
</style>