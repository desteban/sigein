<script setup lang="ts">
  const appsLink = [
    {
      title: 'Inicio',
      subtext: 'Página de inicio',
      href: '/',
      avatar: 'mdi-home-outline'
    },
    {
      title: 'Personas',
      subtext: 'Gestión de personas',
      href: '/persons',
      avatar: 'mdi-account-group-outline'
    },
    {
      title: 'Usuarios',
      subtext: 'Gestión de usuarios',
      href: '/users',
      avatar: 'mdi-account-group-outline'
    },
    {
      title: 'Roles y permisos',
      subtext: 'Gestión de roles',
      href: '/roles',
      avatar: 'mdi-account-switch-outline'
    }
  ]
</script>
<template>
  <!-- ---------------------------------------------- -->
  <!-- apps link -->
  <!-- ---------------------------------------------- -->
  <v-row>
    <v-col v-for="(item, i) in appsLink" :key="i" cols="12">
      <router-link
        :to="item.href"
        class="text-decoration-none custom-text-primary"
      >
        <div class="d-flex align-center">
          <v-avatar size="45" color="grey100" rounded="md">
            <v-icon
              :icon="item.avatar"
              width="24"
              height="24"
              color="primary"
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
