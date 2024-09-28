<script setup lang="ts">
  import { debounce, orderBy } from 'lodash'
  import type { WritableComputedRef } from 'vue'
  import type { IPosition } from '~/implementation/interfaces/IPosition'

  const props = withDefaults(
    defineProps<{
      rules?: string
      modelValue: IPosition | string | null
      initialItems?: IPosition[]
      label?: string
      name?: string
      placeholder?: string
    }>(),
    {
      rules: '',
      modelValue: null,
      initialItems: () => [],
      label: 'Posición',
      name: 'Posición',
      placeholder: 'Seleccione la posición o escribe el nombre'
    }
  )

  const emit = defineEmits<{
    (event: 'update:modelValue', value: IPosition | string | null): void
  }>()

  const api = useApi()

  const page = ref<number>(1)
  const loading = ref<boolean>(false)

  const items = ref<IPosition[]>(props.initialItems)

  const model: WritableComputedRef<IPosition | string | null> = computed({
    get() {
      return props.modelValue
    },
    set(value: IPosition | string | null) {
      emit('update:modelValue', value)
    }
  })

  const getItems = (search: string) => {
    loading.value = true
    api
      .get('positions', {
        params: {
          page: page.value,
          per_page: 10,
          'filter[search]': search
        }
      })
      .then(({ data }) => {
        items.value = orderBy(
          [...(data?.data ? data.data : [])],
          'name',
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
      page.value = Math.ceil((items.value.length || 1) / 50)
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
    :items="items"
    type-component="combobox"
    item-value="id"
    item-title="name"
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
