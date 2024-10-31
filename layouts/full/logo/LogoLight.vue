<script setup lang="ts">
  import { RouterLink } from 'vue-router'
  import Darklogo from '@/assets/images/logos/logo-dark.png'
</script>
<template>
  <div class="logo" style="width: 100%">
    <RouterLink to="/">
      <img :src="Darklogo" alt="home" style="width: 100%" />
    </RouterLink>
  </div>
</template>
