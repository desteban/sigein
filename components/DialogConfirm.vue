<script setup lang="ts">
  import {
    withDefaults,
    defineProps,
    computed,
    defineEmits,
    ref,
    watch
  } from 'vue'

  const props = withDefaults(
    defineProps<{
      modelValue: boolean
      title?: string
      text?: string
      color?: string
      icon?: string
    }>(),
    {
      modelValue: false,
      title: '',
      text: '',
      color: 'info',
      icon: 'mdi-information'
    }
  )
  const emit = defineEmits<{
    (event: 'update:modelValue', value: boolean): void
    (event: 'confirmed', value: boolean): void
  }>()

  const loading = ref<boolean>(false)

  const model = computed({
    get: () => props.modelValue,
    set: value => {
      emit('update:modelValue', value)
    }
  })

  watch(
    () => model.value,
    newValue => {
      if (newValue) loading.value = false
    }
  )

  const close = (confirmed = false) => {
    emit('confirmed', confirmed)
    if (confirmed) loading.value = true
    else model.value = false
  }
</script>

<template>
  <v-dialog v-model="model" max-width="500" persistent>
    <v-card>
      <v-card-text class="text-center pb-2">
        <v-avatar size="80" :color="props.color">
          <v-icon :icon="props.icon" size="60" />
        </v-avatar>
      </v-card-text>
      <v-card-text class="text-center text-h4 py-2">
        {{ props.title }}
      </v-card-text>
      <v-card-text
        class="text-center text-subtitle-1 pt-0"
        v-html="props.text"
      />
      <v-card-actions>
        <v-btn :loading="loading" @click="close(false)">Cancel</v-btn>
        <v-spacer />
        <v-btn
          :loading="loading"
          :color="props.color"
          variant="tonal"
          @click="close(true)"
        >
          Confirm
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
