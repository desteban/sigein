<script setup lang="ts">
  import type { FormContext } from 'vee-validate'
  import type { WritableComputedRef } from 'vue'
  import type { IPersonEconomicActivity } from '~/implementation/interfaces/IPersonEconomicActivity'
  import { PersonEconomicActivity } from '~/implementation/classes/PersonEconomicActivity'
  import type { IEconomicActivity } from '~/implementation/interfaces/IEconomicActivity'

  const props = withDefaults(
    defineProps<{
      personId: number | null
      personEconomicActivityId?: number | null
      modelValue: boolean
    }>(),
    { personId: null, personEconomicActivityId: null, modelValue: false }
  )

  const emit = defineEmits<{
    (event: 'update:modelValue', value: boolean): void
    (event: 'saved', value: IPersonEconomicActivity): void
    (event: 'deleted'): void
  }>()

  const api = useApi()
  const { snackbar } = useSnackbar()
  const { getEconomicActivities } = useTypes()

  const entityForm = ref<FormContext>()
  const loading = ref(false)
  const model = ref<IPersonEconomicActivity>(new PersonEconomicActivity())
  const economicActivities = ref<IEconomicActivity[]>([])

  const deleteDialog = reactive({
    value: false,
    title: 'Eliminar registro de actividad económica',
    content: '¿Está seguro que desea eliminar este registro?',
    route: 'person-economic-activities/'
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
    if (props.personEconomicActivityId) {
      loading.value = true
      api
        .get(`person-economic-activities/${props.personEconomicActivityId}`)
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
      model.value = new PersonEconomicActivity()
    }
  }

  const getTypesProperties = async () => {
    economicActivities.value = await getEconomicActivities()
  }

  const openDialog = () => {
    if (!economicActivities.value.length) getTypesProperties()
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
      model.value = new PersonEconomicActivity()
      entityForm.value?.resetForm()
    }, 400)
  }

  const saveForm = () => {
    entityForm.value?.validate().then(async result => {
      if (result.valid) {
        loading.value = true
        if (!props.personEconomicActivityId)
          model.value.person_id = props.personId
        api
          .request({
            method: props.personEconomicActivityId ? 'put' : 'post',
            url: `person-economic-activities${props.personEconomicActivityId ? `/${props.personEconomicActivityId}` : ''}`,
            data: model.value
          })
          .then(({ data }) => {
            emit('saved', data?.data)
            snackbar({
              message: `Registro de actividad económica ${props.personEconomicActivityId ? 'actualizado' : 'creado'} correctamente`,
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
    :entity-id="props.personEconomicActivityId"
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
            {{ props.personEconomicActivityId ? 'Editar' : 'Agregar' }}
            Actividad Económica
          </h4>
          <v-btn variant="outlined" icon="mdi-close" @click="cancelForm" />
        </div>
      </v-card-title>
      <v-divider class="ma-0" />
      <v-card-text class="pa-4">
        <VeeForm ref="entityForm">
          <v-row>
            <v-col cols="12">
              <InputSelect
                v-model="model.economic_activity_id"
                :items="economicActivities"
                label="Actividad económica"
                name="Actividad económica"
                placeholder="Seleccionar una actividad económica"
                item-title="name"
                item-value="id"
                rules="required"
              >
                <template #item="{ props, item }">
                  <v-list-item
                    v-bind="props"
                    density="compact"
                    :title="`(${item.raw.code}) ${item.raw.name}`"
                  >
                    <template #subtitle>
                      <div class="text-caption">
                        {{ item.raw.description }}
                      </div>
                    </template>
                  </v-list-item>
                </template>
                <template #selection="{ item }">
                  {{ `(${item.raw.code}) ${item.raw.name}` }}
                </template>
              </InputSelect>
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
