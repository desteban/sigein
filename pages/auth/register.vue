<script setup lang="ts">
  import Logo from '@/layouts/full/logo/LogoAuth.vue'
  /* Register form */
  import RegisterForm from '@/components/auth/RegisterForm.vue'

  definePageMeta({
    layout: 'blank'
  })

  const localePath = useLocalePath()
</script>
<template>
  <div class="authentication">
    <v-container fluid class="pa-3">
      <v-row class="h-100vh d-flex justify-center align-center">
        <v-col cols="12" class="d-flex align-center">
          <v-card
            rounded="md"
            elevation="10"
            class="px-sm-1 px-0 mx-auto"
            max-width="450"
          >
            <v-card-item class="pa-sm-8">
              <div class="d-flex justify-center mb-6">
                <Logo style="width: 300px" />
              </div>
              <!--              <div class="text-h6 text-medium-emphasis text-center mb-6">-->
              <!--                Your Social Campaigns-->
              <!--              </div>-->
              <RegisterForm />
              <h6
                class="text-h6 text-medium-emphasis d-flex justify-center align-center mt-3"
              >
                ¿Ya tienes una cuenta?
                <v-btn
                  variant="plain"
                  :to="localePath('/auth/login')"
                  class="text-primary text-body-1 opacity-1 pl-2"
                >
                  Sign In
                </v-btn>
              </h6>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
