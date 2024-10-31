<script setup lang="ts">
  import {
    withDefaults,
    defineProps,
    computed,
    defineEmits,
    ref,
    watch
  } from 'vue'
  import type { FormContext } from 'vee-validate'
  import { useApi } from '~/composables/useApi.js'
  import type { IUser } from '@/implementation/interfaces/IUser'
  import { User } from '@/implementation/classes/User'
  import type { IRole } from '@/implementation/interfaces/IRole'

  const props = withDefaults(
    defineProps<{
      modelValue: boolean
      itemId?: number | null
    }>(),
    {
      modelValue: false,
      itemId: 0
    }
  )
  const emit = defineEmits<{
    (event: 'update:modelValue', value: boolean): void
    (event: 'saved', value: number): void
  }>()

  const api = useApi()
  const { snackbar } = useSnackbar()

  const saveForm = ref<FormContext>()
  const loading = ref<boolean>(false)
  const itemModel = ref<IUser>(new User())
  const roles = ref<IRole[]>([])
  const objeto = ref<IRole | null>(null)

  const model = computed({
    get: () => props.modelValue,
    set: value => {
      emit('update:modelValue', value)
    }
  })

  const getRoles = () => {
    api
      .get('roles')
      .then(({ data }) => {
        if (data?.length) roles.value = data
      })
      .catch(error => {
        snackbar({ type: 'error', error })
      })
  }
  const getItem = () => {
    if (props.itemId) {
      loading.value = true
      api
        .get(`users/${props.itemId}`)
        .then(({ data }) => {
          if (data?.data) itemModel.value = new User(data.data)
        })
        .catch(error => {
          snackbar({ type: 'error', error })
        })
        .finally(() => {
          loading.value = false
        })
    }
    getRoles()
  }
  const close = (saved: number = 0) => {
    emit('saved', saved)
    model.value = false
    loading.value = false
    setTimeout(() => {
      itemModel.value = new User()
    }, 400)
  }
  const save = () => {
    saveForm.value?.validate().then(result => {
      if (result.valid) {
        loading.value = true
        const request = itemModel.value.id
          ? api.put(`users/${itemModel.value.id}`, itemModel.value)
          : api.post('users', itemModel.value)

        request
          .then(({ data }) => {
            snackbar({ type: 'success', message: data.message })
            if (data?.data) close(data.data.id)
          })
          .catch(error => snackbar({ type: 'error', error }))
          .finally(() => {
            loading.value = false
          })
      }
    })
  }

  watch(
    () => model.value,
    newValue => {
      if (newValue) getItem()
    },
    { deep: false, immediate: false }
  )
</script>

<template>
  <v-dialog v-model="model" max-width="520" persistent>
    <v-card>
      <v-list bg-color="primary">
        <v-list-item>
          <v-list-item-title class="text-h5">
            {{ props.itemId ? 'Editar' : 'Crear' }} Usuario
          </v-list-item-title>
          <template #append>
            <v-btn icon="mdi-close" variant="text" @click="close(0)" />
          </template>
        </v-list-item>
      </v-list>
      <VeeForm ref="saveForm" @submit="save">
        <v-container>
          <v-row>
            <v-col cols="12">
              <InputText
                v-model="itemModel.name"
                label="Username"
                name="Username"
                rules="required"
              />
            </v-col>
            <v-col cols="12">
              <InputText
                v-model="itemModel.email"
                label="Email"
                name="Email"
                type="email"
                rules="required|email"
              />
            </v-col>
            <v-col cols="12">
              <InputSelect
                v-model="itemModel.roles"
                v-model:object-value="objeto"
                :items="roles"
                label="Roles"
                item-title="name"
                item-value="id"
                hint="Select roles for the user"
                chips
                multiple
                persistent-hint
              />
            </v-col>
          </v-row>
        </v-container>
      </VeeForm>
      <v-card-actions>
        <v-spacer />
        <v-btn :loading="loading" @click="close(0)">Cancel</v-btn>
        <v-btn :loading="loading" color="primary" variant="tonal" @click="save">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
