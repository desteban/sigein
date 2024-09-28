<script lang="ts" setup>
  import { v4 as uuid } from 'uuid'
  import { VSelect } from 'vuetify/components/VSelect'
  import { VAutocomplete } from 'vuetify/components/VAutocomplete'
  import { VCombobox } from 'vuetify/components/VCombobox'

  import {
    useSlots,
    computed,
    defineEmits,
    defineProps,
    ref,
    defineExpose,
    watch
  } from 'vue'

  import { SelectProps } from '~/implementation/classes/SelectProps'
  import type { ISelectProps } from '~/implementation/interfaces/ISelectProps'

  const slots = useSlots()
  const props = withDefaults(defineProps<ISelectProps>(), {
    ...new SelectProps(),
    items: () => [],
    errorMessages: () => [],
    messages: () => []
  })

  const emit = defineEmits<{
    (event: 'update:modelValue', value: any): void
    (event: 'update:objectValue', value: any): void
    (event: 'update:search', value: any): void
    (event: 'click', value: any): void
    (event: 'change', value: any): void
  }>()

  const components: any = {
    select: VSelect,
    autocomplete: VAutocomplete,
    combobox: VCombobox
  }

  const veeFieldName = ref(props.name || `inputTextName-${uuid()}`)
  const veeFieldId = ref(props.id || `inputTextId-${uuid()}`)

  const component = computed(() => components[props.typeComponent])
  const modelObject = computed({
    get() {
      return props.objectValue
    },
    set(value: any) {
      if (typeof props.objectValue !== 'undefined') {
        emit('update:objectValue', typeof value !== 'undefined' ? value : null)
      }
    }
  })
  const model = computed({
    get() {
      return props.modelValue
    },
    set(value: any) {
      emit('update:modelValue', typeof value !== 'undefined' ? value : null)
    }
  })

  watch(
    () => model.value,
    newValue => {
      if (typeof props.objectValue !== 'undefined') {
        if (newValue) {
          if (typeof newValue === 'object' && !Array.isArray(newValue)) {
            modelObject.value = newValue
          } else if (Array.isArray(newValue)) {
            if (newValue.every(item => typeof item === 'object')) {
              modelObject.value = newValue
            } else {
              modelObject.value = props.items.filter((item: any) =>
                newValue.includes(item[props.itemValue])
              )
            }
          } else if (props.items.length) {
            modelObject.value = props.items.find(
              (item: any) => item[props.itemValue] === newValue
            )
          }
        } else {
          modelObject.value = null
        }
      }
    },
    { immediate: true, deep: true }
  )

  const updateSearch = (search: string) => {
    if (props.typeComponent === 'combobox') emit('update:search', search)
  }

  const searchListener = computed(() =>
    props.typeComponent === 'combobox' ? { 'update:search': updateSearch } : {}
  )

  const focus = () => {
    const input = document.getElementById(veeFieldId.value)
    if (input) {
      input.focus()
    }
  }
  defineExpose({ focus })

  // const requestData = (entries, observer, isIntersecting) => {
  //   console.log('entries', entries)
  //   console.log('observer', observer)
  //   console.log('isIntersecting', isIntersecting)
  // }
</script>

<template>
  <VeeField
    v-slot="{ errors }"
    v-model="model"
    :name="veeFieldName"
    :rules="props.rules"
    :vid="props.vid"
  >
    <v-label
      v-if="props.label && props.labelOutside"
      class="text-subtitle-1 font-weight-semibold pb-1 pl-2 text-lightText"
    >
      {{ props.label }}
    </v-label>
    <component
      :is="component"
      :id="veeFieldId"
      v-model="model"
      :active="props.active"
      :type="props.type"
      :append-icon="props.appendIcon"
      :autofocus="props.autofocus"
      :auto-select-first="props.autoSelectFirst"
      :base-color="props.baseColor"
      :bg-color="props.bgColor"
      :chips="props.chips"
      :clearable="props.clearable"
      :clear-on-select="props.clearOnSelect"
      :closable-chips="props.closableChips"
      :class="props.propsClass"
      :color="props.color"
      :counter="props.counter"
      :density="props.density"
      :disabled="props.disabled"
      :error="props.error"
      :error-messages="errors || props.errorMessages"
      :flat="props.flat"
      :focused="props.focused"
      :hide-details="props.hideDetails"
      :hide-no-data="props.hideNoData"
      :hint="props.hint"
      :items="props.items"
      :item-title="props.itemTitle"
      :item-value="props.itemValue"
      :label="!props.labelOutside ? props.label : ''"
      :loading="props.loading"
      :messages="props.messages"
      :multiple="props.multiple"
      :no-data-text="props.noDataText"
      :no-filter="props.noFilter"
      :open-on-clear="props.openOnClear"
      :persistent-counter="props.persistentCounter"
      :persistent-hint="props.persistentHint"
      :placeholder="props.placeholder"
      :prefix="props.prefix"
      :prepend-icon="props.prependIcon"
      :prepend-inner-icon="props.prependInnerIcon"
      :readonly="props.readonly"
      :return-object="props.returnObject"
      :rounded="props.rounded"
      :search="props.search"
      :single-line="props.singleLine"
      :suffix="props.suffix"
      :validate-on="props.validateOn"
      :variant="props.variant"
      item-color="primary"
      v-on="searchListener"
      @click="emit('click', $event)"
      @update:model-value="emit('change', $event)"
    >
      <template v-if="slots['item']" #item="{ props, item, index }">
        <slot name="item" v-bind="{ props, item, index }" />
      </template>
      <template v-if="slots['selection']" #selection="{ item, index }">
        <slot name="selection" v-bind="{ item, index }" />
      </template>

      <template v-if="slots['append-inner']" #append-inner>
        <slot name="append-inner" />
      </template>
      <template v-if="slots.prepend" #prepend>
        <slot name="prepend" />
      </template>
      <template v-if="slots.append" #append>
        <slot name="append" />
      </template>
      <template v-if="slots['prepend-inner']" #prepend-inner>
        <slot name="prepend-inner" />
      </template>
      <template v-if="slots['append-item']" #append-item>
        <slot name="append-item" />
      </template>
    </component>
    <!--    <template #append-item>-->
    <!--      <div v-intersect="requestData" />-->
    <!--    </template>-->
  </VeeField>
</template>
