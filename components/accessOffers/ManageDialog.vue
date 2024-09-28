<script setup lang="ts">
  import moment from 'moment'
  import type { FormContext } from 'vee-validate'
  import type { IAccessOffer } from '~/implementation/interfaces/IAccessOffer'
  import { AccessOffer } from '~/implementation/classes/AccessOffer'
  import type { IStringIndexed } from '~/implementation/interfaces/IStringIndexed'

  const props = withDefaults(
    defineProps<{ accessOffer: IAccessOffer; modelValue: boolean }>(),
    { accessOffer: () => new AccessOffer(), modelValue: false }
  )
  const emit = defineEmits<{
    (event: 'update:modelValue', data: boolean): void
    (event: 'saved', data: IAccessOffer): void
  }>()

  const api = useApi()
  const { snackbar } = useSnackbar()
  const { getAccessOfferTypes } = useTypes()

  const entityForm = ref<FormContext>()
  const loading = ref<boolean>(false)
  const model = ref<IAccessOffer>(new AccessOffer())
  const accessOfferTypes = ref<IStringIndexed[]>([])

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

  const respond = () => {
    entityForm.value?.validate().then(async result => {
      if (result.valid) {
        loading.value = true
        api
          .request({
            method: 'put',
            url: `access-offers/${props.accessOffer.id}`,
            data: {
              type: model.value.type,
              observations: model.value.observations,
              status: model.value.status
            }
          })
          .then(({ data }) => {
            emit('saved', new AccessOffer(data?.data))
            snackbar({
              message: 'Acceso a offerta actualizado correctamente',
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
    })
  }

  const openDialog = () => {
    if (!accessOfferTypes.value.length)
      accessOfferTypes.value = getAccessOfferTypes()
  }

  watch(
    () => dialog.value,
    newValue => {
      if (newValue) openDialog()
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
            Actualización de acceso a la oferta
          </h4>
          <v-btn variant="outlined" icon="mdi-close" @click="cancelForm" />
        </div>
      </v-card-title>
      <v-container>
        <v-row>
          <v-col cols="12" sm="4" class="pb-0">
            <v-list-item subtitle="Oferta ID">
              <v-list-item-title class="text-wrap">
                {{ accessOffer.offer_id }}
              </v-list-item-title>
            </v-list-item>
          </v-col>
          <v-col cols="12" sm="4" class="pb-0">
            <v-list-item subtitle="Acceso ID">
              <v-list-item-title class="text-wrap">
                {{ accessOffer.id }}
              </v-list-item-title>
            </v-list-item>
          </v-col>
          <v-col cols="12" sm="4" class="pb-0">
            <v-list-item subtitle="Creación del accesso">
              <v-list-item-title class="text-wrap">
                {{ moment(accessOffer.created_at).format('DD-MM-YYYY') }}
              </v-list-item-title>
            </v-list-item>
          </v-col>
          <v-col cols="12" sm="6" class="pb-0">
            <v-list-item subtitle="Estado del accesso">
              <v-list-item-title class="text-wrap">
                <v-chip
                  label
                  :color="accessOffer.status === 'active' ? 'success' : 'error'"
                >
                  {{ accessOffer.status }}
                </v-chip>
              </v-list-item-title>
            </v-list-item>
          </v-col>
          <v-col cols="12" sm="6" class="pb-0">
            <v-list-item subtitle="Tipo de acceso">
              <v-list-item-title class="text-wrap">
                <v-chip label color="info">
                  {{ accessOffer.type }}
                </v-chip>
              </v-list-item-title>
            </v-list-item>
          </v-col>
          <v-col cols="12">
            <v-list-item
              v-if="accessOffer?.person"
              subtitle="Persona que accede a la oferta"
            >
              <v-list-item-title class="text-wrap">
                {{ accessOffer.person.business_name }}
              </v-list-item-title>
              <v-list-item-title
                v-if="accessOffer.person?.identification_type"
                class="text-wrap"
              >
                {{ accessOffer.person.identification_type.name }}
                {{ accessOffer.person.identification }}
              </v-list-item-title>
            </v-list-item>
          </v-col>
        </v-row>
        <VeeForm ref="entityForm">
          <v-row>
            <v-col cols="12">
              <InputSelect
                v-model="model.type"
                :items="accessOfferTypes"
                label="Nuevo tipo de acceso"
                name="Nuevo tipo de acceso"
                placeholder="Seleccione el nuevo tipo obtenido"
                item-title="text"
                item-value="value"
                rules="required"
              />
            </v-col>
            <v-col cols="12">
              <InputTextarea
                v-model="model.observations"
                label="Observaciones"
                placeholder="Observaciones"
                rows="2"
              />
            </v-col>
          </v-row>
        </VeeForm>
      </v-container>
      <v-card-actions class="mx-2 mb-2">
        <v-spacer />
        <v-btn
          variant="tonal"
          size="large"
          color="primary"
          :loading="loading"
          class="text-capitalize"
          @click="respond"
        >
          actualizar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
