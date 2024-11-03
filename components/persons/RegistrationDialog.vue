<script setup lang="ts">
  import type { FormContext } from 'vee-validate'
  import type { WritableComputedRef } from 'vue'
  import type { IPerson } from '~/implementation/interfaces/IPerson'
  import { Person } from '~/implementation/classes/Person'
  import type { IIdentificationType } from '~/implementation/interfaces/IIdentificationType'
  import type { IState } from '~/implementation/interfaces/IState'
  import type { ICity } from '~/implementation/interfaces/ICity'
  import type { ISector } from '~/implementation/interfaces/ISector'
  import type { ISectorType } from '~/implementation/interfaces/ISectorType'

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
  const model = ref<IPerson>(new Person())
  const states = ref<IState[]>([])
  const cities = ref<ICity[]>([])
  const sectors = ref<ISector[]>([])
  const bloodTypes = ref<string[]>([])
  const maritalStatus = ref<string[]>([])
  const identificationTypes = ref<IIdentificationType[]>([])
  const sectorTypes = ref<ISectorType[]>([])

  const loading = ref<boolean>(false)
  const loadingStates = ref<boolean>(false)
  const loadingCities = ref<boolean>(false)
  const loadingSectors = ref<boolean>(false)
  const loadingBloodTypes = ref<boolean>(false)
  const loadingSectorTypes = ref<boolean>(false)
  const loadingIdentificationTypes = ref<boolean>(false)
  const loadingMaritalStatus = ref<boolean>(false)

  const dialog: WritableComputedRef<boolean> = computed({
    get() {
      return props.modelValue
    },
    set(value: boolean) {
      emit('update:modelValue', value)
    }
  })

  const getTypesProperties = async () => {
    if (!bloodTypes.value.length) {
      loadingBloodTypes.value = true
      bloodTypes.value = await getBloodTypes()
      loadingBloodTypes.value = false
    }
    if (!maritalStatus.value.length) {
      loadingMaritalStatus.value = true
      maritalStatus.value = await getMaritalStatus()
      loadingMaritalStatus.value = false
    }
    if (!identificationTypes.value.length) {
      loadingIdentificationTypes.value = true
      identificationTypes.value = await getIdentificationTypes()
      loadingIdentificationTypes.value = false
    }
    if (!states.value.length) {
      loadingStates.value = true
      states.value = await getStates()
      loadingStates.value = false
    }
    if (!sectorTypes.value.length) {
      loadingSectorTypes.value = true
      sectorTypes.value = await getSectorTypes()
      loadingSectorTypes.value = false
    }
  }

  const assignCities = async (
    stateId: number | null,
    reset: boolean = true
  ) => {
    if (reset) model.value.city_id = null
    if (stateId) {
      loadingCities.value = true
      cities.value = await getCities(stateId)
      loadingCities.value = false
    }
  }

  const assignSectors = async (
    cityId: number | null,
    sectorTypeId: number | null,
    reset: boolean = true
  ) => {
    if (reset) model.value.sector_id = null
    if (cityId && sectorTypeId) {
      loadingSectors.value = true
      sectors.value = await getSectors(cityId, sectorTypeId)
      loadingSectors.value = false
    }
  }

  const getItem = () => {
    if (props.personId) {
      loading.value = true
      api
        .get(`persons/${props.personId}`)
        .then(({ data }) => {
          model.value = new Person(data)
          if (model.value.state_id) assignCities(model.value.state_id, false)
          if (model.value.city_id && model.value.sector_type_id)
            assignSectors(
              model.value.city_id,
              model.value.sector_type_id,
              false
            )
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
            <v-col cols="12" md="6">
              <InputText
                v-model="model.identification_number"
                label="Identificación"
                placeholder="Digite la identificación"
                name="Identificación"
                rules="required"
              />
            </v-col>
            <v-col cols="12" md="6">
              <InputSelect
                v-model="model.identification_type_id"
                :items="identificationTypes"
                :loading="loadingIdentificationTypes"
                label="Tipo de identificación"
                placeholder="Seleccione el tipo de identificación"
                name="Tipo de identificación"
                item-title="name"
                item-value="id"
                rules="required"
              />
            </v-col>
            <v-col cols="12" md="6">
              <InputText
                v-model="model.first_name"
                label="Primer nombre"
                placeholder="Digite el primer nombre"
                name="Primer nombre"
                rules="required"
              />
            </v-col>
            <v-col cols="12" md="6">
              <InputText
                v-model="model.middle_name"
                label="Segundo nombre"
                placeholder="Digite el segundo nombre"
              />
            </v-col>
            <v-col cols="12" md="6">
              <InputText
                v-model="model.first_surname"
                label="Primer apellido"
                placeholder="Digite el primer apellido"
                name="Primer apellido"
                rules="required"
              />
            </v-col>
            <v-col cols="12" md="6">
              <InputText
                v-model="model.second_surname"
                label="Segundo apellido"
                placeholder="Digite el segundo apellido"
              />
            </v-col>
            <v-col cols="12" md="6" class="d-flex flex-column align-start">
              <VeeField
                v-slot="{ errors }"
                v-model="model.sex"
                name="Sexo"
                rules="required"
              >
                <v-btn-toggle
                  v-model="model.sex"
                  mandatory
                  color="primary"
                  :base-color="errors.length ? 'error' : undefined"
                  group
                  variant="outlined"
                  class="w-100"
                  :style="
                    errors.length
                      ? 'border-color: #fa896b !important'
                      : undefined
                  "
                >
                  <v-btn value="M" class="w-50"> Masculino </v-btn>
                  <v-btn value="F" class="w-50"> Femenino </v-btn>
                </v-btn-toggle>
                <div
                  v-if="errors.length"
                  class="v-messages px-4 pt-1"
                  style="color: #fa896b; opacity: 1 !important"
                >
                  {{ errors[0] }}
                </div>
              </VeeField>
            </v-col>
            <v-col cols="12" md="6">
              <InputText
                v-model="model.birth_date"
                label="Fecha de nacimiento"
                name="Fecha de nacimiento"
                placeholder="seleccionar fecha"
                rules="required"
                type="date"
              />
            </v-col>
            <v-col cols="12" md="6">
              <InputSelect
                v-model="model.blood_type"
                :items="bloodTypes"
                :loading="loadingBloodTypes"
                label="Tipo de sangre"
                placeholder="Seleccione el tipo de sangre"
                name="Tipo de sangre"
                rules="required"
              />
            </v-col>
            <v-col cols="12" md="6">
              <InputSelect
                v-model="model.marital_status"
                :items="maritalStatus"
                :loading="loadingMaritalStatus"
                label="Estado civil"
                placeholder="Seleccione el estado civil"
                name="Estado civil"
                rules="required"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <InputText
                v-model="model.phone"
                label="Celular"
                name="Celular"
                placeholder="Digite el celular"
                rules="required"
                type="tel"
              />
            </v-col>
            <v-col cols="12" md="6">
              <InputText
                v-model="model.email"
                label="Email"
                name="Email"
                placeholder="Digite el correo electrónico"
                rules="email"
                type="email"
              />
            </v-col>
            <v-col cols="12" md="6">
              <InputSelect
                v-model="model.state_id"
                label="Departamento"
                placeholder="Seleccione el departamento"
                :items="states"
                item-title="name"
                item-value="id"
                name="Departamento"
                rules="required"
                :loading="loadingStates"
                @change="assignCities(model.state_id)"
              />
            </v-col>
            <v-col cols="12" md="6">
              <InputSelect
                v-model="model.city_id"
                label="Ciudad"
                placeholder="Seleccione la ciudad"
                :items="cities"
                item-title="name"
                item-value="id"
                name="Ciudad"
                rules="required"
                :loading="loadingCities"
                :disabled="!model.state_id"
                @change="assignSectors(model.city_id, model.sector_type_id)"
              />
            </v-col>
            <v-col cols="12" md="6">
              <InputSelect
                v-model="model.sector_type_id"
                label="Tipo de sector"
                placeholder="Seleccione el tipo de sector"
                :items="sectorTypes"
                item-title="name"
                item-value="id"
                name="Tipo de sector"
                rules="required"
                :loading="loadingSectorTypes"
                :disabled="!model.city_id"
                @change="assignSectors(model.city_id, model.sector_type_id)"
              />
            </v-col>
            <v-col cols="12" md="6">
              <InputSelect
                v-model="model.sector_id"
                label="Sector"
                placeholder="Seleccione el sector"
                :items="sectors"
                item-title="name"
                item-value="id"
                name="Sector"
                rules="required"
                :loading="loadingSectors"
                :disabled="!model.city_id || !model.sector_type_id"
              />
            </v-col>
            <v-col cols="12">
              <InputText
                v-model="model.address"
                label="Dirección"
                name="Dirección"
                placeholder="Digite la dirección"
                rules="required"
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
