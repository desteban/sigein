<script setup lang="ts">
  import { useApi } from '@/composables/useApi'

  const languageDD = ref([
    {
      title: 'English',
      subtext: 'en',
      value: 'en',
      flag: 'gb'
    },
    {
      title: 'Español',
      subtext: 'es',
      value: 'es',
      flag: 'es'
    }
  ])

  const api = useApi()
  const { locale, setLocale } = useI18n()

  const currentLocale = computed(() =>
    languageDD.value.find(x => x.value === locale.value)
  )

  const changeLanguage = async (language: string) => {
    await api
      .post('set-locale', { locale: language })
      .then(() => {
        setLocale(language)
      })
      .catch(error => {
        console.log('error', error)
      })
    // customizerStore.language = language
  }
</script>
<template>
  <!-- ---------------------------------------------- -->
  <!-- language DD -->
  <!-- ---------------------------------------------- -->
  <v-menu :close-on-content-click="false" location="bottom">
    <template #activator="{ props }">
      <v-btn icon="" variant="text" color="primary" v-bind="props">
        <v-avatar size="28">
          <span
            v-if="currentLocale"
            :class="`fi fi-${currentLocale.flag} fis rounded-circle pa-2`"
            style="width: 28px; height: 28px"
          />
        </v-avatar>
      </v-btn>
    </template>
    <v-sheet rounded="md" width="200" elevation="10">
      <v-list class="theme-list">
        <v-list-item
          v-for="(item, index) in languageDD"
          :key="index"
          color="primary"
          :active="$i18n.locale === item.value"
          class="d-flex align-center"
          @click="changeLanguage(item.value)"
        >
          <template #prepend>
            <v-avatar size="32">
              <span
                :class="`fi fi-${item.flag} fis rounded-circle`"
                style="width: 22px; height: 22px"
              />
            </v-avatar>
          </template>
          <v-list-item-title class="text-subtitle-1 font-weight-regular">
            {{ item.title }}
            <span class="text-disabled text-subtitle-1 pl-2">
              ({{ item.subtext }})
            </span>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-sheet>
  </v-menu>
</template>
