<script setup lang="ts">
  import type { IPerson } from '~/implementation/interfaces/IPerson'
  import { Person } from '~/implementation/classes/Person'
  import type { IPersonEconomicActivity } from '~/implementation/interfaces/IPersonEconomicActivity'

  const props = withDefaults(
    defineProps<{ modelValue: IPerson; onlyRead: boolean }>(),
    {
      modelValue: () => new Person(),
      onlyRead: true
    }
  )

  const registerDialog = ref(false)
  const selectedItemId = ref<number | null>(null)

  const person: ComputedRef<IPerson> = computed(() => props.modelValue)

  const registerItem = (item: IPersonEconomicActivity | null) => {
    if (item?.id) selectedItemId.value = item.id
    else selectedItemId.value = null
    registerDialog.value = true
  }

  const deletedItem = () => {
    if (selectedItemId.value) {
      person.value.person_economic_activities =
        person.value.person_economic_activities.filter(
          item => item.id !== selectedItemId.value
        )
    }
  }

  const savedItem = (serverItem: IPersonEconomicActivity) => {
    const index = person.value.person_economic_activities.findIndex(
      item => item.id === serverItem.id
    )
    if (index >= 0) {
      person.value.person_economic_activities[index] = serverItem
    } else {
      person.value.person_economic_activities.push(serverItem)
    }
  }
</script>

<template>
  <PersonEconomicActivityForm
    v-model="registerDialog"
    :person-id="person.id"
    :person-economic-activity-id="selectedItemId"
    @saved="savedItem"
    @deleted="deletedItem"
  />
  <v-row class="mt-4">
    <v-col cols="12">
      <v-card variant="outlined" class="bg-surface">
        <v-card-title>
          <div class="d-flex justify-space-between">
            <h4 class="text-h6 align-self-center">Economic Activity Items</h4>
            <v-btn
              v-if="!onlyRead"
              icon
              color="primary"
              variant="tonal"
              @click.stop="registerItem(null)"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </div>
        </v-card-title>
        <v-list v-if="person.person_economic_activities.length" lines="three">
          <v-list-item
            v-for="(item, itemIndex) in person.person_economic_activities"
            :key="`personEconomicActivity${itemIndex}`"
            @click="true"
          >
            <template #prepend>
              <v-avatar size="48" color="lightsecondary">
                <v-icon
                  color="secondary"
                  size="32"
                  icon="mdi-clipboard-check-outline"
                />
              </v-avatar>
            </template>
            <v-list-item-title v-if="item.economic_activity">
              <strong>({{ item.economic_activity.code }})</strong>
              {{ item.economic_activity.name }}
            </v-list-item-title>
            <v-list-item-subtitle class="mt-1">
              Desde: {{ item.start_date }}
            </v-list-item-subtitle>
            <template v-if="!onlyRead" #append>
              <v-btn
                color="warning"
                icon="mdi-pencil"
                variant="tonal"
                @click="registerItem(item)"
              />
            </template>
          </v-list-item>
        </v-list>
        <v-card-text
          v-else
          class="text-center text-disabled font-weight-semibold text-h4"
        >
          <v-icon icon="mdi-folder-hidden" />
          No hay registros de actividades económicas
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
