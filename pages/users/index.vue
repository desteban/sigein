<script setup lang="ts">
  import { ref } from 'vue'
  import DataTable from '~/components/dataTable/DataTable.vue'
  import type { IHeader } from '~/components/dataTable/IHeader'
  import { Header } from '@/components/dataTable/Header'
  import type { IUser } from '@/implementation/interfaces/IUser'
  import { User } from '@/implementation/classes/User'
  import RegistrationDialog from '@/components/users/RegistrationDialog.vue'
  import DialogDelete from '~/components/DialogDelete.vue'
  import DialogConfirm from '~/components/DialogConfirm.vue'

  const api = useApi()
  const { snackbar } = useSnackbar()

  const headers = ref<IHeader[]>([
    new Header({ title: 'Nombre', key: 'name' }),
    new Header({ title: 'Correo', key: 'email' }),
    new Header({ title: 'Roles', key: 'roles' }),
    new Header({ title: 'Actions', key: 'actions', align: 'end' })
  ])
  const tableRef = ref<InstanceType<typeof DataTable> | null>(null)
  const selectedItem = ref<IUser>(new User())
  const registerDialog = ref<boolean>(false)
  const deleteDialog = ref<boolean>(false)
  const resetPasswordDialog = ref<boolean>(false)

  const editItem = (item: IUser) => {
    selectedItem.value = item
    registerDialog.value = true
  }
  const createItem = () => {
    selectedItem.value = new User()
    registerDialog.value = true
  }
  const resetPassword = (item: IUser) => {
    selectedItem.value = item
    resetPasswordDialog.value = true
  }
  const confirmedResetPassword = (confirmed: boolean = false) => {
    if (confirmed) {
      api
        .get(`users/${selectedItem.value.id}/reset-password`)
        .then(() => {
          snackbar({
            type: 'success',
            message: 'Successful user password reset!'
          })
          tableRef.value?.loadItems()
        })
        .catch(error => {
          snackbar({ type: 'error', error })
        })
        .finally(() => {
          resetPasswordDialog.value = false
        })
    }
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
  <PageTitle
    :title="$t('users.list.title')"
    :subtitle="$t('users.list.subtitle')"
  >
    <template #prepend>
      <v-avatar color="primary" size="48">
        <v-icon icon="mdi-account-group-outline" size="28" />
      </v-avatar>
    </template>
    <template #append>
      <v-btn color="primary" fab @click="createItem">
        <v-icon class="mr-1">mdi-plus</v-icon>
        {{ $t('users.list.add') }}
      </v-btn>
    </template>
  </PageTitle>
  <v-row>
    <v-col cols="12" md="12">
      <DataTable
        ref="tableRef"
        route="users"
        :headers="headers"
        :placeholder-search="$t('users.list.search')"
      >
        <template #[`item.email`]="{ item }">
          <a :href="`mailto:${item.email}`">{{ item.email }}</a>
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
            icon="mdi-reload"
            color="info"
            :text="$t('users.list.resetPassword')"
            @click="resetPassword(item)"
          />
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
  <DialogConfirm
    v-model="resetPasswordDialog"
    :title="$t('users.resetPassword.title')"
    :text="
      $t('users.resetPassword.text', {
        name: `<strong>${selectedItem.name}</strong>`
      })
    "
    @confirmed="confirmed => confirmedResetPassword(confirmed)"
  />
</template>
