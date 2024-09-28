<script setup lang="ts">
  import { ref, watch } from 'vue'
  import LanguageDD from './LanguageDD.vue'
  import NotificationDD from './NotificationDD.vue'
  import ProfileHeader from '~/components/auth/ProfileHeader.vue'
  import Searchbar from './Searchbar.vue'
  import Logo from '../logo/Logo.vue'
  import LogoIcon from '../logo/LogoIcon.vue'
  import RightMobileSidebar from './RightMobileSidebar.vue'

  const customizer = useCustomizerStore()
  // const showSearch = ref(false)
  const appsDrawer = ref(false)
  const priority = ref(customizer.setHorizontalLayout ? 0 : 0)
  // function searchbox() {
  //   showSearch.value = !showSearch.value
  // }
  watch(priority, newPriority => {
    priority.value = newPriority
  })
</script>

<template>
  <v-app-bar elevation="5" :priority="priority" height="64" color="primary">
    <div class="pt-2 d-sm-flex d-none">
      <Logo />
    </div>
    <div class="pt-2 pr-2 d-sm-none d-flex">
      <LogoIcon />
    </div>
    <v-btn
      class="hidden-md-and-down"
      icon=""
      color="primary"
      variant="text"
      @click.stop="customizer.SET_MINI_SIDEBAR(!customizer.mini_sidebar)"
    >
      <v-icon icon="mdi-menu" size="26" />
    </v-btn>
    <v-btn
      class="hidden-lg-and-up"
      icon=""
      variant="text"
      size="small"
      @click.stop="customizer.SET_SIDEBAR_DRAWER"
    >
      <v-icon icon="mdi-menu" size="26" />
    </v-btn>

    <!-- ---------------------------------------------- -->
    <!-- Search part -->
    <!-- ---------------------------------------------- -->

    <Searchbar />
    <v-spacer />
    
    <GeneralNavigation />

    <!---/Search part -->

    <!-- ---------------------------------------------- -->
    <!-- Mega menu -->
    <!-- ---------------------------------------------- -->
    <!-- <div class="hidden-md-and-down">
            <Navigations />
        </div> -->
    <v-spacer />
    <!-- ---------------------------------------------- -->
    <!---right part -->
    <!-- ---------------------------------------------- -->
    <!-- ---------------------------------------------- -->
    <!-- translate -->
    <!-- ---------------------------------------------- -->

    <LanguageDD />
    
    <v-btn
      icon
      variant="text"
      color="primary"
      @click.stop="customizer.SET_CUSTOMIZER_DRAWER(!customizer.Customizer_drawer)"
    >
      <v-icon icon="mdi-palette-outline" size="26" />
    </v-btn>
    
    <!-- ---------------------------------------------- -->
    <!-- ShoppingCart -->
    <!-- ---------------------------------------------- -->
    <v-btn icon variant="text" class="ml-1" color="primary" to="">
      <v-badge color="error" :content="0">
        <v-icon size="24">mdi-cart</v-icon>
      </v-badge>
    </v-btn>

    <!-- ---------------------------------------------- -->
    <!-- Notification -->
    <!-- ---------------------------------------------- -->
    <NotificationDD />
    <!-- ---------------------------------------------- -->
    <!-- User Profile -->
    <!-- ---------------------------------------------- -->
    <div class="ml-2">
      <ProfileHeader />
    </div>
  </v-app-bar>

  <!-- ---------------------------------------------- -->
  <!-- Right Sidebar -->
  <!-- ---------------------------------------------- -->
  <v-navigation-drawer v-model="appsDrawer" location="right" temporary>
    <RightMobileSidebar />
  </v-navigation-drawer>
</template>
