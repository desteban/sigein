<script lang="ts" setup>
  import { useSlots, withDefaults, defineProps } from 'vue'

  const props = withDefaults(
    defineProps<{ title: string; subtitle?: string }>(),
    { title: '', subtitle: '' }
  )

  const slots = useSlots()
</script>

<template>
  <div class="mt-3 mb-6">
    <v-list-item class="pa-0">
      <v-list-item-title class="text-h3 mb-1">
        {{ props.title }}
      </v-list-item-title>
      <v-list-item-subtitle class="text-h6 mb-2">
        {{ props.subtitle }}
      </v-list-item-subtitle>
      <template v-if="slots['append']" #append>
        <slot name="append" />
      </template>
      <template v-if="slots['prepend']" #prepend>
        <slot name="prepend" />
      </template>
    </v-list-item>
  </div>
</template>
