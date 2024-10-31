<script setup lang="ts">
  import { onMounted, ref, useSlots, defineExpose } from 'vue'
  import debounce from 'lodash/debounce'
  import type { IHeader } from './IHeader.ts'
  import { useApi } from '@/composables/useApi.js'

  const props = withDefaults(
    defineProps<{
      headers: IHeader[]
      route: string
      placeholderSearch: string
    }>(),
    {
      headers: () => [],
      route: '',
      placeholderSearch: 'Search...'
    }
  )

  const api = useApi()
  const slots = useSlots()
  const { snackbar } = useSnackbar()

  const itemsPerPage = ref(5)
  const search = ref('')
  const serverItems = ref([])
  const loading = ref(false)
  const totalItems = ref(0)
  const slotsItem = ref<string[]>([])

  const loadItems = debounce((options = undefined) => {
    loading.value = true
    const sendData = {
      'filter[search]': search.value,
      page: options?.page ?? 1,
      per_page: options?.itemsPerPage ?? itemsPerPage.value
    }
    api
      .get(props.route, {
        params: sendData
      })
      .then(({ data }) => {
        serverItems.value = data?.data || []
        totalItems.value = data?.total || 0
      })
      .catch(error => snackbar({ type: 'error', error }))
      .finally(() => {
        loading.value = false
      })
  }, 500)

  onMounted(() => {
    slotsItem.value =
      Object.keys(slots).filter(key => key.startsWith('item.')) || []
  })

  defineExpose({ loadItems })
</script>

<template>
  <v-data-table-server
    v-model:items-per-page="itemsPerPage"
    :headers="props.headers"
    :items="serverItems"
    :items-length="totalItems"
    :loading="loading"
    :search="search"
    item-value="name"
    loading-text="Loading... Please wait"
    @update:options="loadItems"
  >
    <template #top>
      <v-text-field
        v-model="search"
        class="ma-4"
        density="compact"
        :placeholder="props.placeholderSearch"
        prepend-inner-icon="mdi-magnify"
        hide-details
        clearable
      />
    </template>
    <template
      v-for="slotItem in slotsItem"
      :key="`slotItem${slotItem}`"
      #[slotItem]="slotProps"
    >
      <component :is="slots[slotItem]" v-bind="slotProps" />
    </template>
  </v-data-table-server>
</template>
