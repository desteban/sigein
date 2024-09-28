<script setup lang="ts">
import { ref } from 'vue';
import type { FormContext } from 'vee-validate'

/*Social icons*/
import google from '@/assets/images/svgs/google-icon.svg';
import facebook from '@/assets/images/svgs/facebook-icon.svg';
import { useRouter } from "vue-router";

const authStore = useAuthStore()
const { snackbar } = useSnackbar()
const router = useRouter()

const password = ref('');
const password_confirmation = ref('');
const email = ref('');
const username = ref('');
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
        .catch((error:Error) => snackbar({ type: 'error', error }))
        .finally(() => {
          loading.value = false
        })
    }
  })
}
</script>
<template>
    <v-row class="d-flex mb-6">
        <v-col cols="6" sm="6"  class="pr-2">
            <v-btn variant="outlined" size="large" class="border text-subtitle-1" block>
                <img :src="google" height="20" class="mr-2" alt="google" />
                <span class="d-sm-flex d-none mr-1">Sign up with</span>Google
            </v-btn>
        </v-col>
        <v-col cols="6" sm="6" class="pl-2">
            <v-btn variant="outlined" size="large" class="border text-subtitle-1" block>
                <img :src="facebook" width="25" height="30" class="mr-1" alt="facebook" />
                <span class="d-sm-flex d-none mr-1">Sign up with</span>FB
            </v-btn>
        </v-col>
    </v-row>
    <div class="d-flex align-center text-center mb-6">
        <div class="text-h6 w-100 px-5 font-weight-regular auth-divider position-relative">
            <span class="bg-surface px-5 py-3 position-relative">or sign in with</span>
        </div>
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
