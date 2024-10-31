<script setup lang="ts">
  import AppsLink from './AppsLink.vue'
  // import QuickLinks from './QuickLinks.vue'
</script>

<template>
  <div class="pt-6">
    <h5 class="text-h5 mb-4 px-5">Menu principal</h5>
    <v-list>
      <v-list-item class="pl-6 pb-6" ripple>
        <AppsLink />
      </v-list-item>
    </v-list>
    <!--    <div class="px-5">-->
    <!--      <h5 class="text-h5 my-4">Quick Links</h5>-->
    <!--      <QuickLinks />-->
    <!--    </div>-->
  </div>
</template>
