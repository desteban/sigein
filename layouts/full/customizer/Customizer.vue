<script setup lang="ts">
  const customizer = useCustomizerStore()

  // themes color options
  const themeColors = ref([
    {
      name: 'BLUE_THEME',
      bg: 'themeBlue'
    },
    {
      name: 'AQUA_THEME',
      bg: 'themeAqua'
    },
    {
      name: 'PURPLE_THEME',
      bg: 'themePurple'
    },
    {
      name: 'GREEN_THEME',
      bg: 'themeGreen'
    },
    {
      name: 'CYAN_THEME',
      bg: 'themeCyan'
    },
    {
      name: 'ORANGE_THEME',
      bg: 'themeOrange'
    }
  ])

  // Dark Theme Colors
  const DarkthemeColors = ref([
    { name: 'DARK_BLUE_THEME', bg: 'themeDarkBlue' },
    { name: 'DARK_AQUA_THEME', bg: 'themeDarkAqua' },
    { name: 'DARK_PURPLE_THEME', bg: 'themeDarkPurple' },
    { name: 'DARK_GREEN_THEME', bg: 'themeDarkGreen' },
    { name: 'DARK_CYAN_THEME', bg: 'themeDarkCyan' },
    { name: 'DARK_ORANGE_THEME', bg: 'themeDarkOrange' }
  ])
</script>

<!------------------------------------->
<!-- Customizer -->
<!------------------------------------->
<template>
  <div class="pa-6">
    <h5 class="text-h5">Configuraciones visuales</h5>
  </div>
  <v-divider />
  <perfect-scrollbar style="height: calc(100vh - 90px)">
    <div class="pa-6">
      <h6 class="text-h6 mb-4">Color de tema claro</h6>
      <v-item-group v-model="customizer.actTheme" mandatory class="ml-n2 v-row">
        <v-col
          v-for="theme in themeColors"
          :key="theme.name"
          cols="4"
          class="pa-2"
        >
          <v-item v-slot="{ isSelected, toggle }" :value="theme.name">
            <v-sheet
              rounded="md"
              class="border cursor-pointer d-block text-center px-5 py-4 hover-btns"
              elevation="9"
              @click="toggle"
            >
              <v-avatar :class="theme.bg" size="25">
                <v-icon v-if="isSelected" icon="mdi-check" color="white" />
              </v-avatar>
            </v-sheet>
          </v-item>
        </v-col>
      </v-item-group>
      <h6 class="text-h6 mt-8 mb-4">Color de tema oscuro</h6>
      <v-item-group v-model="customizer.actTheme" mandatory class="ml-n2 v-row">
        <v-col
          v-for="theme in DarkthemeColors"
          :key="theme.name"
          cols="4"
          class="pa-2"
        >
          <v-item v-slot="{ isSelected, toggle }" :value="theme.name">
            <v-sheet
              rounded="md"
              class="border cursor-pointer d-block text-center px-5 py-4 hover-btns"
              elevation="9"
              @click="toggle"
            >
              <v-avatar :class="theme.bg" size="25">
                <v-icon v-if="isSelected" icon="mdi-check" color="white" />
              </v-avatar>
            </v-sheet>
          </v-item>
        </v-col>
      </v-item-group>
      <h6 class="text-h6 mt-11 mb-2">Ancho del contenido</h6>
      <v-btn-toggle
        v-model="customizer.boxed"
        color="primary"
        class="my-2 btn-group-custom gap-3"
        rounded="0"
        group
      >
        <v-btn :value="true" variant="text" elevation="9" class="rounded-md">
          <LayoutDistributeVerticalIcon
            stroke-width="1.5"
            size="21"
            class="mr-2 icon"
          />
          Centro
        </v-btn>
        <v-btn :value="false" variant="text" elevation="9" class="rounded-md">
          <LayoutDistributeHorizontalIcon
            stroke-width="1.5"
            size="21"
            class="mr-2 icon"
          />
          Total
        </v-btn>
      </v-btn-toggle>
    </div>
  </perfect-scrollbar>
</template>
