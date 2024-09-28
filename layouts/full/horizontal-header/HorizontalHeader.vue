<script setup lang="ts">
  import { useCustomizerStore } from '@/stores/customizer'
  import Logo from '../logo/Logo.vue'
  import LogoIcon from '../logo/LogoIcon.vue'
  // dropdown imports
  import LanguageDD from '../vertical-header/LanguageDD.vue'
  import NotificationDD from '../vertical-header/NotificationDD.vue'
  import ProfileHeader from '~/components/auth/ProfileHeader.vue'
  import Searchbar from '../vertical-header/Searchbar.vue'
  import RightMobileSidebar from '../vertical-header/RightMobileSidebar.vue'

  const customizer = useCustomizerStore()
  const appsDrawer = ref(false)
  const priority = ref(customizer.setHorizontalLayout ? 0 : 0)

  watch(priority, newPriority => {
    priority.value = newPriority
  })

  // count items
</script>

<template>
  <v-app-bar
    elevation="10"
    :priority="priority"
    height="64"
    class="horizontal-header"
    color="primary"
  >
    <div
      :class="
        customizer.boxed
          ? 'maxWidth v-toolbar__content px-lg-0 px-4'
          : 'v-toolbar__content px-6'
      "
    >
      <div class="pt-2 pr-4 d-sm-flex d-none">
        <Logo />
      </div>
      <div class="pt-2 pr-2 d-sm-none d-flex">
        <LogoIcon />
      </div>
      <v-btn
        class="hidden-md-and-up"
        icon
        variant="text"
        size="small"
        @click.stop="customizer.SET_SIDEBAR_DRAWER"
      >
        <v-icon icon="mdi-menu" />
      </v-btn>

      <!-- search mobile -->
      <!-- <v-btn class="hidden-lg-and-up ml-3" icon rounded="sm" variant="flat" size="small" @click="searchbox">
                <SearchIcon size="25"  />
            </v-btn> -->

      <!-- ------------------------------------------------>
      <!-- Search part -->
      <!-- ------------------------------------------------>

      <Searchbar />

      <!---/Search part -->
      <v-spacer />
      <!-- ---------------------------------------------- -->
      <!---right part -->
      <!-- ---------------------------------------------- -->

      <!-- ---------------------------------------------- -->
      <!-- translate -->
      <!-- ---------------------------------------------- -->
      <LanguageDD />

      <!-- ---------------------------------------------- -->
      <!-- Notification -->
      <!-- ---------------------------------------------- -->

      <NotificationDD />

      <!-- ---------------------------------------------- -->
      <!-- ShoppingCart -->
      <!-- ---------------------------------------------- -->
      <v-btn icon variant="text" color="primary" to="">
        <v-badge color="error" :content="0">
          <v-icon size="22">mdi-cart</v-icon>
        </v-badge>
      </v-btn>

      <!-- ---------------------------------------------- -->
      <!-- User Profile -->
      <!-- ---------------------------------------------- -->
      <div class="ml-3">
        <ProfileHeader />
      </div>
    </div>
  </v-app-bar>

  <v-navigation-drawer v-model="appsDrawer" location="right" temporary>
    <RightMobileSidebar />
  </v-navigation-drawer>
</template>
