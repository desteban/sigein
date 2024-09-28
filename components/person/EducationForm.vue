<script setup lang="ts">
  import type { FormContext } from 'vee-validate'
  import type { WritableComputedRef } from 'vue'
  import type { IEducation } from '~/implementation/interfaces/IEducation'
  import { Education } from '~/implementation/classes/Education'
  import type { IPerson } from '~/implementation/interfaces/IPerson'
  import type { IAcademicDiscipline } from '~/implementation/interfaces/IAcademicDiscipline'
  import type { IEducationDegree } from '~/implementation/interfaces/IEducationDegree'

  const props = withDefaults(
    defineProps<{
      personId: number | null
      educationId?: number | null
      modelValue: boolean
    }>(),
    { personId: null, educationId: null, modelValue: false }
  )

  const emit = defineEmits<{
    (event: 'update:modelValue', value: boolean): void
    (event: 'saved', value: IEducation): void
    (event: 'deleted'): void
  }>()

  const api = useApi()
  const { snackbar } = useSnackbar()
  const { getAcademicDisciplines, getEducationDegrees } = useTypes()

  const entityForm = ref<FormContext>()
  const loading = ref(false)
  const model = ref<IEducation>(new Education())
  const modelInstitution = ref<IPerson | string | null>(null)
  const modelDegree = ref<IEducationDegree | string | null>(null)
  const modelAcademicDiscipline = ref<IAcademicDiscipline | string | null>(null)
  const academicDisciplines = ref<IAcademicDiscipline[]>([])
  const educationDegrees = ref<IEducationDegree[]>([])

  const deleteDialog = reactive({
    value: false,
    title: 'Eliminar registro de educación',
    content: '¿Está seguro que desea eliminar este registro?',
    route: 'educations/'
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
    if (props.educationId) {
      loading.value = true
      api
        .get(`educations/${props.educationId}`)
        .then(({ data }) => {
          model.value = data
          modelAcademicDiscipline.value =
            data.academic_discipline ?? data.academic_discipline_text
          modelDegree.value =
            data.education_degree ?? data.education_degree_text
          modelInstitution.value =
            data.educational_institution ?? data.educational_institution_text
        })
        .catch((error: any) => {
          snackbar({ type: 'error', error })
        })
        .finally(() => {
          loading.value = false
        })
    } else {
      model.value = new Education()
    }
  }

  const getTypesProperties = async () => {
    academicDisciplines.value = await getAcademicDisciplines()
    educationDegrees.value = await getEducationDegrees()
  }

  const openDialog = () => {
    if (!academicDisciplines.value.length || !educationDegrees.value.length)
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
      model.value = new Education()
      modelInstitution.value = null
      modelDegree.value = null
      modelAcademicDiscipline.value = null
      entityForm.value?.resetForm()
    }, 400)
  }

  const saveForm = () => {
    entityForm.value?.validate().then(async result => {
      if (result.valid) {
        loading.value = true
        if (!props.educationId) model.value.person_id = props.personId
        if (
          typeof modelInstitution.value === 'object' &&
          modelInstitution.value?.id
        ) {
          model.value.educational_institution_id = modelInstitution.value.id
          model.value.educational_institution_text = null
        } else if (typeof modelInstitution.value === 'string') {
          model.value.educational_institution_text = modelInstitution.value
          model.value.educational_institution_id = null
        }
        if (typeof modelDegree.value === 'object' && modelDegree.value?.id) {
          model.value.education_degree_id = modelDegree.value.id
          model.value.education_degree_text = null
        } else if (typeof modelDegree.value === 'string') {
          model.value.education_degree_text = modelDegree.value
          model.value.education_degree_id = null
        }
        if (
          typeof modelAcademicDiscipline.value === 'object' &&
          modelAcademicDiscipline.value?.id
        ) {
          model.value.academic_discipline_id = modelAcademicDiscipline.value.id
          model.value.academic_discipline_text = null
        } else if (typeof modelAcademicDiscipline.value === 'string') {
          model.value.academic_discipline_text = modelAcademicDiscipline.value
          model.value.academic_discipline_id = null
        }
        api
          .request({
            method: props.educationId ? 'put' : 'post',
            url: `educations${props.educationId ? `/${props.educationId}` : ''}`,
            data: model.value
          })
          .then(({ data }) => {
            emit('saved', data?.data)
            snackbar({
              message: `Registro de educación ${props.educationId ? 'actualizado' : 'creado'} correctamente`,
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
    :entity-id="props.educationId"
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
            {{ props.educationId ? 'Editar' : 'Agregar' }} Experiencia
          </h4>
          <v-btn variant="outlined" icon="mdi-close" @click="cancelForm" />
        </div>
      </v-card-title>
      <v-divider class="ma-0" />
      <v-card-text class="pa-4">
        <VeeForm ref="entityForm">
          <v-row>
            <v-col cols="12">
              <PersonInputSearch
                v-model="modelInstitution"
                rules="required"
                label="Institución educativa"
                name="Insitución educativa"
                placeholder="Seleccione una institución educativa"
              />
            </v-col>
            <v-col cols="12">
              <InputSelect
                v-model="modelDegree"
                :items="educationDegrees"
                label="Título obtenido"
                name="Título obtenido"
                placeholder="Seleccione el título obtenido"
                item-title="name"
                item-value="id"
                rules="required"
                return-object
                type-component="combobox"
              />
            </v-col>
            <v-col cols="12">
              <InputSelect
                v-model="modelAcademicDiscipline"
                :items="academicDisciplines"
                label="Disciplina académica"
                name="Disciplina académica"
                placeholder="Seleccione una disciplina académica"
                item-title="name"
                item-value="id"
                rules="required"
                return-object
                type-component="combobox"
              />
            </v-col>
            <v-col cols="12">
              <InputTextarea
                v-model="model.description"
                label="Descripción"
                placeholder="Descripción u observaciones"
                rows="2"
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
