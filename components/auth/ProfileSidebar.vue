<script setup lang="ts">
  const localePath = useLocalePath()
  const authStore = useAuthStore()
  const { snackbar } = useSnackbar()
  const router = useRouter()

  const user = computed(() => authStore.user)

  const loading = ref(false)

  const logout = () => {
    loading.value = true
    authStore
      .logout()
      .then(() => {
        router.push(localePath('/auth/login'))
      })
      .catch((error: any) => snackbar({ type: 'error', error }))
      .finally(() => {
        loading.value = false
      })
  }
</script>

<template>
  <div class="profile">
    <div class="profile-pic profile-pic py-7 px-3">
      <v-avatar size="45">
        <img src="~/assets/images/profile/user2.jpg" width="50" alt="Julia" />
      </v-avatar>
    </div>
    <div class="profile-name d-flex align-center px-3">
      <h5 class="text-white font-weight-medium">{{ user?.name }}</h5>
      <div class="ml-auto profile-logout">
        <v-btn
          variant="text"
          icon=""
          rounded="md"
          color="white"
          :loading="loading"
          @click="logout"
        >
          <v-icon icon="mdi-power" />
          <v-tooltip activator="parent" location="top">Logout</v-tooltip>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
