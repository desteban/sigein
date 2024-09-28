<script setup lang="ts">
  const appsLink = [
    {
      title: 'Dashboard',
      subtext: 'Dashboard',
      href: '/dashboard',
      avatar: '@/assets/images/products/1.jpg'
    },
    {
      title: 'Users',
      subtext: 'Users',
      href: '/users',
      avatar: '@/assets/images/products/2.jpg'
    },
    {
      title: 'Roles',
      subtext: 'Roles',
      href: '/roles',
      avatar: '@/assets/images/products/3.jpg'
    },
    {
      title: 'Permissions',
      subtext: 'Permissions',
      href: '/permissions',
      avatar: '@/assets/images/products/4.jpg'
    },
    {
      title: 'Settings',
      subtext: 'Settings',
      href: '/settings',
      avatar: '@/assets/images/products/1.jpg'
    }
  ]
</script>
<template>
  <!-- ---------------------------------------------- -->
  <!-- apps link -->
  <!-- ---------------------------------------------- -->
  <v-row>
    <v-col v-for="(item, i) in appsLink" :key="i" cols="12" lg="6">
      <router-link
        :to="item.href"
        class="text-decoration-none custom-text-primary"
      >
        <div class="d-flex align-center">
          <v-avatar size="45" color="grey100" rounded="md">
            <v-img
              :src="item.avatar"
              width="24"
              height="24"
              :alt="item.avatar"
            />
          </v-avatar>
          <div class="ml-3">
            <h6
              class="text-subtitle-1 mb-1 textPrimary font-weight-semibold custom-title"
            >
              {{ item.title }}
            </h6>
            <p class="text-subtitle-2 textSecondary">{{ item.subtext }}</p>
          </div>
        </div>
      </router-link>
    </v-col>
  </v-row>
</template>
