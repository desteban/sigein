<script setup lang="ts">
  import { RouterLink } from 'vue-router'
  import LogoIcon from '@/assets/images/logos/logo-icon.png'
</script>
<template>
  <div class="logo" style="width: 100%">
    <RouterLink to="/">
      <img :src="LogoIcon" alt="home" style="width: 100%" />
    </RouterLink>
  </div>
</template>
