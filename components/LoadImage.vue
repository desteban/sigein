<script setup lang="ts">
  import VuePictureCropper, { cropper } from 'vue-picture-cropper'

  const props = withDefaults(
    defineProps<{
      isCropper?: boolean
      btnText?: string
      btnColor?: string
      btnDensity?: string
      dragMode?: 'crop' | 'move' | 'none'
      presetMode?: 'fixedSize' | 'round'
      presetWidth?: number
      presetHeight?: number
      aspectRatio?: number
      resizable?: boolean
      active?: boolean
    }>(),
    {
      isCropper: true,
      btnText: '',
      btnColor: 'primary',
      btnDensity: 'comfortable',
      dragMode: 'crop',
      presetMode: 'fixedSize',
      presetWidth: 300,
      presetHeight: 300,
      aspectRatio: 1,
      resizable: true,
      active: true
    }
  )
  const emit = defineEmits<(event: 'returnImage', value: File) => void>()
  const dialog = ref<boolean>(false)
  const pic = ref<string>('')
  const originalName = ref<string>('')
  const uploadInput = ref<HTMLInputElement | null>(null)
  const file = ref<File | null>(null)
  const result = reactive({
    dataURL: '',
    blobURL: ''
  })

  const selectFile = (e: Event) => {
    originalName.value = ''
    pic.value = ''
    result.dataURL = ''
    result.blobURL = ''
    const { files } = e.target as HTMLInputElement
    if (files?.length) {
      const [selectedFile] = files
      ;[file.value, originalName.value] = [
        selectedFile,
        selectedFile.name.split('.')[0]
      ]
      const reader = new FileReader()
      reader.readAsDataURL(file.value)
      reader.onload = () => {
        pic.value = String(reader.result)
        dialog.value = true
        if (!uploadInput.value) return
        uploadInput.value.value = ''
      }
    }
  }

  const getResult = async () => {
    if (!props.isCropper) {
      if (file.value) {
        emit('returnImage', file.value)
        dialog.value = false
      }
    } else if (cropper) {
      const temporalFile = await cropper.getFile({
        fileName: `${originalName.value}-cropped`
      })
      if (temporalFile) emit('returnImage', temporalFile)
      dialog.value = false
    }
  }

  const LoadImage = () => {
    if (!uploadInput.value) return
    uploadInput.value.click()
  }
</script>

<template>
  <v-fab :active="props.active" icon color="warning" border @click="LoadImage">
    <v-icon>mdi-pencil</v-icon>
    <input
      ref="uploadInput"
      type="file"
      accept="image/jpg, image/jpeg, image/png, image/gif"
      style="display: none"
      @change="selectFile"
    />
  </v-fab>
  <v-dialog
    v-model="dialog"
    scrollable
    persistent
    width="auto"
    min-width="400"
    max-width="900"
  >
    <v-card>
      <v-toolbar>
        <v-toolbar-title style="flex: none">
          <v-icon>mdi-image-edit-outline</v-icon>
          {{ props.isCropper ? 'Ajustar' : 'Visualizar' }} imagen
        </v-toolbar-title>
        <v-spacer />
        <v-btn icon="mdi-close" @click="dialog = false" />
      </v-toolbar>
      <v-card-text>
        <VuePictureCropper
          v-if="props.isCropper"
          :box-style="{
            width: '100%',
            height: '100%',
            backgroundColor: '#f8f8f8',
            margin: 'auto'
          }"
          :img="pic"
          :options="{
            viewMode: 1,
            dragMode: props.dragMode,
            aspectRatio: props.aspectRatio,
            cropBoxResizable: props.resizable
          }"
          :preset-mode="{
            mode: props.presetMode,
            width: props.presetWidth,
            height: props.presetHeight
          }"
        />
        <v-img v-else-if="pic" width="900" :src="pic" />
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click="getResult"> Aceptar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
