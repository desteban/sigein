<script setup lang="ts">
  import type { ILoadingProps } from '@/implementation/interfaces/ILoadingProps'
  import { LoadingProps } from '@/implementation/classes/LoadingProps'

  const props = withDefaults(defineProps<ILoadingProps>(), new LoadingProps())
  const emit =
    defineEmits<(event: 'update:modelValue', value: boolean) => void>()

  const customizerStore = useCustomizerStore()
  const loadingStore = useLoadingStore()

  const model = computed({
    get: () => props.modelValue,
    set: value => {
      emit('update:modelValue', value)
    }
  })
</script>

<template>
  <v-overlay
    v-model="model"
    class="align-center justify-center"
    :contained="props.contained"
    :theme="overlayColor || customizerStore.isDarkTheme ? 'dark' : 'light'"
    persistent
  >
    <v-row justify="center">
      <v-progress-circular color="primary" indeterminate width="6" size="72" />
    </v-row>
    <v-row
      v-if="loadingStore.text || loadingStore.percent"
      justify="center"
      :style="`width: ${props.widthContent}`"
    >
      <v-col v-if="loadingStore.text" cols="12" class="text-center text-white">
        <span>{{ loadingStore.text }}</span>
      </v-col>
      <v-col v-if="loadingStore.percent" cols="12" class="text-center">
        <v-progress-linear
          v-model="loadingStore.percent"
          height="22"
          color="primary"
          class="text-white"
          striped
        >
          <strong>{{ loadingStore.percent.toFixed(2) }}%</strong>
        </v-progress-linear>
      </v-col>
    </v-row>
  </v-overlay>
</template>
