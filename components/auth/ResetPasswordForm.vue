<script setup lang="ts">
  import type { FormContext } from 'vee-validate'

  const authStore = useAuthStore()
  const router = useRouter()
  const route = useRoute()
  const { snackbar } = useSnackbar()

  const totalLoading = ref(false)
  const loading = ref(false)
  const token: string = route.query.token as string
  const email: string = route.query.email as string
  const newPassword = ref('')
  const newPasswordConfirmation = ref('')
  const errorMessage = ref('')
  const resetPasswordForm = ref<FormContext>()

  const resetPassword = () => {
    resetPasswordForm.value?.validate().then(result => {
      if (result.valid) {
        loading.value = true
        authStore
          .resetPassword({
            email,
            password: newPassword.value,
            password_confirmation: newPasswordConfirmation.value,
            token
          })
          .then(() => {
            snackbar({
              type: 'success',
              message:
                'Your password has been reset successfully. You can now log in with your new password.'
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

  const verifyToken = () => {
    errorMessage.value = ''
    totalLoading.value = true
    authStore
      .verifyToken({ token, email })
      .catch(error => {
        console.log('error?.response?.data', error?.response?.data?.message)
        if (
          error?.response?.data?.message !== null &&
          !error.response.data.valid
        ) {
          errorMessage.value = error.response.data.message
        } else {
          errorMessage.value =
            'An error occurred while verifying the token. Please try again.'
        }
      })
      .finally(() => {
        totalLoading.value = false
      })
  }
  verifyToken()
</script>

<template>
  <v-card v-if="totalLoading" flat height="200px">
    <v-card-text>
      <Loading v-model="totalLoading" contained overlay-color="light" />
    </v-card-text>
  </v-card>
  <template v-else-if="errorMessage">
    <v-alert type="error">
      {{ errorMessage }}
    </v-alert>
    <v-btn
      size="large"
      :to="{ name: 'ForgotPassword' }"
      color="primary"
      block
      type="submit"
      class="mt-8"
      flat
    >
      request password change
    </v-btn>
  </template>
  <VeeForm v-else ref="resetPasswordForm" class="mt-5" @submit="resetPassword">
    <InputText
      v-model="newPassword"
      label="New Password"
      name="New Password"
      type="password"
      rules="required"
      props-class="mb-8"
      autocomplete="new-password"
    />
    <InputText
      v-model="newPasswordConfirmation"
      label="Confirmation New Password"
      name="Confirmation New Password"
      type="password"
      rules="required|confirmed:@New Password"
      autocomplete="new-password"
    />
    <v-btn
      size="large"
      :loading="loading"
      color="primary"
      block
      type="submit"
      class="mt-8"
      flat
    >
      Reset Password
    </v-btn>
  </VeeForm>
</template>
