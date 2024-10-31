<script setup lang="ts">
  import { withDefaults, defineProps, defineEmits } from 'vue'

  const props = withDefaults(
    defineProps<{
      text?: string
      color?: string
      icon?: string
    }>(),
    {
      text: '',
      color: 'info',
      icon: 'mdi-information'
    }
  )
  const emit = defineEmits<{
    (event: 'click', value: boolean): void
  }>()
</script>

<template>
  <v-btn
    icon=""
    variant="tonal"
    :color="props.color"
    size="32"
    @click="emit('click', true)"
  >
    <v-icon size="20">{{ props.icon }}</v-icon>
    <v-tooltip v-if="props.text" offset="4" activator="parent" location="top">
      {{ props.text }}
    </v-tooltip>
  </v-btn>
</template>
