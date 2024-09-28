<script setup lang="ts">
  import type { IOffer } from '~/implementation/interfaces/IOffer'

  definePageMeta({
    layout: 'default'
  })

  const api = useApi()
  const { snackbar } = useSnackbar()

  const offers = ref<IOffer[]>([])
  const page = ref<number>(0)
  const totalItemsServer = ref<number | null>(null)
  const perPage = ref<number>(10)
  const selectedItemId = ref<number | null>(null)
  const detailDialog = ref<boolean>(false)
  const requestDetailDialog = ref<boolean>(false)

  const getItems = async (): Promise<IOffer[]> => {
    return new Promise(resolve => {
      api
        .get('offers', {
          params: {
            page: page.value,
            per_page: perPage.value
          }
        })
        .then(({ data }) => {
          totalItemsServer.value = data?.total || 0
          resolve(data?.data || [])
        })
        .catch((error: any) => {
          snackbar({ type: 'error', error })
          resolve([])
        })
    })
  }

  const loadItems = async ({ done }) => {
    if (
      totalItemsServer.value === null ||
      offers.value.length < totalItemsServer.value
    ) {
      page.value += 1
      const items: IOffer[] = await getItems()
      offers.value.push(...items)
      done('ok')
    } else {
      done('empty')
    }
  }

  const showDetail = (offer: IOffer) => {
    selectedItemId.value = offer.id
    detailDialog.value = true
  }

  const replaceOffer = (offer: IOffer) => {
    const index = offers.value.findIndex(o => o.id === offer.id)
    if (index !== -1) {
      offers.value.splice(index, 1, offer)
    }
  }

  const requestDetail = (offer: IOffer) => {
    selectedItemId.value = offer.id
    requestDetailDialog.value = true
  }
</script>

<template>
  <OffersDetailDialog
    v-model="detailDialog"
    :offer-id="selectedItemId"
    @saved="getItems"
  />
  <OffersRequestDetailDialog
    v-model="requestDetailDialog"
    :offer-id="selectedItemId"
    @requested="replaceOffer"
  />
  <v-container style="max-width: 900px">
    <v-row>
      <v-infinite-scroll
        height="100%"
        width="100%"
        :items="offers"
        @load="loadItems"
      >
        <template
          v-for="(offer, offersIndex) in offers"
          :key="`offer${offersIndex}`"
        >
          <v-col cols="12">
            <OffersCardList
              :offer="offer"
              @show-detail="showDetail(offer)"
              @request-detail="requestDetail(offer)"
            />
          </v-col>
        </template>
        <template #empty>
          <v-icon icon="mdi-folder-hidden" class="mr-2" />
          No hay {{ totalItemsServer ? 'más' : '' }} registros de ofertas
          disponibles
        </template>
      </v-infinite-scroll>
    </v-row>
  </v-container>
</template>
