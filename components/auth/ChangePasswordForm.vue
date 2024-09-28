<script setup lang="ts">
  import type { FormContext } from 'vee-validate'
  import { useRouterStore } from "~/stores/router";

  const authStore = useAuthStore()
  const routerStore = useRouterStore()
  const router = useRouter()
  const { snackbar } = useSnackbar()
  const loading = ref(false)
  const password = ref('')
  const newPassword = ref('')
  const newPasswordConfirmation = ref('')
  const changePasswordForm = ref<FormContext>()

  const changePassword = () => {
    changePasswordForm.value?.validate().then(result => {
      if (result.valid) {
        loading.value = true
        authStore
          .changePassword({
            current_password: password.value,
            new_password: newPassword.value,
            new_password_confirmation: newPasswordConfirmation.value
          })
          .then(() => {
            snackbar({
              type: 'success',
              message: 'Password changed successfully'
            })
            setTimeout(() => {
              router.push(routerStore.from?.path || '/')
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
  <VeeForm ref="changePasswordForm" class="mt-5" @submit="changePassword">
    <InputText
      v-model="password"
      label="Current Password"
      name="Current Password"
      type="password"
      rules="required"
      props-class="mb-8"
      autocomplete="current-password"
    />
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
      Change Password
    </v-btn>
  </VeeForm>
</template>
