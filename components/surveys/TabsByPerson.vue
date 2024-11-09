<script setup lang="ts">
  import type { IPerson } from '~/implementation/interfaces/IPerson'
  import { Person } from '~/implementation/classes/Person'
  import RegistrationDialog from '~/components/surveys/RegistrationDialog.vue'
  import type { ISurvey } from '~/implementation/interfaces/ISurvey'

  const props = withDefaults(
    defineProps<{
      person: IPerson
    }>(),
    { person: () => new Person() }
  )

  const emit = defineEmits<{
    (event: 'update:modelValue', value: boolean): void
    (event: 'saved', value: ISurvey): void
  }>()

  const surveyTabs = ref<number | null>(null)
  const registerDialog = ref<boolean>(false)

  const savedItem = (saved: ISurvey) => {
    emit('saved', saved)
  }
</script>

<template>
  <v-card>
    <v-toolbar color="surface" class="px-3">
      <template #prepend>
        <v-icon icon="mdi-clipboard-list-outline" />
        <span class="title text-h5">Encuestas</span>
      </template>

      <template #append>
        <v-btn color="primary" variant="tonal" @click="registerDialog = true">
          <v-icon class="mr-1">mdi-plus</v-icon>
          Crear encuesta
        </v-btn>
      </template>

      <template #extension>
        <v-tabs v-model="surveyTabs" color="primary" grow>
          <v-tab value="apgar"> Apgar Adultos </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-window v-model="surveyTabs">
      <v-tabs-window-item value="apgar">
        <SurveysApgarList
          :surveys="person.surveys.filter(x => x.survey_type_id === 1)"
        />
      </v-tabs-window-item>
    </v-tabs-window>
    <RegistrationDialog
      v-model="registerDialog"
      :person-id="person.id"
      @saved="saved => savedItem(saved)"
    />
  </v-card>
</template>

<style scoped lang="scss"></style>
