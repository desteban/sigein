<script setup lang="ts">
  import type { ISurvey } from '~/implementation/interfaces/ISurvey'

  const props = withDefaults(
    defineProps<{
      surveys: ISurvey[]
    }>(),
    { surveys: () => [] }
  )

  const colorStatus = (status: string) => {
    switch (status) {
      case 'Activa':
        return 'warning'
      case 'Finalizada':
        return 'success'
      case 'Rechazada':
        return 'error'
      case 'Anulada':
        return 'grey'
      default:
        return 'grey'
    }
  }
</script>
<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-subtitle-1">Fecha</th>
        <th class="text-subtitle-1">Estado</th>
        <th class="text-subtitle-1">Encuestador</th>
        <th class="text-subtitle-1">Observaciones</th>
        <th class="text-subtitle-1">Resultado</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(survey, surveyIndex) in surveys"
        :key="`survey_${survey.id}_${surveyIndex}`"
      >
        <td>{{ survey.survey_date }}</td>
        <td>
          <v-chip
            v-if="survey.status"
            variant="tonal"
            label
            :color="colorStatus(survey.status)"
          >
            {{ survey.status }}
          </v-chip>
        </td>
        <td>{{ survey.surveyor?.name }}</td>
        <td>
          {{ survey.observations }}
          <template v-if="survey.rejection_reason">
            <br />
            <p class="text-error">
              <strong>Motivo:</strong> {{ survey.rejection_reason.description }}
            </p>
          </template>
        </td>
        <td>
          {{
            [
              survey.apgar_results?.total_score,
              survey.apgar_results?.interpretation
            ]
              .filter(x => x)
              .join(' => ')
          }}
        </td>
      </tr>
    </tbody>
  </v-table>
</template>
