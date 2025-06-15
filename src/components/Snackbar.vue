<template>
    <v-snackbar
      v-model="snackbarStore.show"
      timeout="2000"
      :color="snackbarStore.color === 'success' ? '#323741' : '#323741'"
      class="center-snackbar"
  
    >
      <div class="snackbarDiv">
        <span
          :class="snackbarStore.color === 'success' ? 'greenBar' : 'redBar'"
        ></span>
        <v-icon :icon="snackbarStore.color === 'success' ? 'mdi-check-circle' : 'mdi-alert-circle'" :color="snackbarStore.color === 'success' ? 'success' : 'error'"/>
        <span class="text-subtitle-2">{{ snackbarStore.msg }}</span>
      </div>
    </v-snackbar>
</template>

<script setup>
import { useSnackbarStore } from "@/stores/app";
import { computed } from "vue";
const snackbarStore= useSnackbarStore()
</script>

<style lang="scss" scoped>
.center-snackbar {
  /* margin: auto; */
  transform: translateY(-10%);
  border-radius: 4px;

  .snackbarDiv {
    display: flex;
    align-items: center;
    gap: 16px;

    .greenBar {
      align-self: stretch;
      height: 40px;
      width: 3px;
      border-radius: 3px;
      background-color: #4ca955;
    }

    .redBar {
      align-self: stretch;
      height: 40px;
      width: 3px;
      border-radius: 3px;
      background-color: #eb6161;
    }
  }
}
</style>
