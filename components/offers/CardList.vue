<script setup lang="ts">
  import type { ComputedRef } from 'vue'
  import type { IOffer } from '~/implementation/interfaces/IOffer'
  import { Offer } from '~/implementation/classes/Offer'
  import type { IPerson } from '~/implementation/interfaces/IPerson'
  import type { IAccessOffer } from '~/implementation/interfaces/IAccessOffer'

  const props = withDefaults(
    defineProps<{
      offer: IOffer
      readonly?: boolean
    }>(),
    { offer: () => new Offer(), readonly: false }
  )
  const emit = defineEmits<{
    (event: 'showDetail'): void
    (event: 'requestDetail'): void
  }>()

  const authStore = useAuthStore()

  const isOwner: ComputedRef<boolean> = computed(() => {
    return authStore.user?.person?.id === props.offer.id
  })
  const person: ComputedRef<IPerson | null> = computed(() => props.offer.person)
  const activesAccess: ComputedRef<IAccessOffer[]> = computed(
    () => props.offer.active_access_offers
  )
  const statusAccessOffer: ComputedRef<string> = computed(() =>
    activesAccess.value.length && activesAccess.value[0]?.type
      ? activesAccess.value[0].type
      : ''
  )
</script>

<template>
  <v-card class="rounded-lg">
    <v-list>
      <v-list-item>
        <template #prepend>
          <v-avatar color="grey">
            <v-icon icon="mdi-briefcase" />
          </v-avatar>
        </template>
        <v-list-item-title class="text-h6" style="white-space: normal">
          {{ props.offer.name }}
        </v-list-item-title>
        <v-list-item-subtitle style="-webkit-box-orient: inherit">
          {{ props.offer.start_date }}
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>
    <v-divider class="ma-0" />
    <v-card-text>
      {{ props.offer.summary }}
    </v-card-text>
    <v-list v-if="person">
      <v-list-item>
        <template #prepend>
          <v-avatar color="secondary">
            <v-icon
              :icon="
                person.type === 'natural' ? 'mdi-account' : 'mdi-bank-outline'
              "
            />
          </v-avatar>
        </template>
        <v-list-item-title class="text-h6" style="white-space: normal">
          {{ person.business_name }}
        </v-list-item-title>
        <v-list-item-subtitle> Oferente </v-list-item-subtitle>
      </v-list-item>
    </v-list>
    <v-card-actions v-if="!readonly">
      <template v-if="activesAccess.length">
        <v-chip
          v-if="statusAccessOffer === 'detailRequested'"
          variant="tonal"
          color="warning"
          :label="true"
        >
          Solicitud de detalle enviada
        </v-chip>
        <v-btn
          v-if="statusAccessOffer === 'fullDetail' || isOwner"
          color="primary"
          class="text-capitalize"
          variant="tonal"
          @click="emit('showDetail')"
        >
          Ver Oferta
        </v-btn>
      </template>
      <v-btn
        v-else
        target="_blank"
        color="primary"
        class="text-capitalize"
        variant="tonal"
        @click="emit('requestDetail')"
      >
        Solicitar detalle
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
