<script setup lang="ts">
  import VerticalSidebarVue from './full/vertical-sidebar/VerticalSidebar.vue'
  import VerticalHeaderVue from './full/vertical-header/VerticalHeader.vue'
  import HorizontalHeader from './full/horizontal-header/HorizontalHeader.vue'
  import HorizontalSidebar from './full/horizontal-sidebar/HorizontalSidebar.vue'
  import Customizer from './full/customizer/Customizer.vue'
  const customizer = useCustomizerStore()
</script>

<template>
  <v-locale-provider>
    <v-app
      :theme="customizer.actTheme"
      :class="[
        customizer.actTheme,
        customizer.mini_sidebar ? 'mini-sidebar' : '',
        customizer.setHorizontalLayout ? 'horizontalLayout' : 'verticalLayout',
        customizer.setBorderCard ? 'cardBordered' : '',
        customizer.inputBg ? 'inputWithbg' : ''
      ]"
    >
      <v-navigation-drawer
        v-model="customizer.Customizer_drawer"
        app
        temporary
        elevation="10"
        location="right"
        width="320"
      >
        <Customizer />
      </v-navigation-drawer>
      <VerticalHeaderVue v-if="!customizer.setHorizontalLayout" />
      <VerticalSidebarVue v-if="!customizer.setHorizontalLayout" />
      <HorizontalHeader v-if="customizer.setHorizontalLayout" />
      <HorizontalSidebar v-if="customizer.setHorizontalLayout" />

      <v-main>
        <v-container fluid class="page-wrapper pb-sm-15 pb-10">
          <div :class="customizer.boxed ? 'maxWidth' : ''">
            <slot />
          </div>
        </v-container>
      </v-main>
    </v-app>
  </v-locale-provider>
</template>
