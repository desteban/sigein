<script setup lang="ts">
  import type { IApgarQuestion } from '~/implementation/interfaces/survey/apgar/IApgarQuestion'

  const props = withDefaults(
    defineProps<{
      modelValue: IApgarQuestion[]
    }>(),
    { modelValue: () => [] }
  )

  const emit = defineEmits<{
    (event: 'update:modelValue', value: IApgarQuestion[]): void
  }>()

  const { getApgarSurveyQuestions } = useSurvey()

  const loading = ref<boolean>(false)
  const apgarQuestions = ref<IApgarQuestion[]>([])

  watch(
    () => apgarQuestions.value,
    newValue => {
      emit('update:modelValue', newValue)
    },
    { deep: true, immediate: true }
  )
  onMounted(async () => {
    loading.value = true
    apgarQuestions.value = await getApgarSurveyQuestions()
    loading.value = false
  })
</script>

<template>
  <v-card variant="outlined" color="primary">
    <Loading v-model="loading" contained overlay-color="light" />
    <v-toolbar color="surface" class="px-3">
      <template #prepend>
        <v-icon icon="mdi-clipboard-list-outline" />
        <span class="title">Preguntas Apgar Adultos</span>
      </template>
    </v-toolbar>
    <v-card-text class="pa-4">
      <v-table v-if="apgarQuestions.length">
        <tbody>
          <tr
            v-for="(question, questionIndex) in apgarQuestions"
            :key="`apgarQuestion${questionIndex}`"
          >
            <td>{{ questionIndex + 1 }}</td>
            <td>{{ question.question_text }}</td>
            <td width="320" class="py-2">
              <InputSelect
                v-model="question.model"
                :name="`Pregunta ${questionIndex + 1}`"
                placeholder="Seleccione la respuesta"
                :items="question.response_options"
                type-component="select"
                item-title="option_text"
                item-value="id"
                density="compact"
                rules="required"
                :clearable="false"
              />
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card-text>
  </v-card>
</template>

<style scoped lang="scss"></style>
