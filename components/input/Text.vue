<script lang="ts" setup>
  import { v4 as uuid } from 'uuid'
  import {
    useSlots,
    computed,
    defineEmits,
    defineProps,
    ref,
    defineExpose
  } from 'vue'
  import { TextProps } from '~/implementation/classes/TextProps'
  import type { ITextProps } from '~/implementation/interfaces/ITextProps'

  const slots = useSlots()
  const props = withDefaults(defineProps<ITextProps>(), {
    ...new TextProps(),
    errorMessages: () => [],
    messages: () => []
  })

  const emit = defineEmits<{
    (event: 'update:modelValue', value: any): void
    (event: 'click', value: any): void
  }>()

  const veeFieldName = ref(props.name || `inputTextName-${uuid()}`)
  const veeFieldId = ref(props.id || `inputTextId-${uuid()}`)

  const max = computed(() =>
    props.maxLength || props.type === 'number' ? 12 : 254
  )
  const model = computed({
    get() {
      return props.modelValue
    },
    set(value: any) {
      emit(
        'update:modelValue',
        typeof value !== 'undefined' || (props.type === 'number' && value === 0)
          ? value
          : null
      )
    }
  })
  const inputClass = computed(() => {
    return [
      props.propsClass,
      props.upperCase ? 'c-upper-case' : props.lowerCase ? 'c-lower-case' : null
    ]
      .filter(x => x)
      .join(' ')
  })

  const inputType = ref()
  inputType.value = props.type
  const showPassword = ref(false)

  const toggleShowPassword = () => {
    showPassword.value = !showPassword.value
    inputType.value = showPassword.value ? 'text' : 'password'
  }
  const eventKey = (event: KeyboardEvent) => {
    const keyCode = event.keyCode || event.which
    if (props.type === 'number') {
      if (
        !(
          (keyCode >= 48 && keyCode <= 57) ||
          (keyCode >= 96 && keyCode <= 105) ||
          keyCode === 8 ||
          keyCode === 9 ||
          keyCode === 13 ||
          keyCode === 37 ||
          keyCode === 39 ||
          keyCode === 46 ||
          (props.decimal && model.value && (keyCode === 110 || keyCode === 190))
        )
      )
        event.preventDefault()
    }
  }

  const changeCase = () => {
    if (
      model.value &&
      (props.upperCase || props.lowerCase) &&
      props.type !== 'number'
    ) {
      model.value = props.upperCase
        ? model.value.toUpperCase()
        : model.value.toLowerCase()
    }
  }
  const focus = () => {
    const input = document.getElementById(veeFieldId.value)
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
    :rules="`${props.rules}|max:${max}`"
    :vid="props.vid"
  >
    <v-label
      v-if="props.label && props.labelOutside"
      class="text-subtitle-1 font-weight-semibold pb-1 pl-2 text-lightText"
    >
      {{ props.label }}
    </v-label>
    <v-text-field
      :id="veeFieldId"
      v-model="model"
      :autocomplete="props.autocomplete"
      :active="props.active"
      :type="inputType"
      :append-icon="props.appendIcon"
      :append-inner-icon="props.appendInnerIcon"
      :autofocus="props.autofocus"
      :base-color="props.baseColor"
      :bg-color="props.bgColor"
      :clearable="props.clearable"
      :class="inputClass"
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
      :step="props.decimal ? 0.01 : props.step"
      @click="emit('click', $event)"
      @keydown="eventKey"
      @focus="changeCase"
      @blur="changeCase"
    >
      <template
        v-if="slots['append-inner'] || props.type === 'password'"
        #append-inner
      >
        <template v-if="props.type === 'password'">
          <v-icon @click.stop="toggleShowPassword">
            {{ showPassword ? 'mdi-eye-off' : 'mdi-eye' }}
          </v-icon>
        </template>
        <slot v-else name="append-inner" />
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
    </v-text-field>
  </VeeField>
</template>
