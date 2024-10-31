<script setup lang="ts">
  import Logo from '@/layouts/full/logo/LogoAuth.vue'
  import ResetPasswordForm from '@/components/auth/ResetPasswordForm.vue'

  definePageMeta({
    layout: 'blank'
  })

  const localePath = useLocalePath()
</script>

<template>
  <div>
    <v-row no-gutters class="h-100vh mh-100 auth">
      <v-col
        cols="12"
        lg="8"
        xl="8"
        xxl="9"
        class="d-lg-flex align-center justify-center authentication position-relative"
      >
        <div>
          <img
            src="@/assets/images/backgrounds/login-bg.svg"
            class="position-relative d-none d-lg-flex"
            alt="login-background"
          />
        </div>
      </v-col>
      <v-col
        cols="12"
        lg="4"
        xl="4"
        xxl="3"
        class="d-flex align-center justify-center bg-surface"
      >
        <div class="pa-sm-7 pa-4">
          <div class="d-flex justify-center mb-6">
            <Logo style="width: 300px" />
          </div>
          <h2 class="text--darken-2 text-h4 font-weight-semibold">
            Reset Your Password
          </h2>
          <p class="text-subtitle-1 py-4 text-10">
            Please enter your new password below. Make sure to confirm it by
            typing it again in the confirmation field. After submitting, your
            password will be updated, and you can log in with your new password.
          </p>
          <ResetPasswordForm />
          <v-btn
            size="large"
            color="light-primary"
            :to="localePath('/auth/login')"
            block
            class="mt-5 text-primary"
            flat
          >
            Back to Login
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
