<script setup lang="ts">
  import type { FormContext } from 'vee-validate'
  import type { WritableComputedRef } from 'vue'
  import type { ILocationInfo } from '~/implementation/interfaces/ILocationInfo'
  import { LocationInfo } from '~/implementation/classes/LocationInfo'
  import type { ICountry } from '~/implementation/interfaces/ICountry'
  import type Text from '~/components/input/Text.vue'
  import type { IState } from '~/implementation/interfaces/IState'
  import type { ICity } from '~/implementation/interfaces/ICity'

  const props = withDefaults(
    defineProps<{
      personId: number | null
      locationInfoId?: number | null
      modelValue: boolean
    }>(),
    { personId: null, locationInfoId: null, modelValue: false }
  )

  const emit = defineEmits<{
    (event: 'update:modelValue', value: boolean): void
    (event: 'saved', value: ILocationInfo): void
  }>()

  const api = useApi()
  const { snackbar } = useSnackbar()
  const { getPhoneCountries, getCountries, getStates, getCities } = useTypes()

  const entityForm = ref<FormContext>()
  const phoneNumberInput = ref<InstanceType<typeof Text>>()
  const phoneCountries = getPhoneCountries()
  const phoneData = ref<{ name: string; iso2: string; dialCode: string }>()
  const loading = ref<boolean>(false)
  const loadingCountries = ref<boolean>(false)
  const loadingStates = ref<boolean>(false)
  const loadingCities = ref<boolean>(false)
  const model = ref<ILocationInfo>(new LocationInfo())
  const countries = ref<ICountry[]>([])
  const states = ref<IState[]>([])
  const cities = ref<ICity[]>([])

  const dialog: WritableComputedRef<boolean> = computed({
    get() {
      return props.modelValue
    },
    set(value: boolean) {
      emit('update:modelValue', value)
    }
  })

  const assignStates = async (
    countryId: number | null,
    reset: boolean = true
  ) => {
    if (reset) {
      model.value.state_id = null
      model.value.city_id = null
    }
    if (countryId) {
      loadingStates.value = true
      states.value = await getStates(countryId)
      loadingStates.value = false
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

  const assingPhoneData = () => {
    if (phoneData.value) {
      model.value.phone_dial = phoneData.value.dialCode
      model.value.phone_iso = phoneData.value.iso2
      setTimeout(() => {
        phoneNumberInput.value?.focus()
      }, 200)
    } else {
      model.value.phone_dial = null
      model.value.phone_iso = null
    }
  }

  const getItem = () => {
    if (props.locationInfoId) {
      loading.value = true
      api
        .get(`location-info/${props.locationInfoId}`)
        .then(({ data }) => {
          model.value = data
          if (model.value.country_id)
            assignStates(model.value.country_id, false)
          if (model.value.state_id) assignCities(model.value.state_id, false)
          phoneData.value = phoneCountries.find(
            (country: any) =>
              country.dialCode === model.value.phone_dial &&
              country.iso2 === model.value.phone_iso
          )
        })
        .catch((error: any) => {
          snackbar({ type: 'error', error })
        })
        .finally(() => {
          loading.value = false
        })
    } else {
      model.value = new LocationInfo()
    }
  }

  const getTypesProperties = async () => {
    loadingCountries.value = true
    countries.value = await getCountries()
    loadingCountries.value = false
  }

  const openDialog = () => {
    if (!countries.value.length) getTypesProperties()
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
      model.value = new LocationInfo()
      entityForm.value?.resetForm()
    }, 400)
  }

  const saveForm = () => {
    entityForm.value?.validate().then(async result => {
      if (result.valid) {
        loading.value = true
        if (!props.locationInfoId) model.value.person_id = props.personId
        api
          .request({
            method: props.personId ? 'put' : 'post',
            url: `location-info${props.locationInfoId ? `/${props.locationInfoId}` : ''}`,
            data: model.value
          })
          .then(({ data }) => {
            emit('saved', data?.data)
            snackbar({
              message: `Información de ubicación ${props.locationInfoId ? 'actualizada' : 'creada'} correctamente`,
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
            {{ props.locationInfoId ? 'Editar' : 'Agregar' }} Información de
            ubicación
          </h4>
          <v-btn variant="outlined" icon="mdi-close" @click="cancelForm" />
        </div>
      </v-card-title>
      <v-divider class="ma-0" />
      <v-card-text class="pa-4">
        <VeeForm ref="entityForm">
          <v-row>
            <v-col cols="12" md="6">
              <InputSelect
                v-model="model.country_id"
                label="País"
                placeholder="Seleccione el país"
                :items="countries"
                item-title="name"
                item-value="id"
                name="País"
                rules="required"
                :loading="loadingCountries"
                @change="assignStates(model.country_id)"
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
                :disabled="!model.country_id"
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
              />
            </v-col>
            <v-col cols="12" md="6">
              <InputText
                v-model="model.postal_code"
                label="Código postal"
                placeholder="Código postal"
              />
            </v-col>
            <v-col cols="12">
              <InputText
                v-model="model.address"
                label="Dirección"
                placeholder="Dirección"
                name="Dirección"
                rules="required"
              />
            </v-col>
            <v-col cols="12">
              <v-card>
                <v-card-subtitle class="pt-3">
                  <v-icon>mdi-cellphone</v-icon>
                  Teléfono
                </v-card-subtitle>
                <v-container>
                  <v-row>
                    <v-col cols="12" md="6">
                      <InputSelect
                        v-model="phoneData"
                        label="País del teléfono"
                        :items="phoneCountries"
                        return-object
                        hide-details="auto"
                        :single-line="true"
                        item-title="name"
                        item-value="name"
                        rules="required"
                        name="País del teléfono"
                        eager
                        @change="assingPhoneData"
                      >
                        <template #item="{ props, item }">
                          <v-list-item
                            v-bind="props"
                            density="compact"
                            :title="`(+${item.raw.dialCode}) ${item.raw.name}`"
                          >
                            <template v-if="item.raw.iso2" #prepend>
                              <span
                                :class="`fi fi-${item.raw.iso2} mr-1`"
                                style="margin-bottom: 2px"
                              />
                            </template>
                          </v-list-item>
                        </template>
                        <template #selection="{ item }">
                          <span
                            v-if="item.raw.iso2"
                            :class="`fi fi-${item.raw.iso2} pt-1`"
                          />
                          <span class="ml-2 text-nowrap overflow-hidden">
                            {{ item.raw.name }}
                          </span>
                        </template>
                      </InputSelect>
                    </v-col>
                    <v-col cols="12" md="6">
                      <InputText
                        id="phoneNumberInput"
                        ref="phoneNumberInput"
                        v-model="model.phone_number"
                        label="Número de teléfono"
                        type="tel"
                        placeholder="Número de teléfono"
                        name="Número de teléfono"
                        rules="required"
                      >
                        <template #prepend-inner>
                          <span v-if="phoneData" class="font-weight-bold mb-2">
                            {{ `+${phoneData.dialCode}` }}
                          </span>
                        </template>
                      </InputText>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
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
