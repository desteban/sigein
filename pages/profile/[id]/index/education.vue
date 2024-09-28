<script setup lang="ts">
  import type { IPerson } from '~/implementation/interfaces/IPerson'
  import { Person } from '~/implementation/classes/Person'
  import type { IEducation } from '~/implementation/interfaces/IEducation'

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

  const registerItem = (item: IEducation | null) => {
    if (item?.id) selectedItemId.value = item.id
    else selectedItemId.value = null
    registerDialog.value = true
  }

  const deletedItem = () => {
    if (selectedItemId.value) {
      person.value.educations = person.value.educations.filter(
        item => item.id !== selectedItemId.value
      )
    }
  }

  const savedItem = (serverItem: IEducation) => {
    const index = person.value.educations.findIndex(
      item => item.id === serverItem.id
    )
    if (index >= 0) {
      person.value.educations[index] = serverItem
    } else {
      person.value.educations.push(serverItem)
    }
  }
</script>

<template>
  <PersonEducationForm
    v-model="registerDialog"
    :person-id="person.id"
    :education-id="selectedItemId"
    @saved="savedItem"
    @deleted="deletedItem"
  />
  <v-row class="mt-4">
    <v-col cols="12">
      <v-card variant="outlined" class="bg-surface">
        <v-card-title>
          <div class="d-flex justify-space-between">
            <h4 class="text-h6 align-self-center">Education Items</h4>
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
        <v-list v-if="person.educations.length" lines="three">
          <v-list-item
            v-for="(item, itemIndex) in person.educations"
            :key="`Education${itemIndex}`"
            @click="true"
          >
            <template #prepend>
              <v-avatar size="48" color="lightsecondary">
                <v-icon color="secondary" size="32" icon="mdi-school-outline" />
              </v-avatar>
            </template>
            <v-list-item-title>
              {{
                item.education_degree
                  ? item.education_degree.name
                  : item.education_degree_text
              }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{
                item.educational_institution
                  ? item.educational_institution.business_name
                  : item.educational_institution_text
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
          No hay registros de educación
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
