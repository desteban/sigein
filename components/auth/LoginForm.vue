<script setup lang="ts">
  import { ref } from 'vue'
  import type { FormContext } from 'vee-validate'
  import { useRouter } from 'vue-router'
  import { useDisplay } from 'vuetify'

  const localePath = useLocalePath()
  const authStore = useAuthStore()
  const { snackbar } = useSnackbar()
  const { xs } = useDisplay()
  const router = useRouter()
  const checkbox = ref(false)
  const loading = ref(false)
  const password = ref('')
  const username = ref('')
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
            router.push('/')
          })
          .catch((error: Error) => snackbar({ type: 'error', error }))
          .finally(() => {
            loading.value = false
          })
      }
    })
  }
</script>

<template>
  <div class="d-flex align-center text-center mb-6">
    <div
      class="text-h6 w-100 px-5 font-weight-regular auth-divider position-relative"
    >
      <span class="bg-surface px-5 py-3 position-relative">¡Bienvenido!</span>
    </div>
  </div>
  <div
    class="d-flex align-center text-center mb-6"
    :style="`max-width:${!xs ? '400px' : '100%'}`"
  >
    Por favor, ingresa tus credenciales a continuación para acceder a tu cuenta.
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
