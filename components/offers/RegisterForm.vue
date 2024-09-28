<script setup lang="ts">
  import type { FormContext } from 'vee-validate'
  import type { WritableComputedRef } from 'vue'
  import { useApi } from '~/composables/useApi'
  import type { IOffer } from '~/implementation/interfaces/IOffer'
  import { Offer } from '~/implementation/classes/Offer'
  import type { IStringIndexed } from '~/implementation/interfaces/IStringIndexed'

  const props = withDefaults(
    defineProps<{
      personId: number | null
      offerId: number | null
      modelValue: boolean
    }>(),
    { personId: null, offerId: null, modelValue: false }
  )
  const emit = defineEmits<{
    (event: 'update:modelValue', value: boolean): void
    (event: 'saved', value: IOffer): void
    (event: 'deleted'): void
  }>()

  const api = useApi()
  const { snackbar } = useSnackbar()
  const { getOfferStatus } = useTypes()

  const entityForm = ref<FormContext>()
  const loading = ref(false)
  const model = ref<IOffer>(new Offer())
  const offerStatus = ref<IStringIndexed[]>([])

  const deleteDialog = reactive({
    value: false,
    title: 'Eliminar registro de oferta',
    content: '¿Está seguro que desea eliminar esta oferta?',
    route: 'offers/'
  })

  const dialog: WritableComputedRef<boolean> = computed({
    get() {
      return props.modelValue
    },
    set(value: any) {
      emit('update:modelValue', value)
    }
  })

  const getItem = () => {
    if (offerStatus.value.length === 0) {
      offerStatus.value = getOfferStatus()
    }
    if (props.offerId) {
      loading.value = true
      api
        .get(`offers/${props.offerId}`)
        .then(({ data }) => {
          model.value = data
        })
        .catch((error: any) => {
          snackbar({ error, type: 'error' })
        })
        .finally(() => {
          loading.value = false
        })
    } else {
      model.value = new Offer()
    }
  }

  const cancelForm = () => {
    dialog.value = false
    setTimeout(() => {
      model.value = new Offer()
    }, 400)
  }

  const saveForm = () => {
    entityForm.value?.validate().then(async result => {
      if (result.valid) {
        loading.value = true
        if (!props.offerId) model.value.person_id = props.personId
        api
          .request({
            method: props.offerId ? 'put' : 'post',
            url: `offers${props.offerId ? `/${props.offerId}` : ''}`,
            data: model.value
          })
          .then(({ data }) => {
            emit('saved', data?.data)
            snackbar({
              message: `Registro de oferta ${props.offerId ? 'actualizado' : 'creado'} correctamente`,
              type: 'success'
            })
            cancelForm()
          })
          .catch((error: any) => snackbar({ error, type: 'error' }))
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

  watch(
    () => dialog.value,
    newValue => {
      if (newValue) getItem()
    },
    { deep: true, immediate: false }
  )
</script>

<template>
  <v-dialog
    v-model="dialog"
    :scrollable="true"
    :persistent="true"
    :fullscreen="true"
    scroll-strategy="none"
  >
    <v-card>
      <GeneralDialogDelete
        v-model="deleteDialog.value"
        :title="deleteDialog.title"
        :content="deleteDialog.content"
        :route="deleteDialog.route"
        :entity-id="props.offerId"
        @deleted="deletedItem"
      />
      <v-card-title class="bg-primary">
        <div class="d-flex justify-space-between">
          <div class="d-flex flex-column">
            <h4 class="text-h5 align-self-center">
              {{ props.offerId ? 'Editar' : 'Crear' }} Oferta
            </h4>
            <h6 v-if="props.offerId">Oferta número {{ props.offerId }}</h6>
          </div>
          <v-btn variant="outlined" icon="mdi-close" @click="cancelForm" />
        </div>
      </v-card-title>
      <v-divider class="ma-0" />
      <v-card-text v-if="model">
        <v-container>
          <VeeForm ref="entityForm">
            <v-row>
              <v-col cols="12">
                <InputText
                  v-model="model.name"
                  label="Nombre de la oferta"
                  name="Nombre de la oferta"
                  rules="required"
                />
              </v-col>
              <v-col cols="12">
                <InputTextarea
                  v-model="model.summary"
                  label="Resumen de la oferta"
                  name="Resumen de la oferta"
                  rules="required"
                  :max-rows="5"
                />
              </v-col>
              <v-col cols="12">
                <InputTextarea
                  v-model="model.description"
                  label="Descripción completa"
                  name="Descripción completa"
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
              <v-col cols="12" md="6">
                <InputSelect
                  v-model="model.status"
                  :items="offerStatus"
                  item-title="text"
                  item-value="value"
                  label="Estado de la oferta"
                  name="Estado de la oferta"
                  rules="required"
                />
              </v-col>
            </v-row>
          </VeeForm>
        </v-container>
      </v-card-text>
      <v-divider />
      <v-container>
        <v-card-actions>
          <v-btn
            v-if="props.offerId"
            variant="text"
            size="large"
            color="error"
            :loading="loading"
            @click="deleteDialog.value = true"
          >
            Eliminar
          </v-btn>
          <v-spacer />
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
      </v-container>
    </v-card>
  </v-dialog>
</template>
