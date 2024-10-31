<script setup lang="ts">
  import type { ComputedRef } from 'vue'

  interface IProfile {
    avatar: string
    title: string
    subtitle: string
    href: string
  }

  const localePath = useLocalePath()
  const authStore = useAuthStore()
  const { snackbar } = useSnackbar()
  const { getImageByName } = useTypesData()
  const router = useRouter()

  const user = computed(() => authStore.user)
  const avatarImage: ComputedRef<string> = computed(
    () => user.value?.person?.profile?.avatar || getImageByName('defaultUser')
  )

  const openMenu = ref(false)
  const loading = ref(false)
  const ProfileHeader: ComputedRef<IProfile[]> = computed(() => [
    // {
    //   avatar: 'mdi-account-tie',
    //   title: 'My profile',
    //   subtitle: 'My personal information',
    //   href: user.value?.person.id
    //     ? `/profile/${user.value.person.id}/info`
    //     : '/profile/info'
    // },
    {
      avatar: 'mdi-shield-refresh',
      title: 'Change Password',
      subtitle: 'Update your password',
      href: '/auth/change-password'
    }
  ])

  const closeMenu = () => {
    setTimeout(() => {
      openMenu.value = false
    }, 200)
  }

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

  authStore.currentUser()
</script>

<template>
  <v-menu
    v-model="openMenu"
    :close-on-content-click="false"
    class="profile_popup"
  >
    <template #activator="{ props }">
      <v-btn class="custom-hover-primary" variant="text" v-bind="props" icon="">
        <v-avatar size="35">
          <img :src="avatarImage" width="35" alt="Avatar User" />
        </v-avatar>
      </v-btn>
    </template>
    <v-sheet rounded="md" width="360" elevation="10">
      <div class="px-6 pt-6">
        <h6 class="text-h5 font-weight-medium">User Profile</h6>
        <v-list-item class="px-0 my-2">
          <template #prepend>
            <v-avatar size="70">
              <img :src="avatarImage" width="70" alt="Avatar User" />
            </v-avatar>
          </template>
          <v-list-item-title class="text-h6 mb-n1 font-weight-medium">
            {{ user?.name }}
          </v-list-item-title>
          <v-list-item-subtitle>
            <span
              v-for="(rol, rolIndex) in user?.roles"
              :key="`Rol${rolIndex}`"
              class="text-subtitle-1 font-weight-regular textSecondary"
            >
              {{ rol.name }}
            </span>
          </v-list-item-subtitle>
          <v-list-item-title class="mt-1">
            <v-icon icon="mdi-email-outline" class="mr-1" />
            {{ user?.email }}
          </v-list-item-title>
        </v-list-item>
        <v-divider />
      </div>
      <perfect-scrollbar style="height: calc(100vh - 240px); max-height: 240px">
        <v-list class="py-0 theme-list" lines="two">
          <v-list-item
            v-for="item in ProfileHeader"
            :key="item.title"
            class="py-4 px-8 custom-text-primary"
            :to="localePath(item.href)"
            @click="closeMenu"
          >
            <template #prepend>
              <v-avatar size="48" color="lightprimary" rounded="md">
                <v-icon color="primary" size="32" :icon="item.avatar" />
              </v-avatar>
            </template>
            <div>
              <h6
                class="text-subtitle-1 font-weight-semibold mb-2 custom-title"
              >
                {{ item.title }}
              </h6>
            </div>
            <p class="text-subtitle-1 font-weight-regular textSecondary">
              {{ item.subtitle }}
            </p>
          </v-list-item>
        </v-list>
      </perfect-scrollbar>
      <!--      <div class="px-8 py-3">-->
      <!--        <div-->
      <!--          class="bg-lightprimary rounded-md pa-5 overflow-hidden position-relative"-->
      <!--        >-->
      <!--          <h5 class="text-h6">-->
      <!--            Unlimited<br />-->
      <!--            Access-->
      <!--          </h5>-->
      <!--          <v-btn variant="flat" color="primary" class="mt-3">Upgrade</v-btn>-->
      <!--          <img-->
      <!--            src="../../../assets/images/backgrounds/unlimited-bg.png"-->
      <!--            alt="bg-img"-->
      <!--            class="right-pos-img"-->
      <!--          />-->
      <!--        </div>-->
      <!--      </div>-->
      <div class="pt-4 pb-6 px-8 text-center">
        <v-btn
          color="primary"
          variant="outlined"
          block
          :loading="loading"
          @click="logout"
          >Logout
        </v-btn>
      </div>
    </v-sheet>
  </v-menu>
</template>
