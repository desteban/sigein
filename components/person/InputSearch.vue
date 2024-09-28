<script setup lang="ts">
  import { debounce, orderBy } from 'lodash'
  import type { WritableComputedRef } from 'vue'
  import type { IPerson } from '~/implementation/interfaces/IPerson'

  const props = withDefaults(
    defineProps<{
      rules?: string
      label?: string
      name?: string
      placeholder?: string
      personType?: string | null
      modelValue?: IPerson | string | null
      initialItems?: IPerson[]
    }>(),
    {
      rules: '',
      label: '',
      name: '',
      placeholder: '',
      personType: null,
      modelValue: null,
      initialItems: () => []
    }
  )

  const emit = defineEmits<{
    (event: 'update:modelValue', value: IPerson | string | null): void
  }>()

  const api = useApi()

  const page = ref<number>(1)
  const loading = ref<boolean>(false)

  // const personItems: WritableComputedRef<IPerson[]> = computed(() => {
  //   return props.initialItems
  // })
  const personItems = ref<IPerson[]>(props.initialItems)

  const model: WritableComputedRef<IPerson | string | null> = computed({
    get() {
      return props.modelValue
    },
    set(value: IPerson | string | null) {
      emit('update:modelValue', value)
    }
  })

  const getItems = (search: string) => {
    loading.value = true
    const params = {
      page: page.value,
      per_page: 10,
      'filter[search]': search
    }

    if (props.personType)
      Object.assign(params, { 'filter[type]': props.personType })
    api
      .get('persons', {
        params
      })
      .then(({ data }) => {
        personItems.value = orderBy(
          [...(data?.data ? data.data : [])],
          'business_name',
          'desc'
        )
      })
      .catch((error: Error) => {
        console.error('error', error.message)
      })
      .finally(() => {
        loading.value = false
      })
  }

  const requestData = (
    entries: boolean,
    observer: any,
    isIntersecting: any
  ) => {
    console.log('entries', entries)
    console.log('observer', observer)
    console.log('isIntersecting', isIntersecting)
    if (entries && (isIntersecting || (!isIntersecting && page.value === 1))) {
      page.value = Math.ceil((personItems.value.length || 1) / 50)
      getItems('')
    }
  }

  const updateSearch = debounce((search: string) => {
    page.value = 1
    getItems(search)
  }, 500)
</script>

<template>
  <InputSelect
    v-model="model"
    :items="personItems"
    type-component="combobox"
    item-value="id"
    item-title="business_name"
    :label="props.label"
    :name="props.name"
    :rules="props.rules"
    :placeholder="props.placeholder"
    return-object
    :loading="loading"
    @update:search="updateSearch"
  >
    <template #append-item>
      <div v-intersect="requestData" />
    </template>
  </InputSelect>
</template>
