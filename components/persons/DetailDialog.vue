<script setup lang="ts">
  import type { WritableComputedRef } from 'vue'
  import type { IPerson } from '~/implementation/interfaces/IPerson'
  import { Person } from '~/implementation/classes/Person'
  import RegistrationDialog from '~/components/persons/RegistrationDialog.vue'
  import SurveyTabsByPerson from '~/components/surveys/TabsByPerson.vue'
  import type { ISurvey } from '~/implementation/interfaces/ISurvey'

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
  const { getLocationPerson } = usePerson()

  const model = ref<IPerson>(new Person())
  const loading = ref<boolean>(false)
  const registerDialog = ref<boolean>(false)

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
        .get(`persons/${props.personId}/surveys`)
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

  const openDialog = () => {
    getItem()
  }

  watch(
    () => dialog.value,
    newValue => {
      if (newValue) openDialog()
    },
    { deep: true, immediate: false }
  )

  const closeDialog = () => {
    dialog.value = false
    setTimeout(() => {
      model.value = new Person()
    }, 400)
  }

  const savedItem = (saved: IPerson) => {
    emit('saved', saved)
    if (saved.id) getItem()
  }

  const savedSurvey = (saved: ISurvey) => {
    emit('saved', model.value)
    if (saved.id) getItem()
  }
</script>

<template>
  <v-dialog
    v-model="dialog"
    :scrollable="true"
    :persistent="true"
    scroll-strategy="none"
    fullscreen
  >
    <v-card rounded="0">
      <Loading v-model="loading" />
      <v-card-title class="bg-primary">
        <div class="d-flex justify-space-between">
          <h4 class="text-h5 align-self-center">Detalle de persona</h4>
          <v-btn variant="outlined" icon="mdi-close" @click="closeDialog" />
        </div>
      </v-card-title>
      <v-divider class="ma-0" />
      <v-container class="pa-4">
        <v-row dense>
          <v-col cols="12" md="4">
            <v-card variant="outlined">
              <v-card-item class="text-center">
                <v-avatar v-if="model.id" size="80">
                  <v-icon
                    :icon="`mdi-face-${model.sex === 'M' ? 'man' : 'woman'}-outline`"
                    size="60"
                  />
                </v-avatar>
                <h4 class="text-h5">{{ model.full_name }}</h4>
                <span class="text-truncate d-block gap-2 text-subtitle-1">
                  {{
                    [
                      model?.identification_type?.name,
                      model.identification_number
                    ]
                      .filter(x => x)
                      .join(' ')
                  }}
                </span>
              </v-card-item>
              <v-card-actions class="bg-grey100 align-center justify-center">
                <a v-if="model.phone" :href="`tel:${model.phone}`">
                  <v-btn icon color="primary" variant="tonal" size="x-small">
                    <v-icon icon="mdi-cellphone" />
                    <v-tooltip activator="parent" location="top">
                      Llamar
                    </v-tooltip>
                  </v-btn>
                </a>
                <a v-if="model.email" :href="`mailto:${model.email}`">
                  <v-btn color="primary" icon variant="tonal" size="x-small">
                    <v-icon icon="mdi-email" />
                    <v-tooltip activator="parent" location="top">
                      Enviar email
                    </v-tooltip>
                  </v-btn>
                </a>
                <v-spacer />
                <v-btn
                  color="warning"
                  icon
                  variant="tonal"
                  size="x-small"
                  @click="registerDialog = true"
                >
                  <v-icon icon="mdi-pencil" />
                  <v-tooltip activator="parent" location="top">
                    Editar
                  </v-tooltip>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="12" md="8">
            <v-row dense>
              <v-col cols="12" md="6">
                <v-card variant="outlined">
                  <v-list-item subtitle="Fecha nacimiento">
                    <template #prepend>
                      <v-avatar color="grey400">
                        <v-icon icon="mdi-cake-variant-outline" />
                      </v-avatar>
                    </template>
                    <template #title>
                      <h5 class="text-subtitle-1">{{ model.birth_date }}</h5>
                    </template>
                  </v-list-item>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card variant="outlined">
                  <v-list-item subtitle="Tipo de Sangre">
                    <template #prepend>
                      <v-avatar color="grey400">
                        <v-icon icon="mdi-blood-bag" />
                      </v-avatar>
                    </template>
                    <template #title>
                      <h5 class="text-subtitle-1">{{ model.blood_type }}</h5>
                    </template>
                  </v-list-item>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card variant="outlined">
                  <v-list-item subtitle="Estado civil">
                    <template #prepend>
                      <v-avatar color="grey400">
                        <v-icon icon="mdi-account-supervisor-outline" />
                      </v-avatar>
                    </template>
                    <template #title>
                      <h5 class="text-subtitle-1">
                        {{ model.marital_status }}
                      </h5>
                    </template>
                  </v-list-item>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card variant="outlined">
                  <v-list-item subtitle="Celular">
                    <template #prepend>
                      <v-avatar color="grey400">
                        <v-icon icon="mdi-cellphone" />
                      </v-avatar>
                    </template>
                    <template #title>
                      <h5 class="text-subtitle-1">{{ model.phone }}</h5>
                    </template>
                  </v-list-item>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card variant="outlined">
                  <v-list-item subtitle="Correo electrónico">
                    <template #prepend>
                      <v-avatar color="grey400">
                        <v-icon icon="mdi-email-outline" />
                      </v-avatar>
                    </template>
                    <template #title>
                      <h5 class="text-subtitle-1">{{ model.email }}</h5>
                    </template>
                  </v-list-item>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card variant="outlined">
                  <v-list-item subtitle="Ubicación">
                    <template #prepend>
                      <v-avatar color="grey400">
                        <v-icon icon="mdi-map-marker-radius-outline" />
                      </v-avatar>
                    </template>
                    <template #title>
                      <h5 class="text-subtitle-1">
                        {{ getLocationPerson(model) }}
                      </h5>
                    </template>
                  </v-list-item>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card variant="outlined">
                  <v-list-item subtitle="Dirección">
                    <template #prepend>
                      <v-avatar color="grey400">
                        <v-icon icon="mdi-routes" />
                      </v-avatar>
                    </template>
                    <template #title>
                      <h5 class="text-subtitle-1">
                        {{ model.address }}
                      </h5>
                    </template>
                  </v-list-item>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <v-row>
          <v-col cols="12">
            <SurveyTabsByPerson
              :person="model"
              @saved="saved => savedSurvey(saved)"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <RegistrationDialog
      v-model="registerDialog"
      :person-id="model.id"
      @saved="saved => savedItem(saved)"
    />
  </v-dialog>
</template>

<style scoped lang="scss">
  ::v-deep .v-list-item-title {
    white-space: normal !important;
  }
</style>
