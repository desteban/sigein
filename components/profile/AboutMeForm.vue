<script setup lang="ts">
  import type { FormContext } from 'vee-validate'
  import type { WritableComputedRef } from 'vue'
  import type { IProfile } from '~/implementation/interfaces/IProfile'
  import { Profile } from '~/implementation/classes/Profile'

  const props = withDefaults(
    defineProps<{
      personId: number | null
      profileId?: number | null
      modelValue: boolean
    }>(),
    { personId: null, profileId: null, modelValue: false }
  )

  const emit = defineEmits<{
    (event: 'update:modelValue', value: boolean): void
    (event: 'saved', value: IProfile): void
  }>()

  const api = useApi()
  const { snackbar } = useSnackbar()
  const { getImageByName } = useTypes()

  const entityForm = ref<FormContext>()
  const loading = ref(false)
  const model = ref<IProfile>(new Profile())

  const dialog: WritableComputedRef<boolean> = computed({
    get() {
      return props.modelValue
    },
    set(value: boolean) {
      emit('update:modelValue', value)
    }
  })

  const getItem = () => {
    if (props.profileId) {
      loading.value = true
      api
        .get(`profiles/${props.profileId}`)
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
      model.value = new Profile()
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

  const cancelForm = () => {
    dialog.value = false
    setTimeout(() => {
      model.value = new Profile()
      entityForm.value?.resetForm()
    }, 400)
  }

  const saveForm = () => {
    entityForm.value?.validate().then(async result => {
      if (result.valid) {
        loading.value = true
        if (!props.profileId) model.value.person_id = props.personId
        api
          .request({
            method: props.profileId ? 'put' : 'post',
            url: `profiles${props.profileId ? `/${props.profileId}` : ''}`,
            data: model.value
          })
          .then(({ data }) => {
            emit('saved', data?.data)
            snackbar({
              message: `Información sobre mí ${props.profileId ? 'actualizada' : 'creada'} correctamente`,
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
    width="680"
    scroll-strategy="none"
  >
    <v-card>
      <v-card-title class="bg-primary">
        <div class="d-flex justify-space-between">
          <h4 class="text-h5 align-self-center">
            {{ props.profileId ? 'Editar' : 'Agregar' }} Información sobre mí
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
                placeholder="Título para mostrar en el perfil"
              />
            </v-col>
            <v-col cols="12">
              <InputTextarea
                v-model="model.biography"
                label="Algo sobre mí"
                placeholder="Cuenta algo sobre ti"
              />
            </v-col>
            <v-col cols="12" class="text-h5"> Redes sociales </v-col>
            <v-col cols="12">
              <InputText
                v-model="model.facebook"
                placeholder="Escribe la URL de tu perfil o enlace a facebook"
                name="Facebook"
                rules="url"
              >
                <template #prepend-inner>
                  <img
                    :src="getImageByName('facebook')"
                    width="24px"
                    alt="facebook"
                  />
                </template>
              </InputText>
            </v-col>
            <v-col cols="12">
              <InputText
                v-model="model.twitter"
                placeholder="Escribe la URL de tu perfil o enlace a X"
                name="X"
                rules="url"
              >
                <template #prepend-inner>
                  <img :src="getImageByName('twitter')" width="24px" alt="X" />
                </template>
              </InputText>
            </v-col>
            <v-col cols="12">
              <InputText
                v-model="model.linkedin"
                placeholder="Escribe la URL de tu perfil o enlace a Linkedin"
                name="Linkedin"
                rules="url"
              >
                <template #prepend-inner>
                  <img
                    :src="getImageByName('linkedin')"
                    width="24px"
                    alt="Linkedin"
                  />
                </template>
              </InputText>
            </v-col>
            <v-col cols="12">
              <InputText
                v-model="model.instagram"
                placeholder="Escribe la URL de tu perfil o enlace a Instagram"
                name="Instagram"
                rules="url"
              >
                <template #prepend-inner>
                  <img
                    :src="getImageByName('instagram')"
                    width="24px"
                    alt="Instagram"
                  />
                </template>
              </InputText>
            </v-col>
            <v-col cols="12">
              <InputText
                v-model="model.youtube"
                placeholder="Escribe la URL de tu perfil o enlace a YouTube"
                name="YouTube"
                rules="url"
              >
                <template #prepend-inner>
                  <img
                    :src="getImageByName('youtube')"
                    width="24px"
                    alt="YouTube"
                  />
                </template>
              </InputText>
            </v-col>
            <v-col cols="12">
              <InputText
                v-model="model.tiktok"
                placeholder="Escribe la URL de tu perfil o enlace a TikTok"
                name="TikTok"
                rules="url"
              >
                <template #prepend-inner>
                  <img
                    :src="getImageByName('tiktok')"
                    width="24px"
                    alt="TikTok"
                  />
                </template>
              </InputText>
            </v-col>
            <v-col cols="12">
              <InputText
                v-model="model.discord"
                placeholder="Escribe la URL de tu perfil o enlace a Discord"
                name="Discord"
                rules="url"
              >
                <template #prepend-inner>
                  <img
                    :src="getImageByName('discord')"
                    width="24px"
                    alt="Discord"
                  />
                </template>
              </InputText>
            </v-col>
            <v-col cols="12">
              <InputText
                v-model="model.website"
                placeholder="Escribe la URL de tu perfil o enlace a tu sitio web"
                name="Sitio web"
                rules="url"
              >
                <template #prepend-inner>
                  <img
                    :src="getImageByName('website')"
                    width="24px"
                    alt="Sitio web"
                  />
                </template>
              </InputText>
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
