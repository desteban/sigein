<script setup lang="ts">
  import type { FormContext } from 'vee-validate'
  import type { WritableComputedRef } from 'vue'
  import type { IWorkExperience } from '~/implementation/interfaces/IWorkExperience'
  import { WorkExperience } from '~/implementation/classes/WorkExperience'
  import type { IType } from '~/implementation/interfaces/IType'
  import type { IPerson } from '~/implementation/interfaces/IPerson'
  import type { IPosition } from '~/implementation/interfaces/IPosition'

  const props = withDefaults(
    defineProps<{
      personId: number | null
      experienceId?: number | null
      modelValue: boolean
    }>(),
    { personId: null, experienceId: null, modelValue: false }
  )

  const emit = defineEmits<{
    (event: 'update:modelValue', value: boolean): void
    (event: 'saved', value: IWorkExperience): void
    (event: 'deleted'): void
  }>()

  const api = useApi()
  const { snackbar } = useSnackbar()
  const { getTypes } = useTypes()

  const entityForm = ref<FormContext>()
  const loading = ref(false)
  const model = ref<IWorkExperience>(new WorkExperience())
  const modelPosition = ref<IPosition | string | null>(null)
  const modelCompany = ref<IPerson | string | null>(null)
  const jobTypes = ref<IType[]>([])

  const deleteDialog = reactive({
    value: false,
    title: 'Eliminar experiencia laboral',
    content:
      '¿Está seguro que desea eliminar este registro de experiencia laboral?',
    route: 'work-experiences/'
  })
  const dialog: WritableComputedRef<boolean> = computed({
    get() {
      return props.modelValue
    },
    set(value: boolean) {
      emit('update:modelValue', value)
    }
  })

  const getItem = () => {
    if (props.experienceId) {
      loading.value = true
      api
        .get(`work-experiences/${props.experienceId}`)
        .then(({ data }) => {
          model.value = data
          modelPosition.value = data.position ?? data.position_text
          modelCompany.value = data.company ?? data.company_text
        })
        .catch((error: any) => {
          snackbar({ type: 'error', error })
        })
        .finally(() => {
          loading.value = false
        })
    } else {
      model.value = new WorkExperience()
    }
  }

  const getTypesProperties = async () => {
    jobTypes.value = await getTypes('job_types')
  }

  const openDialog = () => {
    if (!jobTypes.value.length) getTypesProperties()
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
      model.value = new WorkExperience()
      modelPosition.value = null
      modelCompany.value = null
      entityForm.value?.resetForm()
    }, 400)
  }

  const saveForm = () => {
    entityForm.value?.validate().then(async result => {
      if (result.valid) {
        loading.value = true
        if (!props.experienceId) model.value.person_id = props.personId
        if (
          typeof modelPosition.value === 'object' &&
          modelPosition.value?.id
        ) {
          model.value.position_id = modelPosition.value.id
          model.value.position_text = null
        } else if (typeof modelPosition.value === 'string') {
          model.value.position_text = modelPosition.value
          model.value.position_id = null
        }
        if (typeof modelCompany.value === 'object' && modelCompany.value?.id) {
          model.value.company_id = modelCompany.value.id
          model.value.company_text = null
        } else if (typeof modelCompany.value === 'string') {
          model.value.company_text = modelCompany.value
          model.value.company_id = null
        }
        api
          .request({
            method: props.experienceId ? 'put' : 'post',
            url: `work-experiences${props.experienceId ? `/${props.experienceId}` : ''}`,
            data: model.value
          })
          .then(({ data }) => {
            emit('saved', data?.data)
            snackbar({
              message: `Registro de experiencia laboral ${props.experienceId ? 'actualizado' : 'creado'} correctamente`,
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

  const deletedItem = () => {
    emit('deleted')
    cancelForm()
  }
</script>

<template>
  <GeneralDialogDelete
    v-model="deleteDialog.value"
    :title="deleteDialog.title"
    :content="deleteDialog.content"
    :route="deleteDialog.route"
    :entity-id="props.experienceId"
    @deleted="deletedItem"
  />
  <v-dialog
    v-model="dialog"
    :scrollable="true"
    :persistent="true"
    width="680"
    scroll-strategy="none"
  >
    <v-card>
      <v-card-title class="bg-primary">
        <div class="d-flex justify-space-between">
          <h4 class="text-h5 align-self-center">
            {{ props.experienceId ? 'Editar' : 'Agregar' }} Experiencia
          </h4>
          <v-btn variant="outlined" icon="mdi-close" @click="cancelForm" />
        </div>
      </v-card-title>
      <v-divider class="ma-0" />
      <v-card-text class="pa-4">
        <VeeForm ref="entityForm">
          <v-row>
            <v-col cols="12">
              <InputText
                v-model="model.title"
                label="Título"
                name="Título"
                rules="required"
              />
            </v-col>
            <v-col cols="12">
              <PersonInputSearch
                v-model="modelCompany"
                rules="required"
                label="Empresa"
                name="Empresa"
                placeholder="Seleccione la empresa o escriba el nombre"
              />
            </v-col>
            <v-col cols="12">
              <PositionInputSearch
                v-model="modelPosition"
                label="Cargo"
                name="Cargo"
                placeholder="Seleccione un cargo"
                rules="required"
              />
            </v-col>
            <v-col cols="12">
              <InputSelect
                v-model="model.job_type_id"
                :items="jobTypes"
                label="Tipo de empleo"
                name="Tipo de empleo"
                placeholder="Seleccione un tipo de empleo"
                item-title="name"
                item-value="id"
                rules="required"
              />
            </v-col>
            <v-col cols="12">
              <InputTextarea
                v-model="model.description"
                label="Descripción"
                name="Descripción"
                placeholder="Descripción de la experiencia o actividades realizadas"
                rules="required"
              />
            </v-col>
            <v-col cols="12" md="6">
              <InputText
                v-model="model.start_date"
                type="date"
                label="Fecha de inicio"
                name="Fecha de inicio"
                rules="required"
              />
            </v-col>
            <v-col cols="12" md="6">
              <InputText
                v-model="model.end_date"
                type="date"
                label="Fecha de finalización"
              />
            </v-col>
          </v-row>
        </VeeForm>
      </v-card-text>
      <v-divider />
      <v-card-actions class="mx-2 mb-2">
        <template v-if="model.id">
          <v-btn
            variant="text"
            size="large"
            color="error"
            :loading="loading"
            @click="deleteDialog.value = true"
          >
            Eliminar
          </v-btn>
          <v-spacer />
        </template>
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
