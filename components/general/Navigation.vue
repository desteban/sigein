<script setup lang="ts">
  const route = useRoute();
  
  const hideSlider = computed(() => {
    return route.path !== '/offers' && route.path !== '/'
  })
</script>

<template>
  <v-tabs
    align-tabs="center"
    stacked
    :grow="true"
    :hide-slider="hideSlider"
  >
    <v-tab to="/">
      <v-icon icon="mdi-account-group" />
      Comunidad
    </v-tab>
    <v-tab to="/offers">
      <v-icon icon="mdi-briefcase" />
      Ofertas
    </v-tab>
  </v-tabs>
</template>

<style scoped lang="scss">

</style>
