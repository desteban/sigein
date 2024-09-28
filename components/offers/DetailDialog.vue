<script setup lang="ts">
  import moment from 'moment'
  import type { IOffer } from '~/implementation/interfaces/IOffer'
  import { Offer } from '~/implementation/classes/Offer'
  import type { IAccessOffer } from '~/implementation/interfaces/IAccessOffer'
  import { AccessOffer } from '~/implementation/classes/AccessOffer'

  const props = withDefaults(
    defineProps<{ offerId: number | null; modelValue: boolean }>(),
    { offerId: null, modelValue: false }
  )
  const emit = defineEmits<{
    (event: 'update:modelValue', data: boolean): void
    (event: 'saved'): void
  }>()

  const api = useApi()
  const localePath = useLocalePath()
  const authStore = useAuthStore()
  const { snackbar } = useSnackbar()

  const loading = ref<boolean>(false)
  const registerDialog = ref<boolean>(false)
  const offer = ref<IOffer | null>(null)
  const manageAccessOfferDialog = ref<boolean>(false)
  const selectedAccessOffer = ref<IAccessOffer>(new AccessOffer())

  const dialog = computed({
    get() {
      return props.modelValue
    },
    set(value: boolean) {
      emit('update:modelValue', value)
    }
  })
  const user = computed(() => authStore.user)
  const isOwner = computed(() => {
    return offer.value?.person?.id === user.value?.person?.id
  })

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
          dialog.value = false
          loading.value = false
        }, 2000)
      })
  }

  const cancelDialog = () => {
    dialog.value = false
  }

  const manageAccessOffer = (accessOffer: IAccessOffer) => {
    manageAccessOfferDialog.value = true
    selectedAccessOffer.value = accessOffer
  }

  const savedOffer = () => {
    getOffer()
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
  <v-dialog v-model="dialog" :persistent="true" :fullscreen="true">
    <v-card>
      <AccessOffersManageDialog
        v-model="manageAccessOfferDialog"
        :access-offer="selectedAccessOffer"
        @saved="getOffer"
      />
      <OffersRegisterForm
        v-model="registerDialog"
        :offer-id="offer?.id"
        @saved="savedOffer"
      />
      <Loading v-model="loading" contained />
      <v-card-title class="bg-primary">
        <div class="d-flex justify-space-between">
          <div class="d-flex flex-column">
            <h4 class="text-h5 align-self-center">Detalle de oferta</h4>
            <h6>Oferta número {{ props.offerId }}</h6>
          </div>
          <div>
            <v-chip v-if="offer" color="info" variant="flat" label class="mr-2">
              {{ offer.status }}
            </v-chip>
            <v-btn variant="outlined" icon="mdi-close" @click="cancelDialog" />
          </div>
        </div>
      </v-card-title>
      <v-container v-if="offer">
        <v-row>
          <v-col cols="12">
            <div class="text-h5 pl-4">{{ offer.name }}</div>
            <v-list lines="two">
              <v-list-item subtitle="Oferente">
                <v-list-item-title class="text-wrap">
                  {{ offer?.person?.business_name ?? '' }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item subtitle="Fecha de publicación">
                <v-list-item-title class="text-wrap">{{
                  offer.start_date
                }}</v-list-item-title>
              </v-list-item>
              <v-list-item subtitle="Descripción de la oferta">
                <v-list-item-title class="text-wrap">{{
                  offer.description
                }}</v-list-item-title>
              </v-list-item>
            </v-list>
            <v-card-actions v-if="offer && isOwner" class="justify-end">
              <v-btn
                color="warning"
                variant="text"
                @click="registerDialog = true"
              >
                Editar Oferta
              </v-btn>
            </v-card-actions>
          </v-col>
          <template v-if="isOwner">
            <v-divider />
            <v-col cols="12">
              <div class="text-h6 pl-4">Gestión de accesos</div>
              <v-list lines="two">
                <template
                  v-for="(access, accessIndex) in offer.active_access_offers"
                  :key="`accessOffer${accessIndex}`"
                >
                  <v-list-item @click="true">
                    <v-list-item-title class="text-wrap">
                      <NuxtLink
                        :to="localePath(`/profile/${access.person_id}/info`)"
                        target="_blank"
                      >
                        {{ access.person?.business_name }}
                      </NuxtLink>
                    </v-list-item-title>
                    <v-list-item-subtitle class="text-wrap">{{
                      [
                        access?.person?.identification_type?.name,
                        access?.person?.identification
                      ]
                        .filter(x => x)
                        .join(' ')
                    }}</v-list-item-subtitle>
                    <v-list-item-subtitle>
                      <v-chip color="info" label variant="flat">
                        {{ access.type }}
                      </v-chip>
                      {{ moment(access.created_at).format('DD-MM-YYYY') }}
                    </v-list-item-subtitle>
                    <template #append>
                      <v-btn
                        color="primary"
                        icon="mdi-cog"
                        variant="text"
                        @click="manageAccessOffer(access)"
                      />
                    </template>
                  </v-list-item>
                  <v-divider class="ma-0" />
                </template>
              </v-list>
            </v-col>
          </template>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>
