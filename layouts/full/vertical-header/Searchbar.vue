<script setup>
  import { ref } from 'vue'

  const searchSugg = ref([
    {
      title: 'Dashboard',
      href: '/dashboard'
    },
    {
      title: 'Profile',
      href: '/profile'
    },
    {
      title: 'Settings',
      href: '/settings'
    },
    {
      title: 'Logout',
      href: '/logout'
    }
  ])
</script>

<template>
  <v-menu :close-on-content-click="false" class="search_popup">
    <template #activator="{ props }">
      <v-btn
        icon=""
        variant="text"
        class="custom-hover-primary ml-2"
        size="small"
        color="primary"
        v-bind="props"
      >
        <v-icon icon="mdi-magnify" size="26" />
      </v-btn>
    </template>
    <v-sheet width="360" elevation="10" rounded="md">
      <div class="d-flex align-center justify-space-between pa-5">
        <v-text-field
          placeholder="Search"
          color="primary"
          density="compact"
          variant="outlined"
          hide-details
        ></v-text-field>
      </div>
      <v-divider></v-divider>
      <h5 class="text-h5 mt-4 px-5 pb-4">Quick Page Links</h5>
      <perfect-scrollbar style="height: 380px">
        <v-list class="pt-0 pb-5" lines="two">
          <v-list-item
            v-for="(item, index) in searchSugg"
            :key="index"
            :value="item"
            :to="item.href"
            color="primary"
            class="px-5 py-2"
          >
            <h6 class="text-subtitle-1 font-weight-medium mb-1">
              {{ item.title }}
            </h6>
            <p class="text-subtitle-2 text-medium-emphasis">{{ item.href }}</p>
          </v-list-item>
        </v-list>
      </perfect-scrollbar>
    </v-sheet>
  </v-menu>
</template>
