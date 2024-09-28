<script setup lang="ts">
import LanguageDD from "~/layouts/full/vertical-header/LanguageDD.vue";
</script>

<template>
  <v-app>
    <div style="position: fixed; right: 20px; top: 8px; z-index: 1;">
      <LanguageDD />
    </div>
    <slot />
  </v-app>
</template>
