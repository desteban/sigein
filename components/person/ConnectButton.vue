<script setup lang="ts">
  const props = withDefaults(defineProps<{ personId: number }>(), {
    personId: 0
  })
</script>

<template>
  <v-btn color="primary" class="text-capitalize">
    <v-icon icon="mdi-account-plus-outline" class="mr-1" size="22" />
    Conectar
  </v-btn>
</template>

<style scoped lang="scss"></style>
