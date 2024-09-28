<script setup lang="ts">
  import { v4 as uuidV4 } from 'uuid'
  // import { useTheme } from 'vuetify'
  import {
    computed,
    defineEmits,
    defineProps,
    ref,
    defineExpose,
    useSlots
  } from 'vue'
  import { TextareaProps } from '~/implementation/classes/TextareaProps'
  import type { ITextareaProps } from '~/implementation/interfaces/ITextareaProps'

  const slots = useSlots()
  const props = withDefaults(defineProps<ITextareaProps>(), {
    ...new TextareaProps()
  })
  const emit = defineEmits<{
    (event: 'update:modelValue', value: any): void
    (event: 'click', value: any): void
  }>()
  // const theme = useTheme()
  const veeFieldName = ref(props.name || uuidV4())
  const temporalId = ref<string>(uuidV4())

  const model = computed({
    get() {
      return props.modelValue
    },
    set(value: any) {
      emit('update:modelValue', typeof value !== 'undefined' ? value : null)
    }
  })
  // const backgroundColor = computed(() =>
  //   theme.global.name.value === 'light' ? props.bgColor : '#262932'
  // )

  const focus = () => {
    const input = document.getElementById(props.id || temporalId.value)
    if (input) {
      input.focus()
    }
  }

  defineExpose({ focus })
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
    <v-textarea
      :id="props.id || temporalId"
      v-model="model"
      :active="props.active"
      :append-icon="props.appendIcon"
      :append-inner-icon="props.appendInnerIcon"
      :autofocus="props.autofocus"
      :base-color="props.baseColor"
      :bg-color="props.bgColor"
      :clearable="props.clearable"
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
      :hint="props.hint"
      :label="!props.labelOutside ? props.label : ''"
      :loading="props.loading"
      :messages="props.messages"
      :persistent-counter="props.persistentCounter"
      :persistent-hint="props.persistentHint"
      :placeholder="props.placeholder"
      :prefix="props.prefix"
      :prepend-icon="props.prependIcon"
      :prepend-inner-icon="props.prependInnerIcon"
      :readonly="props.readonly"
      :rounded="props.rounded"
      :single-line="props.singleLine"
      :suffix="props.suffix"
      :variant="props.variant"
      :rows="props.rows"
      :max-rows="props.maxRows"
      :auto-grow="props.autoGrow"
      @click="emit('click', $event)"
    >
      <template v-if="slots['append-inner']" #append-inner>
        <slot name="append-inner" />
      </template>
      <template v-if="slots.prepend" #prepend>
        <slot name="prepend" />
      </template>
      <template v-if="slots['prepend-inner']" #prepend-inner>
        <slot name="prepend-inner" />
      </template>
    </v-textarea>
  </VeeField>
</template>
