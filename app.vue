<script setup lang="ts">
  const { locale, setLocale } = useI18n()
  const authStore = useAuthStore()
  const customizerStore = useCustomizerStore()
  const user = computed(() => authStore.user)
  
  // if (user.value) {
  //   setLocale(user.value.language)
  //   customizerStore.language = locale.value
  // } else {
  //   setLocale(customizerStore.language)
  // }
</script>

<template>
  <NuxtLayout>
    <Head>
      <Title>PLACOEM</Title>
    </Head>
    <NuxtPage />
    <Snackbar />
  </NuxtLayout>
</template>
