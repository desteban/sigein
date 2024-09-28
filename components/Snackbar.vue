<script setup lang="ts">
  import { ref, computed, watch, onUnmounted } from 'vue'
  import { useSnackbarStore } from '@/stores/snackbar.ts'

  let interval: any

  const notification = useSnackbarStore()

  const snackbar = ref<boolean>(false)
  const closeTime = ref<number>(0)
  const currentTimeout = ref<number>(0)

  const message = computed(() => notification.message)
  const list = computed(() => notification.list || [])
  const color = computed(() => notification.type)
  const listCount = computed(() => list.value.length)
  const timeout = computed(() => {
    return listCount.value ? 5000 * listCount.value : notification.timeout
  })

  const decrementTimeout = () => {
    interval = setInterval(() => {
      if (currentTimeout.value > 0) {
        currentTimeout.value -= 1000
      } else {
        clearInterval(interval)
        interval = undefined
        closeTime.value = 0
      }
    }, 1000)
  }

  watch(
    notification,
    newValue => {
      if (newValue.message) {
        snackbar.value = true
        closeTime.value = -1
        if (interval) clearInterval(interval)
        if (timeout.value > -1) {
          currentTimeout.value = timeout.value
          decrementTimeout()
        }
      } else {
        snackbar.value = false
      }
    },
    { deep: true, immediate: false }
  )

  onUnmounted(() => {
    if (interval) {
      clearInterval(interval)
    }
  })
</script>
<template>
  <v-snackbar
    v-model="snackbar"
    :vertical="!!listCount"
    :timeout="closeTime"
    :multi-line="true"
    :color="color"
  >
    <div class="text-subtitle-1 pb-2">{{ message }}</div>
    <ol v-if="listCount">
      <li v-for="(item, indexItem) in list" :key="`itemMessage${indexItem}`">
        {{ item }}
      </li>
    </ol>
    <template #actions>
      <v-btn :icon="!listCount" @click="snackbar = false">
        <v-icon v-if="!listCount">mdi-close</v-icon>
        <span v-else>Cerrar</span>
      </v-btn>
    </template>
  </v-snackbar>
</template>
