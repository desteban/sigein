<script setup lang="ts">
  import type { WritableComputedRef } from 'vue'

  const props = withDefaults(
    defineProps<{
      modelValue: boolean
      route: string
      entityId: number | null
      title: string
      content: string
      successMessage?: string
    }>(),
    {
      modelValue: false,
      route: '',
      entityId: null,
      title: '',
      content: '',
      successMessage: 'Registro eliminado correctamente'
    }
  )
  const emit = defineEmits<{
    (event: 'update:modelValue', value: boolean): void
    (event: 'deleted'): void
  }>()
  const api = useApi()
  const { snackbar } = useSnackbar()
  const loading = ref<boolean>(false)
  const dialog: WritableComputedRef<boolean> = computed({
    get() {
      return props.modelValue
    },
    set(value: boolean) {
      emit('update:modelValue', value)
    }
  })

  const deleteItem = () => {
    loading.value = true
    api
      .delete(`${props.route}${props.entityId}`)
      .then(() => {
        emit('deleted')
        snackbar({ type: 'success', message: props.successMessage })
        dialog.value = false
        setTimeout(() => {
          loading.value = false
        }, 400)
      })
      .catch((error: Error) => {
        snackbar({ type: 'error', error })
        loading.value = false
      })
  }
</script>

<template>
  <v-dialog
    v-model="dialog"
    :persistent="true"
    width="420"
    scroll-strategy="none"
  >
    <v-card>
      <v-card-title class="headline text-center" style="white-space: normal">
        {{ title }}
      </v-card-title>
      <v-card-text class="text-subtitle-1 text-center" v-html="props.content" />
      <v-divider class="ma-0" />
      <v-card-actions class="mx-2 mb-2">
        <v-btn
          variant="tonal"
          size="large"
          :loading="loading"
          @click="dialog = false"
        >
          No, gracias
        </v-btn>
        <v-spacer />
        <v-btn
          variant="text"
          size="large"
          color="error"
          :loading="loading"
          @click="deleteItem"
        >
          Si, eliminar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
