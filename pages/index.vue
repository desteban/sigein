<script setup lang="ts">
  import type { IPerson } from '~/implementation/interfaces/IPerson'
  import headerImageDefault from '~/assets/images/backgrounds/profilebg.jpg'
  import userDefault from '~/assets/images/profile/userDefault.png'

  definePageMeta({
    layout: 'default'
  })

  const api = useApi()
  const { snackbar } = useSnackbar()
  const { cutText } = useUtilities()

  const persons = ref<IPerson[]>([])

  api
    .get('persons')
    .then(({ data }) => {
      persons.value = data
    })
    .catch((error: any) => {
      snackbar({ type: 'error', error })
    })
</script>

<template>
  <v-container style="max-width: 900px">
    <v-row>
      <v-col
        v-for="(person, personIndex) in persons"
        :key="`person${personIndex}`"
        cols="6"
      >
        <v-card class="rounded-lg">
          <v-img
            :src="person.profile?.header_image || headerImageDefault"
            height="200px"
            cover
          />
          <v-list>
            <v-list-item :href="`/profile/${person.id}/info`">
              <template #prepend>
                <v-avatar color="grey">
                  <v-img
                    :src="person.profile?.avatar || userDefault"
                    :alt="`avatar person ${personIndex}`"
                  />
                </v-avatar>
              </template>
              <v-list-item-title class="text-h6" style="white-space: normal">
                {{ person.business_name }}
              </v-list-item-title>
              <v-list-item-subtitle
                v-if="person?.profile?.title"
                style="-webkit-box-orient: inherit"
              >
                {{ person.profile.title }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
          <v-divider class="ma-0" />
          <v-card-text v-if="person?.profile?.biography">
            {{ cutText(person.profile.biography, 320) }}
          </v-card-text>
          <v-card-actions>
            <v-btn
              :href="`/profile/${person.id}/info`"
              color="primary"
              class="text-capitalize"
            >
              <v-icon icon="mdi-account-plus-outline" class="mr-1" size="22" />
              Conectar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
