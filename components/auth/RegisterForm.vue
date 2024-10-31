<script setup lang="ts">
  import { ref } from 'vue'
  import type { FormContext } from 'vee-validate'

  import { useRouter } from 'vue-router'

  const authStore = useAuthStore()
  const { snackbar } = useSnackbar()
  const router = useRouter()

  const password = ref('')
  const password_confirmation = ref('')
  const email = ref('')
  const username = ref('')
  const loading = ref(false)
  const defaultForm = ref<FormContext>()

  const register = () => {
    defaultForm.value?.validate().then(result => {
      if (result.valid) {
        loading.value = true
        authStore
          .register({
            name: username.value,
            email: email.value,
            password: password.value,
            password_confirmation: password_confirmation.value
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
  <div class="text-h6 text-medium-emphasis text-center mb-6">
    Para crear una cuenta, por favor completa el siguiente formulario
  </div>
  <VeeForm ref="defaultForm" class="mt-5">
    <InputText
      v-model="username"
      label="Username"
      name="Username"
      rules="required"
      autocomplete="username"
      props-class="mb-6"
    />
    <InputText
      v-model="email"
      label="Email Address"
      name="Email Address"
      type="email"
      rules="required|email"
      autocomplete="username"
      props-class="mb-6"
    />
    <InputText
      v-model="password"
      label="Password"
      name="Password"
      type="password"
      rules="required|min:6"
      autocomplete="current-password"
      props-class="mb-6"
    />

    <InputText
      v-model="password_confirmation"
      label="Password Confirmation"
      name="Password Confirmation"
      type="password"
      rules="required|min:6|confirmed:@Password"
      autocomplete="password-confirmation"
      props-class="mb-8"
    />
    <v-row>
      <v-col cols="12">
        <v-btn
          :loading="loading"
          size="large"
          color="primary"
          block
          @click="register"
        >
          Sign Up
        </v-btn>
      </v-col>
    </v-row>
  </VeeForm>
</template>
