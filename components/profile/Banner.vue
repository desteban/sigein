<script setup lang="ts">
  import type { AxiosResponse } from 'axios'
  import type { ComputedRef } from 'vue'
  import type { IPerson } from '~/implementation/interfaces/IPerson'
  import { Person } from '~/implementation/classes/Person'

  interface ISocialMedia {
    name: string
    icon: string
    visible: boolean
    link: string
  }

  const props = withDefaults(
    defineProps<{ modelValue: IPerson; onlyRead: boolean }>(),
    {
      modelValue: () => new Person(),
      onlyRead: true
    }
  )

  const localePath = useLocalePath()
  const api = useApi()
  const { snackbar } = useSnackbar()
  const { getImageByName } = useTypes()

  const loading = ref<boolean>(false)

  const person: ComputedRef<IPerson> = computed(() => props.modelValue)
  const headerImage: ComputedRef<string> = computed(
    () => person.value.profile.header_image || getImageByName('defaultBanner')
  )
  const avatarImage: ComputedRef<string> = computed(
    () => person.value.profile.avatar || getImageByName('defaultUser')
  )
  const socialNetworks: ComputedRef<ISocialMedia[]> = computed(() => [
    {
      name: 'facebook',
      icon: getImageByName('facebook'),
      visible: !!person.value.profile.facebook,
      link: person.value.profile.facebook ?? ''
    },
    {
      name: 'linkedin',
      icon: getImageByName('linkedin'),
      visible: !!person.value.profile.linkedin,
      link: person.value.profile.linkedin ?? ''
    },
    {
      name: 'twitter',
      icon: getImageByName('twitter'),
      visible: !!person.value.profile.twitter,
      link: person.value.profile.twitter ?? ''
    },
    {
      name: 'instagram',
      icon: getImageByName('instagram'),
      visible: !!person.value.profile.instagram,
      link: person.value.profile.instagram ?? ''
    },
    {
      name: 'youtube',
      icon: getImageByName('youtube'),
      visible: !!person.value.profile.youtube,
      link: person.value.profile.youtube ?? ''
    },
    {
      name: 'tiktok',
      icon: getImageByName('tiktok'),
      visible: !!person.value.profile.tiktok,
      link: person.value.profile.tiktok ?? ''
    },
    {
      name: 'discord',
      icon: getImageByName('discord'),
      visible: !!person.value.profile.discord,
      link: person.value.profile.discord ?? ''
    },
    {
      name: 'website',
      icon: getImageByName('website'),
      visible: !!person.value.profile.website,
      link: person.value.profile.website ?? ''
    }
  ])

  const tab = ref('')
  const items = computed(() => [
    {
      tab: 'Profile',
      icon: 'mdi-account-box-outline',
      href: `/profile/${person.value.id}/info`
    },
    {
      tab: 'Work Experience',
      icon: 'mdi-account-tie',
      href: `/profile/${person.value.id}/work-experience`
    },
    {
      tab: 'Education',
      icon: 'mdi-school-outline',
      href: `/profile/${person.value.id}/education`
    },
    {
      tab: 'Economic Activities',
      icon: 'mdi-clipboard-check-multiple-outline',
      href: `/profile/${person.value.id}/economic-activities`
    },
    {
      tab: 'Offers',
      icon: 'mdi-briefcase-outline',
      href: `/profile/${person.value.id}/offers`
    }
  ])

  const saveImage = (image: File, type: string) => {
    loading.value = true
    const formData = new FormData()
    formData.append('file', image)
    formData.append('type', type)
    api
      .request({
        method: 'post',
        url: 'persons/update-profile-files',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then((res: AxiosResponse) => {
        if (type === 'avatar') person.value.profile.avatar = res.data.data
        if (type === 'header_image')
          person.value.profile.header_image = res.data.data
      })
      .catch((error: Error) => {
        snackbar({ type: 'error', error })
      })
      .finally(() => {
        loading.value = false
      })
  }
</script>

<template>
  <v-card elevation="10" class="overflow-hidden">
    <Loading v-model="loading" contained />
    <v-hover v-slot="{ isHovering, props }">
      <div v-bind="props">
        <img :src="headerImage" alt="profile" class="w-100" />
        <div
          v-if="!onlyRead"
          style="position: absolute; right: 60px; top: 24px"
        >
          <GeneralLoadImage
            :aspect-ratio="16 / 9"
            drag-mode="none"
            :is-cropper="false"
            :active="!!isHovering"
            @return-image="image => saveImage(image, 'header_image')"
          />
        </div>
      </div>
    </v-hover>
    <div>
      <v-row class="mt-1">
        <v-col cols="12" lg="4" sm="12" class="order-sm-second">
          <div class="px-4 py-1">
            <v-row class="justify-center">
              <v-col cols="4" class="text-center">
                <v-icon icon="mdi-file-document-outline" />
                <h4 class="text-h4">938</h4>
                <h6 class="text-h6 font-weight-regular">Posts</h6>
              </v-col>
              <v-col cols="4" class="text-center">
                <v-icon icon="mdi-account-circle-outline" />
                <h4 class="text-h4">3,586</h4>
                <h6 class="text-h6 font-weight-regular">Followers</h6>
              </v-col>
              <v-col cols="4" class="text-center">
                <v-icon icon="mdi-account-check-outline" />
                <h4 class="text-h4">2,659</h4>
                <h6 class="text-h6 font-weight-regular">Following</h6>
              </v-col>
            </v-row>
          </div>
        </v-col>
        <v-col
          cols="12"
          lg="4"
          sm="12"
          class="d-flex justify-center order-sml-first"
        >
          <div class="text-center top-spacer">
            <v-hover v-slot="{ isHovering, props }">
              <div class="avatar-border" v-bind="props">
                <v-avatar size="100" class="userImage">
                  <img :src="avatarImage" width="100" alt="Mathew" />
                </v-avatar>
                <div
                  v-if="!onlyRead"
                  style="position: absolute; right: 30px; bottom: 30px"
                >
                  <GeneralLoadImage
                    :resizable="false"
                    drag-mode="move"
                    preset-mode="round"
                    :active="!!isHovering"
                    @return-image="image => saveImage(image, 'avatar')"
                  />
                </div>
              </div>
            </v-hover>
            <h5 class="text-h5 mt-3">{{ person.business_name }}</h5>
            <span class="text-h6 font-weight-regular">{{
              person.profile.title
            }}</span>
          </div>
        </v-col>
        <v-col
          cols="12"
          lg="4"
          class="d-flex align-center justify-center justify-lg-end order-sm-third"
        >
          <div
            class="d-flex align-center justify-space-between px-10 py-1 gap-3"
          >
            <template
              v-for="(socialNetwork, indexSocialNetwork) in socialNetworks"
            >
              <v-btn
                v-if="socialNetwork.visible"
                :key="`socialNetwork${indexSocialNetwork}`"
                :icon="true"
                size="x-small"
                :href="socialNetwork.link"
                target="_blank"
              >
                <img
                  :src="socialNetwork.icon"
                  width="32px"
                  :alt="`${socialNetwork.name} button`"
                />
              </v-btn>
            </template>
          </div>
        </v-col>
        <v-col md="12" class="order-sm-last">
          <v-tabs
            v-model="tab"
            color="primary"
            dark
            class="profiletab bg-grey100"
          >
            <v-tab
              v-for="item in items"
              :key="item.tab"
              :to="localePath(item.href)"
            >
              <v-icon :icon="item.icon" size="20" class="mr-1" />
              {{ item.tab }}
            </v-tab>
          </v-tabs>
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>
<style lang="scss">
  .avatar-border {
    background-image: linear-gradient(rgb(80, 178, 252), rgb(244, 76, 102));
    border-radius: 50%;
    width: 110px;
    height: 110px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin: 0 auto;

    .userImage {
      border: 4px solid rgb(255, 255, 255);
    }
  }

  .top-spacer {
    margin-top: -95px;
  }

  .profiletab .v-slide-group__content {
    justify-content: end;

    .v-btn--variant-text .v-btn__overlay {
      background: transparent;
    }
  }

  @media (max-width: 1023px) {
    .order-sm-second {
      order: 2;
    }
    .order-sml-first {
      order: 1;
    }
    .order-sm-third {
      order: 3;
    }
    .order-sm-last {
      order: 4;
    }
  }
</style>
