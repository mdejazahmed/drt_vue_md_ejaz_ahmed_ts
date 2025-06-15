<script setup>
import { ROUTES } from "@/constants/routeKeys";
import { useRouter } from "vue-router";
// Navigation
const router = useRouter()

// Go Home function
const goHome = () => {
  router.push({name:ROUTES.HOME.name})
}
</script>

<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="elevation-12">
          <v-card-text class="text-center pa-12">
            <div class="text-h2 mb-4">404</div>
            <div class="text-h5 mb-4">Page Not Found</div>
            <div class="text-body-1 mb-8">
              The page you are looking for doesn't exist or has been moved.
            </div>
            <v-btn 
              color="primary" 
              variant="outlined"
              @click="goHome"
              class="text-capitalize"
            >
              Go Home
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.v-card {
  border-radius: 12px;
}
</style>
