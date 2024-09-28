<script setup lang="ts">
  import type { IPerson } from '~/implementation/interfaces/IPerson'
  import { Person } from '~/implementation/classes/Person'
  import type { IWorkExperience } from '~/implementation/interfaces/IWorkExperience'

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

  const registerItem = (item: IWorkExperience | null) => {
    if (item?.id) {
      selectedItemId.value = item.id
      registerDialog.value = true
    } else {
      selectedItemId.value = null
      registerDialog.value = true
    }
  }

  const deletedItem = () => {
    if (selectedItemId.value) {
      person.value.work_experiences = person.value.work_experiences.filter(
        item => item.id !== selectedItemId.value
      )
    }
  }

  const savedItem = (serverItem: IWorkExperience) => {
    const index = person.value.work_experiences.findIndex(
      item => item.id === serverItem.id
    )
    if (index >= 0) {
      person.value.work_experiences[index] = serverItem
    } else {
      person.value.work_experiences.push(serverItem)
    }
  }
</script>

<template>
  <PersonWorkExperienceForm
    v-model="registerDialog"
    :person-id="person.id"
    :experience-id="selectedItemId"
    @saved="savedItem"
    @deleted="deletedItem"
  />
  <v-row class="mt-4">
    <v-col cols="12">
      <v-card variant="outlined" class="bg-surface">
        <v-card-title>
          <div class="d-flex justify-space-between">
            <h4 class="text-h6 align-self-center">Work Experience Items</h4>
            <div v-if="!onlyRead" style="width: 48px">
              <v-btn
                icon
                color="primary"
                variant="tonal"
                @click.stop="registerItem(null)"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </div>
          </div>
        </v-card-title>
        <v-list v-if="person.work_experiences.length" lines="three">
          <v-list-item
            v-for="(item, itemIndex) in person.work_experiences"
            :key="`WE${itemIndex}`"
            @click="true"
          >
            <template #prepend>
              <v-avatar size="48" color="lightsecondary">
                <v-icon color="secondary" size="32" icon="mdi-account-tie" />
              </v-avatar>
            </template>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            <v-list-item-subtitle>
              {{
                item.company ? item.company.business_name : item.company_text
              }}
            </v-list-item-subtitle>
            <v-list-item-subtitle class="mt-1">
              Desde:
              {{
                [item.start_date, item.end_date]
                  .filter(x => x)
                  .join(' hasta el: ')
              }}
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
          No hay registros de experiencia laboral
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
