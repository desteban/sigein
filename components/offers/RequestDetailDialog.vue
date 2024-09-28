<script setup lang="ts">
  import type { IOffer } from '~/implementation/interfaces/IOffer'
  import { Offer } from '~/implementation/classes/Offer'

  const props = withDefaults(
    defineProps<{ offerId: number | null; modelValue: boolean }>(),
    { offerId: null, modelValue: false }
  )
  const emit = defineEmits<{
    (event: 'update:modelValue', data: boolean): void
    (event: 'requested', data: IOffer): void
  }>()

  const api = useApi()
  const { snackbar } = useSnackbar()

  const loading = ref<boolean>(false)
  const loadingFile = ref<boolean>(false)
  const sendRequest = ref<boolean>(false)
  const offer = ref<IOffer>(new Offer())

  const dialog = computed({
    get() {
      return props.modelValue
    },
    set(value: boolean) {
      emit('update:modelValue', value)
    }
  })

  const cancelForm = () => {
    dialog.value = false
  }

  const getOffer = () => {
    loading.value = true
    api
      .get(`offers/${props.offerId}`)
      .then(({ data }) => {
        offer.value = new Offer(data)
        loading.value = false
      })
      .catch((error: any) => {
        snackbar({ error, type: 'error' })
        setTimeout(() => {
          loading.value = false
          cancelForm()
        }, 2000)
      })
  }

  const downloadFile = () => {
    loadingFile.value = true
    api
      .request({
        method: 'get',
        url: `offers/${offer.value.id}/detailed-access-document`,
        responseType: 'blob'
      })
      .then(({ data }) => {
        const url = window.URL.createObjectURL(new Blob([data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute(
          'download',
          `Confidentiality Agreement Offer ${offer.value.id}.pdf`
        )
        document.body.appendChild(link)
        link.click()
      })
      .catch((error: any) => {
        snackbar({ error, type: 'error' })
      })
      .finally(() => {
        loadingFile.value = false
      })
  }

  const IAccept = () => {
    if (sendRequest.value) {
      loading.value = true
      api
        .request({
          method: 'post',
          url: `offers/${offer.value.id}/request-detail`
        })
        .then(({ data }) => {
          emit('requested', new Offer(data?.data))
          snackbar({
            message: 'Solicitud enviada correctamente',
            type: 'success'
          })
          dialog.value = false
        })
        .catch((error: any) => {
          snackbar({ error, type: 'error' })
        })
        .finally(() => {
          loading.value = false
        })
    }
  }

  watch(
    () => dialog.value,
    newValue => {
      if (newValue) getOffer()
    },
    { deep: true, immediate: false }
  )
</script>

<template>
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
            Solicitud de detalle de oferta
          </h4>
          <v-btn variant="outlined" icon="mdi-close" @click="cancelForm" />
        </div>
      </v-card-title>
      <v-container>
        <v-row>
          <v-col cols="12" class="pb-0">
            <p class="text-muted ma-0">ID de Oferta: {{ offer.id }}</p>
          </v-col>
          <v-col cols="12">
            <OffersCardList :offer="offer" :readonly="true" />
          </v-col>
          <v-col cols="12" class="text-center">
            <v-card-text>
              Si enviás esta solicitud, el oferente recibirá una notificación y
              podrá aceptar o rechazar tu solicitud, adicionalmente aceptas el
              siguiente acuerdo de confidencialidad.
            </v-card-text>
            <v-btn
              :loading="loadingFile"
              color="secondary"
              variant="tonal"
              class="text-capitalize"
              @click.stop="downloadFile"
            >
              Descargar acuerdo
            </v-btn>
          </v-col>
          <v-col cols="12" class="text-center">
            <v-checkbox
              v-model="sendRequest"
              color="success"
              label="Acepto enviar la solicitud de detalle de oferta"
              hide-details="auto"
            />
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions class="mx-2 mb-2">
        <v-spacer />
        <v-btn
          variant="tonal"
          size="large"
          color="primary"
          :disabled="!sendRequest"
          :loading="loading"
          class="text-capitalize"
          @click="IAccept"
        >
          Enviar solicitud
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
