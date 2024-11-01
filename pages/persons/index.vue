<script setup lang="ts">
  import { ref } from 'vue'

  import DataTable from '~/components/dataTable/DataTable.vue'
  import type { IHeader } from '~/components/dataTable/IHeader'
  import { Header } from '@/components/dataTable/Header'
  import type { IUser } from '@/implementation/interfaces/IUser'
  import { User } from '@/implementation/classes/User'
  import RegistrationDialog from '@/components/persons/RegistrationDialog.vue'
  import DialogDelete from '~/components/DialogDelete.vue'

  const headers = ref<IHeader[]>([
    new Header({ title: 'Identidad', key: 'identity' }),
    new Header({ title: 'Contacto', key: 'contact' }),
    new Header({ title: 'Ubicación', key: 'location' }),
    new Header({ title: 'Actions', key: 'actions', align: 'end' })
  ])
  const tableRef = ref<InstanceType<typeof DataTable> | null>(null)
  const selectedItem = ref<IUser>(new User())
  const registerDialog = ref<boolean>(false)
  const deleteDialog = ref<boolean>(false)

  const editItem = (item: IUser) => {
    selectedItem.value = item
    registerDialog.value = true
  }
  const createItem = () => {
    selectedItem.value = new User()
    registerDialog.value = true
  }
  const deleteItem = (item: IUser) => {
    selectedItem.value = item
    deleteDialog.value = true
  }
  const deletedItem = () => {
    tableRef.value?.loadItems()
  }

  const savedItem = (saved: number = 0) => {
    if (saved) tableRef.value?.loadItems()
  }
</script>

<template>
  <PageTitle title="Personas" subtitle="Gestión de personas">
    <template #prepend>
      <v-avatar color="primary" size="48">
        <v-icon icon="mdi-account-group-outline" size="28" />
      </v-avatar>
    </template>
    <template #append>
      <v-btn color="primary" fab @click="createItem">
        <v-icon class="mr-1">mdi-plus</v-icon>
        Agregar persona
      </v-btn>
    </template>
  </PageTitle>
  <v-row>
    <v-col cols="12" md="12">
      <DataTable
        ref="tableRef"
        route="persons"
        :headers="headers"
        placeholder-search="Buscar por identificación, nombre, email o teléfono"
      >
        <template #[`item.identity`]="{ item }">
          <div class="d-flex align-center">
            <v-icon
              size="32"
              :icon="`mdi-face-${item.sex === 'M' ? 'man' : 'woman'}-outline`"
            />
            <div class="ml-2">
              <h4 class="text-subtitle-1 text-no-wrap">
                {{ item.full_name }}
              </h4>
              <h6 class="text-subtitle-2 text-no-wrap textSecondary mt-1">
                {{
                  [item?.identification_type?.name, item.identification_number]
                    .filter(x => x)
                    .join(' ')
                }}
              </h6>
            </div>
          </div>
        </template>
        <template #[`item.contact`]="{ item }">
          <div class="d-flex align-center">
            <div>
              <h4 class="text-subtitle-1 text-no-wrap">
                <a :href="`mailto:${item.email}`">{{ item.email }}</a>
              </h4>
              <h4 class="text-subtitle-1 text-no-wrap mt-1">
                <a :href="`tel:${item.phone}`">{{ item.phone }}</a>
              </h4>
            </div>
          </div>
        </template>
        <template #[`item.location`]="{ item }">
          <div class="d-flex align-center">
            <div>
              <h4 class="text-subtitle-1 text-no-wrap">
                {{ item.address }}
              </h4>
              <h6 class="text-subtitle-2 text-no-wrap textSecondary mt-1">
                {{
                  [
                    item?.sector_type?.name && item?.sector?.name
                      ? `${item.sector_type.name} ${item.sector.name}`
                      : '',
                    item?.city?.name,
                    item?.state?.name
                  ]
                    .filter(x => x)
                    .join(', ')
                }}
              </h6>
            </div>
          </div>
        </template>
        <template #[`item.roles`]="{ item }">
          <v-chip
            v-for="(roleItem, roleItemIndex) in item.roles"
            :key="`roleItem${roleItemIndex}`"
            density="compact"
            color="primary"
            class="me-1"
            label
          >
            {{ roleItem.name }}
          </v-chip>
        </template>
        <template #[`item.actions`]="{ item }">
          <ActionButton
            icon="mdi-pencil"
            color="warning"
            :text="$t('users.list.edit')"
            class="ml-2"
            @click="editItem(item)"
          />
          <ActionButton
            icon="mdi-delete"
            color="error"
            :text="$t('users.list.delete')"
            class="ml-2"
            @click="deleteItem(item)"
          />
        </template>
      </DataTable>
    </v-col>
  </v-row>
  <RegistrationDialog
    v-model="registerDialog"
    :item-id="selectedItem.id"
    @saved="saved => savedItem(saved)"
  />
  <DialogDelete
    v-model="deleteDialog"
    :title="$t('users.delete.title')"
    :text="
      $t('users.delete.text', { name: `<strong>${selectedItem.name}</strong>` })
    "
    :route="`users/${selectedItem.id}`"
    :success-message="
      $t('users.delete.successMessage', { name: selectedItem.name })
    "
    @deleted="deletedItem"
  />
</template>
