<template>
  <v-app>

  <component :is="layout" theme="dark">
      <router-view />
    </component>
  </v-app>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
const route = useRoute()
const layout = computed(() => {
  return route.meta.layout || "default"
})
</script>
