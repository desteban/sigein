<script setup lang="ts">
  import type { FormContext } from 'vee-validate'
  import type { WritableComputedRef } from 'vue'
  import type { ISurvey } from '~/implementation/interfaces/ISurvey'
  import { Survey } from '~/implementation/classes/Survey'
  import type { ISurveyRejectionReason } from '~/implementation/interfaces/ISurveyRejectionReason'
  import type { ISurveyType } from '~/implementation/interfaces/ISurveyType'
  import ApgarRegistrationForm from '~/components/surveys/apgar/RegistrationForm.vue'
  import type { IApgarQuestion } from '~/implementation/interfaces/survey/apgar/IApgarQuestion'

  const props = withDefaults(
    defineProps<{
      personId: number | null
      modelValue: boolean
    }>(),
    { personId: null, modelValue: false }
  )

  const emit = defineEmits<{
    (event: 'update:modelValue', value: boolean): void
    (event: 'saved', value: ISurvey): void
  }>()

  const { saveSurvey } = useSurvey()
  const { getSurveyRejectionReason, getSurveyTypes, getSurveyStatus } =
    useTypesData()

  const entityForm = ref<FormContext>()
  const model = ref<ISurvey>(new Survey())
  const rejectionReason = ref<ISurveyRejectionReason[]>([])
  const types = ref<ISurveyType[]>([])
  const status = ref<string[]>([])

  const loading = ref<boolean>(false)
  const loadingRejectionReason = ref<boolean>(false)
  const loadingTypes = ref<boolean>(false)
  const loadingStatus = ref<boolean>(false)
  const selectedComponent = ref<typeof ApgarRegistrationForm | null>(null)

  const surveyContent = ref<IApgarQuestion[]>([])

  const dialog: WritableComputedRef<boolean> = computed({
    get() {
      return props.modelValue
    },
    set(value: boolean) {
      emit('update:modelValue', value)
    }
  })

  const getTypesProperties = async () => {
    if (!rejectionReason.value.length) {
      loadingRejectionReason.value = true
      rejectionReason.value = await getSurveyRejectionReason()
      loadingRejectionReason.value = false
    }
    if (!types.value.length) {
      loadingTypes.value = true
      types.value = await getSurveyTypes()
      loadingTypes.value = false
    }
    if (!status.value.length) {
      loadingStatus.value = true
      status.value = await getSurveyStatus()
      loadingStatus.value = false
    }
  }

  const openDialog = () => {
    getTypesProperties()
    model.value = new Survey()
  }

  watch(
    () => dialog.value,
    newValue => {
      if (newValue) openDialog()
    },
    { deep: true, immediate: false }
  )

  watch(
    () => model.value.respondent_consent,
    newValue => {
      if (newValue !== null) {
        model.value.status = newValue === 1 ? 'Activa' : 'Rechazada'
      } else model.value.status = null
    },
    { deep: true, immediate: false }
  )

  const assignSurveyForm = (survey_type_id: number | null) => {
    if (survey_type_id) {
      const surveyType = types.value.find(type => type.id === survey_type_id)
      if (surveyType?.id === 1) {
        selectedComponent.value = ApgarRegistrationForm
      }
    } else {
      selectedComponent.value = null
      surveyContent.value = []
    }
  }

  const cancelForm = () => {
    dialog.value = false
    setTimeout(() => {
      model.value = new Survey()
      entityForm.value?.resetForm()
    }, 400)
  }

  const saveForm = () => {
    console.log('props.personId', props.personId)
    entityForm.value?.validate().then(async result => {
      if (result.valid) {
        loading.value = true
        model.value.person_id = props.personId
        const response = await saveSurvey(model.value, surveyContent.value)
        console.log('props.response', response)
        if (response) {
          emit('saved', response)
          cancelForm()
        }
        loading.value = false
      }
    })
  }
</script>

<template>
  <v-dialog
    v-model="dialog"
    :scrollable="true"
    :persistent="true"
    width="1080"
    scroll-strategy="none"
  >
    <v-card>
      <v-card-title class="bg-primary">
        <div class="d-flex justify-space-between">
          <h4 class="text-h5 align-self-center">Nueva encuesta</h4>
          <v-btn variant="outlined" icon="mdi-close" @click="cancelForm" />
        </div>
      </v-card-title>
      <v-divider class="ma-0" />
      <v-card-text class="pa-4">
        <VeeForm ref="entityForm">
          <v-row>
            <v-col cols="12" md="6">
              <InputText
                v-model="model.survey_date"
                label="Fecha de encuesta"
                name="Fecha de encuesta"
                placeholder="seleccionar fecha"
                rules="required"
                type="date"
              />
            </v-col>
            <v-col cols="12" md="6">
              <InputSelect
                v-model="model.survey_type_id"
                label="Tipo de encuesta"
                name="Tipo de encuesta"
                placeholder="Seleccione el tipo de encuesta"
                :items="types"
                item-title="name"
                item-value="id"
                rules="required"
                :loading="loadingTypes"
                @change="assignSurveyForm(model.survey_type_id)"
              />
            </v-col>
            <v-col cols="12" md="6" class="d-flex flex-column align-start">
              <VeeField
                v-slot="{ errors }"
                v-model="model.respondent_consent"
                name="Disposición para realizar la encuesta"
                rules="required"
              >
                <v-btn-toggle
                  v-model="model.respondent_consent"
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
                  <v-btn :value="1" class="w-50"> Responde encuesta </v-btn>
                  <v-btn :value="0" class="w-50"> No responde </v-btn>
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
            <v-expand-transition>
              <template
                v-if="model.respondent_consent !== null && model.survey_type_id"
              >
                <v-col v-if="model.respondent_consent === 1" cols="12">
                  <component
                    :is="selectedComponent"
                    v-if="selectedComponent"
                    v-model="surveyContent"
                  />
                </v-col>
                <v-col v-else cols="12">
                  <InputSelect
                    v-model="model.rejection_reason_id"
                    label="Motivo de no encuestar"
                    name="Motivo de no encuestar"
                    placeholder="Seleccione el motivo de no realizar la encuesta"
                    :items="rejectionReason"
                    item-title="description"
                    item-value="id"
                    rules="required"
                    :loading="loadingRejectionReason"
                  />
                </v-col>
              </template>
            </v-expand-transition>
            <v-col cols="12">
              <InputTextarea
                v-model="model.observations"
                label="Observaciones"
                placeholder="Escriba las observaciones"
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
