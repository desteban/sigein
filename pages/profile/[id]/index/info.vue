<script setup lang="ts">
  import type { ComputedRef } from 'vue'
  import type { LocationInfo } from '~/implementation/classes/LocationInfo'
  import type { IProfile } from '~/implementation/interfaces/IProfile'
  import type { IPerson } from '~/implementation/interfaces/IPerson'
  import { Person } from '~/implementation/classes/Person'
  import type { IStringIndexed } from '~/implementation/interfaces/IStringIndexed'
  import type { ILocationInfo } from '~/implementation/interfaces/ILocationInfo'

  const props = withDefaults(
    defineProps<{ modelValue: IPerson; onlyRead: boolean }>(),
    {
      modelValue: () => new Person(),
      onlyRead: true
    }
  )

  const registerDialog = ref<boolean>(false)
  const registerPersonalInfoDialog = ref<boolean>(false)
  const registerLocationInfoDialog = ref<boolean>(false)

  type PersonWithIndexSignature = IPerson & IStringIndexed
  const person: ComputedRef<PersonWithIndexSignature> = computed(
    () => props.modelValue
  )
  const identification: ComputedRef<string> = computed(() =>
    [person.value.identification_type?.name, person.value.identification]
      .filter(x => x)
      .join('')
  )
  const locationInfo: ComputedRef<LocationInfo> = computed(
    () => person.value.location_info
  )
  const profile: ComputedRef<IProfile> = computed(() => person.value.profile)

  const savedItem = (serverItem: IProfile) => {
    person.value.profile = serverItem
  }

  const savedLocationInfoItem = (serverItem: ILocationInfo) => {
    person.value.location_info = serverItem
  }

  const savedPersonItem = (serverItem: Partial<PersonWithIndexSignature>) => {
    Object.keys(serverItem).forEach(key => {
      if (serverItem[key] !== undefined) {
        person.value[key] = serverItem[key]!
      }
    })
  }
</script>

<template>
  <ProfileAboutMeForm
    v-model="registerDialog"
    :person-id="person.id"
    :profile-id="profile.id"
    @saved="savedItem"
  />
  <PersonPersonalInfoForm
    v-model="registerPersonalInfoDialog"
    :person-id="person.id"
    @saved="savedPersonItem"
  />
  <PersonLocationInfoForm
    v-model="registerLocationInfoDialog"
    :person-id="person.id"
    :location-info-id="locationInfo.id"
    @saved="savedLocationInfoItem"
  />
  <v-row class="mt-4">
    <v-col cols="12" md="5">
      <v-hover v-slot="{ isHovering, props }">
        <v-card v-bind="props" variant="outlined" class="bg-surface">
          <v-card-title class="bg-primary">
            <div class="d-flex justify-space-between">
              <h4 class="text-h6 align-self-center">
                <v-icon icon="mdi-card-account-details-outline" class="mr-2" />
                Datos Personales
              </h4>
              <div v-if="!onlyRead" style="width: 34px">
                <v-fab
                  icon
                  border
                  color="warning"
                  :active="!!isHovering"
                  density="comfortable"
                  @click="registerPersonalInfoDialog = true"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-fab>
              </div>
            </div>
          </v-card-title>
          <v-list lines="two" density="comfortable">
            <v-list-item :title="person.type" subtitle="Tipo de persona" />
            <v-list-item :title="identification" subtitle="Identificación" />
            <v-list-item
              :title="person.business_name ?? ''"
              subtitle="Nombre o Razon social"
            />
          </v-list>
        </v-card>
      </v-hover>
      <v-hover v-slot="{ isHovering, props }">
        <v-card v-bind="props" variant="outlined" class="bg-surface mt-5">
          <v-card-title class="bg-primary">
            <div class="d-flex justify-space-between">
              <h4 class="text-h6 align-self-center">
                <v-icon icon="mdi-map-marker-radius-outline" class="mr-2" />
                Datos de ubicación
              </h4>
              <div v-if="!onlyRead" style="width: 34px">
                <v-fab
                  icon
                  border
                  color="warning"
                  :active="!!isHovering"
                  density="comfortable"
                  @click="registerLocationInfoDialog = true"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-fab>
              </div>
            </div>
          </v-card-title>
          <v-list lines="two" density="comfortable">
            <v-list-item subtitle="Celular">
              <template
                v-if="
                  locationInfo.phone_iso &&
                  locationInfo.phone_dial &&
                  locationInfo.phone_number
                "
                #title
              >
                <span :class="`fi fi-${locationInfo.phone_iso} pt-1`" />
                {{ `+${locationInfo.phone_dial} ${locationInfo.phone_number}` }}
              </template>
            </v-list-item>
            <v-list-item
              :title="
                [
                  locationInfo?.city?.name,
                  locationInfo?.state?.name,
                  locationInfo?.country?.name
                ]
                  .filter(x => x)
                  .join(', ')
              "
              subtitle="Ciudad de residencia"
            />
            <v-list-item
              :title="
                [
                  locationInfo.postal_code
                    ? `(${locationInfo.postal_code})`
                    : '',
                  locationInfo.address
                ]
                  .filter(x => x)
                  .join(' ')
              "
              subtitle="Domicilio"
            />
          </v-list>
        </v-card>
      </v-hover>
    </v-col>
    <v-col cols="12" md="7">
      <v-hover v-slot="{ isHovering, props }">
        <v-card v-bind="props" variant="outlined" class="bg-surface">
          <v-card-title class="bg-primary">
            <div class="d-flex justify-space-between">
              <h4 class="text-h6 align-self-center">
                <v-icon icon="mdi-text-account" class="mr-2" />
                Acerca de mí
              </h4>
              <div v-if="!onlyRead" style="width: 34px">
                <v-fab
                  icon
                  border
                  color="warning"
                  :active="!!isHovering"
                  density="comfortable"
                  @click="registerDialog = true"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-fab>
              </div>
            </div>
          </v-card-title>
          <v-card-text v-if="profile.title || profile.biography" class="pa-6">
            <div v-if="profile.title" class="text-h6 title">
              <v-icon icon="mdi-school-outline" class="mr-2 pb-1" />
              {{ profile.title }}
            </div>
            <p class="text-subtitle-1 textSecondary mt-3">
              {{ profile.biography }}
            </p>
          </v-card-text>
          <v-card-text v-else class="text-disabled text-h5 py-6 text-center">
            No se ha registrado información
          </v-card-text>
        </v-card>
      </v-hover>
    </v-col>
  </v-row>
</template>
