<script setup lang="ts">
  import type { AxiosResponse } from 'axios'
  import type { IPerson } from '~/implementation/interfaces/IPerson'
  import { Person } from '~/implementation/classes/Person'

  const authStore = useAuthStore()

  const route = useRoute()
  const api = useApi()
  const { snackbar } = useSnackbar()

  const personId = ref(route.params?.id ? String(route.params.id) : '')
  const person = ref<IPerson>(new Person())
  const loading = ref<boolean>(false)

  const currentUser = computed(() => authStore.user)
  const onlyRead = computed(() =>
    person.value.user ? person.value.user.id !== currentUser.value?.id : true
  )

  const getUser = () => {
    loading.value = true
    api
      .get(`persons/${personId.value}`)
      .then((res: AxiosResponse) => {
        person.value = new Person(res.data ?? null)
      })
      .catch((error: Error) => {
        snackbar({ type: 'error', error })
      })
      .finally(() => {
        loading.value = false
      })
  }

  getUser()
</script>

<template>
  <ProfileBanner v-model="person" :only-read="onlyRead" />
  <nuxt-page v-model="person" :only-read="onlyRead" />
</template>
