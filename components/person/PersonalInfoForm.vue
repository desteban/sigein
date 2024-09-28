<script setup lang="ts">
  import type { FormContext } from 'vee-validate'
  import type { WritableComputedRef } from 'vue'
  import type { IPerson } from '~/implementation/interfaces/IPerson'
  import { Person } from '~/implementation/classes/Person'
  import type { IType } from '~/implementation/interfaces/IType'

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
  const { getTypes } = useTypes()

  const entityForm = ref<FormContext>()
  const loading = ref(false)
  const model = ref<IPerson>(new Person())
  const identificationTypes = ref<IType[]>([])

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
        .get(`persons/${props.personId}`)
        .then(({ data }) => {
          model.value = data
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

  const getTypesProperties = async () => {
    identificationTypes.value = await getTypes('identification_types')
  }

  const openDialog = () => {
    if (!identificationTypes.value.length) getTypesProperties()
    getItem()
  }

  watch(
    () => dialog.value,
    newValue => {
      if (newValue) openDialog()
    },
    { deep: true, immediate: false }
  )

  const cancelForm = () => {
    dialog.value = false
    setTimeout(() => {
      model.value = new Person()
      entityForm.value?.resetForm()
    }, 400)
  }

  const saveForm = () => {
    entityForm.value?.validate().then(async result => {
      if (result.valid) {
        loading.value = true
        api
          .request({
            method: props.personId ? 'put' : 'post',
            url: `persons${props.personId ? `/${props.personId}` : ''}`,
            data: model.value
          })
          .then(({ data }) => {
            emit('saved', data?.data)
            snackbar({
              message: `Información personal ${props.personId ? 'actualizada' : 'creada'} correctamente`,
              type: 'success'
            })
            cancelForm()
          })
          .catch((error: any) => snackbar({ type: 'error', error }))
          .finally(() => {
            loading.value = false
          })
      }
    })
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
          <h4 class="text-h5 align-self-center">
            {{ props.personId ? 'Editar' : 'Agregar' }} Información personal
          </h4>
          <v-btn variant="outlined" icon="mdi-close" @click="cancelForm" />
        </div>
      </v-card-title>
      <v-divider class="ma-0" />
      <v-card-text class="pa-4">
        <VeeForm ref="entityForm">
          <v-row>
            <v-col cols="12" class="d-flex flex-column">
              <v-label
                class="text-subtitle-1 font-weight-semibold pb-2 pl-2 text-lightText"
              >
                Tipo de persona
              </v-label>
              <v-btn-toggle
                v-model="model.type"
                mandatory
                color="primary"
                group
                variant="outlined"
              >
                <v-btn value="natural"> Natural </v-btn>
                <v-btn value="legal"> Jurídica </v-btn>
              </v-btn-toggle>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <InputText
                v-model="model.identification"
                label="Identificación"
                placeholder="Número de identificación"
                name="Identificación"
                rules="required"
              />
            </v-col>
            <v-col cols="12" md="6">
              <InputSelect
                v-model="model.identification_type_id"
                :items="identificationTypes"
                label="Tipo de identificación"
                placeholder="Tipo de identificación"
                name="Tipo de identificación"
                item-title="name"
                item-value="id"
                rules="required"
              />
            </v-col>
          </v-row>
          <v-row v-if="model.type === 'natural'">
            <v-col cols="12" md="6">
              <InputText
                v-model="model.first_name"
                label="Primer nombre"
                placeholder="Primer nombre"
                name="Primer nombre"
                rules="required"
              />
            </v-col>
            <v-col cols="12" md="6">
              <InputText
                v-model="model.second_name"
                label="Segundo nombre"
                placeholder="Segundo nombre"
                name="Segundo nombre"
              />
            </v-col>
            <v-col cols="12" md="6">
              <InputText
                v-model="model.first_last_name"
                label="Primer apellido"
                placeholder="Primer apellido"
                name="Primer apellido"
                rules="required"
              />
            </v-col>
            <v-col cols="12" md="6">
              <InputText
                v-model="model.second_last_name"
                label="Segundo apellido"
                placeholder="Segundo apellido"
                name="Segundo apellido"
              />
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col cols="12">
              <InputText
                v-model="model.business_name"
                label="Razón social"
                placeholder="Razón social"
                name="Razón social"
                rules="required"
              />
            </v-col>
            <v-col cols="12">
              <v-switch
                v-model="model.is_educational_institution"
                label="Es una institución educativa"
                :inset="true"
                color="success"
                hide-details
              />
            </v-col>
          </v-row>
        </VeeForm>
      </v-card-text>
      <v-divider />
      <v-card-actions class="mx-2 mb-2">
        <v-btn
          variant="tonal"
          size="large"
          color="primary"
          :loading="loading"
          @click="saveForm"
        >
          Guardar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
