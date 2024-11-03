<script setup lang="ts">
  import type { WritableComputedRef } from 'vue'
  import type { IPerson } from '~/implementation/interfaces/IPerson'
  import { Person } from '~/implementation/classes/Person'

  const props = withDefaults(
    defineProps<{
      personId: number | null
      modelValue: boolean
    }>(),
    { personId: null, modelValue: false }
  )

  const emit = defineEmits<{
    (event: 'update:modelValue', value: boolean): void
    (event: 'saved', value: IPerson): void
  }>()

  const api = useApi()
  const { snackbar } = useSnackbar()

  const model = ref<IPerson>(new Person())
  const loading = ref<boolean>(false)

  const dialog: WritableComputedRef<boolean> = computed({
    get() {
      return props.modelValue
    },
    set(value: boolean) {
      emit('update:modelValue', value)
    }
  })

  const getItem = () => {
    if (props.personId) {
      loading.value = true
      api
        .get(`persons/${props.personId}/surveys`)
        .then(({ data }) => {
          model.value = new Person(data)
        })
        .catch((error: any) => {
          snackbar({ type: 'error', error })
        })
        .finally(() => {
          loading.value = false
        })
    } else {
      model.value = new Person()
    }
  }

  const openDialog = () => {
    getItem()
  }

  watch(
    () => dialog.value,
    newValue => {
      if (newValue) openDialog()
    },
    { deep: true, immediate: false }
  )

  const closeDialog = () => {
    dialog.value = false
    setTimeout(() => {
      model.value = new Person()
    }, 400)
  }
</script>

<template>
  <v-dialog
    v-model="dialog"
    :scrollable="true"
    :persistent="true"
    width="920"
    scroll-strategy="none"
  >
    <v-card>
      <v-card-title class="bg-primary">
        <div class="d-flex justify-space-between">
          <h4 class="text-h5 align-self-center">Detalle de persona</h4>
          <v-btn variant="outlined" icon="mdi-close" @click="closeDialog" />
        </div>
      </v-card-title>
      <v-divider class="ma-0" />
    </v-card>
  </v-dialog>
</template>

<style scoped lang="scss"></style>
