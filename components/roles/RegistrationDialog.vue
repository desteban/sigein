<script setup lang="ts">
  import {
    withDefaults,
    defineProps,
    computed,
    defineEmits,
    ref,
    watch,
    reactive
  } from 'vue'
  import type { FormContext } from 'vee-validate'
  import type { IRole } from '@/implementation/interfaces/IRole'
  import { Role } from '@/implementation/classes/Role'
  import type { IPermission } from '@/implementation/interfaces/IPermission'

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

  interface IExtendedPermission extends IPermission {
    title: string
    value: boolean
    loading: boolean
  }

  interface IGroupedPermissions {
    [key: string]: IExtendedPermission[]
  }

  const api = useApi()
  const { snackbar } = useSnackbar()

  const saveForm = ref<FormContext>()
  const loading = ref<boolean>(false)
  const loadingPermissions = ref<boolean>(false)
  const itemModel = ref<IRole>(new Role())
  const permissions = ref<IGroupedPermissions>({})
  const countChangedPermissions = ref<number>(0)

  const model = computed({
    get: () => props.modelValue,
    set: value => {
      emit('update:modelValue', value)
    }
  })

  const getPermissions = () => {
    loadingPermissions.value = true
    api
      .get('permissions')
      .then(({ data }) => {
        if (data?.length)
          permissions.value = data.reduce((acc, item: IExtendedPermission) => {
            const [key, title] = item.reference.split('.')
            if (!acc[key]) {
              acc[key] = []
            }
            acc[key].push({
              ...item,
              title,
              value: !!itemModel.value.permissions.find(x => x.id === item.id),
              loading: false
            })
            return acc
          }, {})
        loadingPermissions.value = false
      })
      .catch(error => {
        snackbar({ type: 'error', error })
        loadingPermissions.value = false
      })
  }
  const getItem = async () => {
    if (props.itemId) {
      loading.value = true
      await api
        .get(`roles/${props.itemId}`)
        .then(({ data }) => {
          if (data?.data) itemModel.value = new Role(data.data)
        })
        .catch(error => {
          snackbar({ type: 'error', error })
        })
        .finally(() => {
          loading.value = false
        })
    }
    getPermissions()
  }
  const close = (saved: number = 0) => {
    if (countChangedPermissions.value) {
      if (itemModel.value?.id) emit('saved', itemModel.value.id)
    } else emit('saved', saved)
    model.value = false
    loading.value = false
    setTimeout(() => {
      itemModel.value = new Role()
      permissions.value = {}
    }, 400)
  }
  const save = () => {
    saveForm.value?.validate().then(result => {
      if (result.valid) {
        loading.value = true
        const request = itemModel.value.id
          ? api.put(`roles/${itemModel.value.id}`, itemModel.value)
          : api.post('roles', itemModel.value)

        request
          .then(({ data }) => {
            snackbar({ type: 'success', message: data.message })
            if (data?.data) {
              emit('saved', data.data.id)
              if (!itemModel.value.id) itemModel.value.id = data.data.id
            }
          })
          .catch(error => snackbar({ type: 'error', error }))
          .finally(() => {
            loading.value = false
          })
      }
    })
  }

  const updatePermission = (permission: IExtendedPermission) => {
    const reactivePermission = reactive(permission)
    reactivePermission.loading = true
    api
      .put(`roles/${itemModel.value.id}/update-permission/${permission.id}`, {
        value: !reactivePermission.value
      })
      .then(() => {
        if (itemModel.value.id) countChangedPermissions.value += 1
      })
      .catch(error => {
        snackbar({ type: 'error', error })
        reactivePermission.value = !reactivePermission.value
      })
      .finally(() => {
        reactivePermission.loading = false
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
  <v-dialog v-model="model" max-width="520" scrollable persistent>
    <v-card>
      <v-card-title class="pa-0">
        <v-list bg-color="primary">
          <v-list-item>
            <v-list-item-title class="text-h5">
              {{ props.itemId ? 'Editar' : 'Crear' }} Rol
            </v-list-item-title>
            <template #append>
              <v-btn icon="mdi-close" variant="text" @click="close(0)" />
            </template>
          </v-list-item>
        </v-list>
      </v-card-title>
      <v-card-text style="height: 100%">
        <VeeForm ref="saveForm" @submit="save">
          <v-row>
            <v-col cols="12">
              <InputText
                v-model="itemModel.name"
                label="Username"
                name="Username"
                rules="required"
              >
                <template #append>
                  <v-btn
                    v-if="itemModel.id"
                    :loading="loading"
                    color="primary"
                    variant="tonal"
                    @click="save"
                  >
                    Save
                  </v-btn>
                </template>
              </InputText>
            </v-col>
            <v-expand-transition>
              <v-col v-if="itemModel.id" cols="12">
                <v-card variant="flat" tile style="min-height: 300px">
                  <Loading v-model="loadingPermissions" contained />
                  <v-card-title class="pb-0">Listado de permisos</v-card-title>
                  <v-expand-transition>
                    <div v-if="Object.keys(permissions).length">
                      <v-card
                        v-for="(value, key) in permissions"
                        :key="`titleKey${key}`"
                        variant="outlined"
                        class="mt-2"
                      >
                        <v-card-title class="text-h5">
                          {{ key }}
                        </v-card-title>
                        <v-list-item
                          v-for="permission in value"
                          :key="`permissionKey${permission.id}`"
                          @click="true"
                        >
                          <v-list-item-title>
                            {{ permission.title }}
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            {{ permission.name }}
                          </v-list-item-subtitle>
                          <template #append>
                            <v-switch
                              v-model="permission.value"
                              :loading="permission.loading"
                              color="primary"
                              hide-details="auto"
                              @update:model-value="updatePermission(permission)"
                            />
                          </template>
                        </v-list-item>
                      </v-card>
                    </div>
                  </v-expand-transition>
                </v-card>
              </v-col>
            </v-expand-transition>
          </v-row>
        </VeeForm>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn :loading="loading" @click="close(0)">
          {{ itemModel.id ? 'Close' : 'Cancel' }}
        </v-btn>
        <v-btn
          v-if="!itemModel.id"
          :loading="loading"
          color="primary"
          variant="tonal"
          @click="save"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
