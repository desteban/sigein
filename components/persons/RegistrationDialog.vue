<script setup lang="ts">
  import type { FormContext } from 'vee-validate'
  import type { WritableComputedRef } from 'vue'
  import type { IPerson } from '~/implementation/interfaces/IPerson'
  import { Person } from '~/implementation/classes/Person'
  import type { IIdentificationType } from '~/implementation/interfaces/IIdentificationType'
  import type { IState } from '~/implementation/interfaces/IState'
  import type { ICity } from '~/implementation/interfaces/ICity'
  import type { ISector } from '~/implementation/interfaces/ISector'

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
  const {
    getStates,
    getCities,
    getSectors,
    getSectorTypes,
    getBloodTypes,
    getMaritalStatus,
    getIdentificationTypes
  } = useTypesData()

  const entityForm = ref<FormContext>()
  const loading = ref(false)
  const model = ref<IPerson>(new Person())
  const states = ref<IState[]>([])
  const cities = ref<ICity[]>([])
  const sectors = ref<ISector[]>([])
  const bloodTypes = ref<string[]>([])
  const maritalStatus = ref<string[]>([])
  const identificationTypes = ref<IIdentificationType[]>([])

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

  const getTypesProperties = async () => {
    if (!bloodTypes.value.length) bloodTypes.value = await getBloodTypes()
    if (!maritalStatus.value.length)
      maritalStatus.value = await getMaritalStatus()
    if (!identificationTypes.value.length)
      identificationTypes.value = await getIdentificationTypes()
    if (!states.value.length) states.value = await getStates()
  }

  const openDialog = () => {
    getTypesProperties()
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
            {{ props.personId ? 'Editar' : 'Crear' }} Información personal
          </h4>
          <v-btn variant="outlined" icon="mdi-close" @click="cancelForm" />
        </div>
      </v-card-title>
      <v-divider class="ma-0" />
      <v-card-text class="pa-4">
        <VeeForm ref="entityForm">
          <v-row>
            <v-col cols="12" class="d-flex flex-column align-start">
              <VeeField
                v-slot="{ errors }"
                v-model="model.sex"
                name="Sexo"
                rules="required"
              >
                <v-label
                  class="text-subtitle-1 font-weight-semibold pb-2 pl-2 text-lightText"
                >
                  Sexo
                </v-label>
                <v-btn-toggle
                  v-model="model.sex"
                  mandatory
                  color="primary"
                  group
                  variant="outlined"
                >
                  <v-btn value="M"> Masculino </v-btn>
                  <v-btn value="F"> Femenino </v-btn>
                </v-btn-toggle>
                <div
                  v-if="errors.length"
                  class="v-messages px-4 pt-1"
                  style="color: #fa896b"
                >
                  {{ errors[0] }}
                </div>
              </VeeField>
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
            <v-col cols="12" md="6">
              <InputSelect
                v-model="model.identification_type_id"
                :items="bloodTypes"
                label="Tipo de identificación"
                placeholder="Tipo de identificación"
                name="Tipo de identificación"
                rules="required"
              />
            </v-col>
          </v-row>
          <v-row>
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
