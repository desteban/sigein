<script setup lang="ts">
  import { ref } from 'vue'

  import DataTable from '~/components/dataTable/DataTable.vue'
  import type { IHeader } from '~/components/dataTable/IHeader'
  import { Header } from '~/components/dataTable/Header'
  import type { IRole } from '@/implementation/interfaces/IRole'
  import { Role } from '@/implementation/classes/Role'
  import RegistrationDialog from '@/components/roles/RegistrationDialog.vue'

  const headers = ref<IHeader[]>([
    new Header({ title: 'Nombre', key: 'name' }),
    new Header({ title: 'Permisos', key: 'permissions', align: 'center' }),
    new Header({ title: 'Actions', key: 'actions', align: 'end' })
  ])
  const tableRef = ref<InstanceType<typeof DataTable> | null>(null)
  const selectedItem = ref<IRole>(new Role())
  const registerDialog = ref<boolean>(false)
  const deleteDialog = ref<boolean>(false)

  const editItem = (item: IRole) => {
    selectedItem.value = item
    registerDialog.value = true
  }
  const createItem = () => {
    selectedItem.value = new Role()
    registerDialog.value = true
  }
  const deleteItem = (item: IRole) => {
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
  <PageTitle
    :title="$t('roles.list.title')"
    :subtitle="$t('roles.list.subtitle')"
  >
    <template #prepend>
      <v-avatar color="primary" size="48">
        <v-icon icon="mdi-account-group-outline" size="28" />
      </v-avatar>
    </template>
    <template #append>
      <v-btn color="primary" fab @click="createItem">
        <v-icon class="mr-1">mdi-plus</v-icon>
        {{ $t('roles.list.add') }}
      </v-btn>
    </template>
  </PageTitle>
  <v-row>
    <v-col cols="12" md="12">
      <DataTable
        ref="tableRef"
        route="roles"
        :headers="headers"
        :placeholder-search="$t('roles.list.search')"
      >
        <template #[`item.permissions`]="{ item }">
          <v-chip color="primary" variant="elevated" label>
            {{ item.permissions.length }}
          </v-chip>
        </template>
        <template #[`item.actions`]="{ item }">
          <ActionButton
            icon="mdi-pencil"
            color="warning"
            :text="$t('roles.list.edit')"
            class="ml-2"
            @click="editItem(item)"
          />
          <ActionButton
            icon="mdi-delete"
            color="error"
            :text="$t('roles.list.delete')"
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
    :title="$t('roles.delete.title')"
    :text="$t('roles.delete.text', { name: selectedItem.name })"
    :route="`roles/${selectedItem.id}`"
    :success-message="
      $t('roles.delete.successMessage', { name: selectedItem.name })
    "
    @deleted="deletedItem"
  />
</template>
