<script setup lang="ts">
  import { ref } from 'vue'
  import type { FormContext } from 'vee-validate'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '@/stores/auth'
  import { useSnackbar } from '@/composables/useSnackbar'
  import Logo from '@/layouts/full/logo/LogoAuth.vue'
  
  definePageMeta({
    layout: 'blank',
  })
  
  const localePath = useLocalePath()
  const authStore = useAuthStore()
  const router = useRouter()
  const { snackbar } = useSnackbar()
  const loading = ref(false)
  const email = ref('')
  const forgotPasswordForm = ref<FormContext>()

  const forgotPassword = () => {
    forgotPasswordForm.value?.validate().then(result => {
      if (result.valid) {
        loading.value = true
        authStore
          .forgotPassword({ email: email.value })
          .then(() => {
            snackbar({
              type: 'success',
              timeout: 20000,
              message:
                'An email has been sent to your inbox with instructions on how to reset your password. Please check your email and follow the instructions to complete the password reset process. If you do not see the email, please check your spam or junk folder.'
            })
            setTimeout(() => {
              router.push('/auth/login')
            }, 1000)
          })
          .catch(error => snackbar({ type: 'error', error }))
          .finally(() => {
            loading.value = false
          })
      }
    })
  }
</script>

<template>
  <div class="pa-3">
    <v-row class="h-100vh mh-100 auth">
      <v-col
        cols="12"
        lg="8"
        xl="8"
        xxl="9"
        class="d-lg-flex align-center justify-center authentication position-relative"
      >
        <div class="auth-header pt-sm-6 pt-2 px-sm-6 px-3 pb-sm-6 pb-0">
          <div class="position-relative">
            <Logo />
          </div>
        </div>
        <div class="">
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
          <h2 class="text--darken-2 text-h4 font-weight-semibold">
            Forgot your password?
          </h2>
          <p class="text-subtitle-1 py-4 text-10">
            Please enter the email address associated with your account and We
            will email you a link to reset your password.
          </p>
          <VeeForm
            ref="forgotPasswordForm"
            class="mt-5"
            @submit="forgotPassword"
          >
            <InputText
              v-model="email"
              label="Email Address"
              name="Email Address"
              type="email"
              rules="required|email"
              autocomplete="username"
              props-class="mb-8"
            />
          </VeeForm>
          <v-btn
            size="large"
            color="primary"
            block
            submit
            flat
            :loading="loading"
            @click="forgotPassword"
          >
            Forgot Password
          </v-btn>
          <v-btn
            size="large"
            color="light-primary"
            :to="localePath('/auth/login')"
            block
            class="mt-5 text-primary"
            :loading="loading"
            flat
          >
            Back to Login
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
