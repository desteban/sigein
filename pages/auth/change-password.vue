<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import ChangePasswordForm from '@/components/auth/ChangePasswordForm.vue'

  const router = useRouter()

  const goBack = () => router.go(-1)
</script>

<template>
  <v-container class="h-100">
    <v-row class="h-100 d-flex justify-center align-center">
      <v-col cols="12" sm="8" md="6" lg="5" xl="4" class="d-flex align-center">
        <v-card rounded="md" elevation="10" class="px-sm-1 px-0 mx-auto">
          <v-card-item class="pa-sm-8">
            <p class="text-subtitle-1 text-center text-10">
              Please enter your current password, your new password, and confirm
              your new password to change your account password.
            </p>
            <ChangePasswordForm />
            <v-btn
              size="large"
              color="lightprimary"
              block
              class="mt-5 text-primary"
              flat
              @click="goBack"
            >
              Go back
            </v-btn>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
