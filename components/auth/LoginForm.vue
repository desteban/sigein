<script setup lang="ts">
  import { ref } from 'vue'
  import type { FormContext } from 'vee-validate'
  import { useRouter } from 'vue-router'

  /* Social icons */
  import google from '@/assets/images/svgs/google-icon.svg'
  import facebook from '@/assets/images/svgs/facebook-icon.svg'
  
  const localePath = useLocalePath()
  const authStore = useAuthStore()
  const { snackbar } = useSnackbar()
  const router = useRouter()
  const checkbox = ref(false)
  const loading = ref(false)
  const password = ref('Isabella01051604')
  const username = ref('sandovalcarlosaugusto@gmail.com')
  const defaultForm = ref<FormContext>()

  const login = () => {
    defaultForm.value?.validate().then(result => {
      if (result.valid) {
        loading.value = true
        authStore
          .login({
            email: username.value,
            password: password.value,
            remember_me: checkbox.value
          })
          .then(() => {
            router.push(localePath('/'))
          })
          .catch((error:Error) => snackbar({ type: 'error', error }))
          .finally(() => {
            loading.value = false
          })
      }
    })
  }
</script>

<template>
  <v-row class="d-flex mb-3">
    <v-col cols="6" sm="6" class="pr-2">
      <v-btn
        variant="outlined"
        size="large"
        class="border text-subtitle-1"
        block
      >
        <img :src="google" height="16" class="mr-2" alt="google" />
        <span class="d-sm-flex d-none mr-1">Sign in with</span>Google
      </v-btn>
    </v-col>
    <v-col cols="6" sm="6" class="pl-2">
      <v-btn
        variant="outlined"
        size="large"
        class="border text-subtitle-1"
        block
      >
        <img
          :src="facebook"
          width="25"
          height="25"
          class="mr-1"
          alt="facebook"
        />
        <span class="d-sm-flex d-none mr-1">Sign in with</span>FB
      </v-btn>
    </v-col>
  </v-row>
  <div class="d-flex align-center text-center mb-6">
    <div
      class="text-h6 w-100 px-5 font-weight-regular auth-divider position-relative"
    >
      <span class="bg-surface px-5 py-3 position-relative"
        >or sign in with</span
      >
    </div>
  </div>
  <VeeForm ref="defaultForm" class="mt-5" @submit="login">
    <InputText
      v-model="username"
      label="Username"
      name="Username"
      type="email"
      rules="required|email"
      autocomplete="username"
      props-class="mb-8"
    />
    <InputText
      v-model="password"
      label="Password"
      name="Password"
      type="password"
      rules="required"
      autocomplete="current-password"
    />
    <div class="d-flex flex-wrap align-center my-3 ml-n2">
      <v-checkbox v-model="checkbox" hide-details color="primary">
        <template #label>Remeber this Device</template>
      </v-checkbox>
      <div class="ml-sm-auto">
        <NuxtLink
          :to="localePath('/auth/forgot-password')"
          class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium"
        >
          Forgot Password ?
        </NuxtLink>
      </div>
    </div>
    <v-btn
      size="large"
      :loading="loading"
      type="submit"
      color="primary"
      block
      flat
    >
      Sign In
    </v-btn>
  </VeeForm>
</template>
