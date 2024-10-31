<script setup lang="ts">
  import { RouterLink } from 'vue-router'
  import logo from '@/assets/images/logos/logo-dark.png'
</script>
<template>
  <div class="logo" style="width: 100%">
    <RouterLink to="/">
      <img :src="logo" alt="home" style="width: 100%" />
    </RouterLink>
  </div>
</template>
