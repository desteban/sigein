<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { useCustomizerStore } from '@/stores/customizer'
  import sidebarItems from './sidebarItem'

  import NavGroup from './NavGroup/index.vue'
  import NavItem from './NavItem/index.vue'
  import NavCollapse from './NavCollapse/NavCollapse.vue'
  import { useAuthStore } from '@/stores/auth'
  import ProfileSidebar from '~/components/auth/ProfileSidebar.vue'

  const customizer = useCustomizerStore()
  const sidebarMenu = shallowRef(sidebarItems)
  const authStore = useAuthStore()
</script>

<template>
  <v-navigation-drawer
    v-model="customizer.Sidebar_drawer"
    left
    elevation="0"
    rail-width="75"
    app
    class="leftSidebar"
    :rail="customizer.mini_sidebar"
    expand-on-hover
    width="256"
  >
    <!-- ---------------------------------------------- -->
    <!---Navigation -->
    <!-- ---------------------------------------------- -->
    <perfect-scrollbar class="scrollnavbar">
      <ProfileSidebar />
      <v-list class="py-6 px-4">
        <!---Menu Loop -->
        <template v-for="(item, i) in sidebarMenu">
          <!---Item Sub Header -->
          <NavGroup
            v-if="item.header"
            :key="`group${item.title}${i}`"
            :item="item"
          />
          <!---If Has Child -->
          <NavCollapse
            v-else-if="item.children"
            :key="`collapse${item.title}`"
            class="leftPadding"
            :item="item"
            :level="0"
          />
          <!---Single Item-->
          <NavItem
            v-else
            :key="`item${item.title}`"
            :item="item"
            class="leftPadding"
          />
          <!---End Single Item-->
        </template>
      </v-list>
    </perfect-scrollbar>
  </v-navigation-drawer>
</template>
