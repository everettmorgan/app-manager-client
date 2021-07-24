<template>
  <v-form>
    <h2>Profile</h2>
    <v-container class="ps-0">
      <v-row>
        <v-col cols="6" class="">
          <v-text-field
            outlined
            label="name"
            placeholder="name"
            :value="profiles.en.app_name"
          >
          </v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            outlined
            label="logo"
            placeholder="logo"
            :value="profiles.en.app_logo"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field
            outlined
            label="short description"
            placeholder="short-description"
            :value="profiles.en.app_short_description"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-textarea
            outlined
            label="long description"
            placeholder="long-description"
            :value="profiles.en.app_long_description"
          >
          </v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-select
            v-model="supported_locales"
            :items="locales"
            item-text="long"
            item-value="abbr"
            :menu-props="{ maxHeight: '400' }"
            label="supported locales"
            multiple
            outlined
            return-object
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <v-text-field
            outlined
            label="public page"
            placeholder="public-page"
            :value="profiles.en.public_page"
          >
          </v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field
            outlined
            label="terms of service"
            placeholder="terms-of-service"
            :value="profiles.en.terms_of_service_page"
          >
          </v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field
            outlined
            label="privacy policy"
            placeholder="privacy-policy"
            :value="profiles.en.privacy_note_page"
          >
          </v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: 'Profile',
  props: {
    profiles: Object,
    supported_locales: Array,
  },
  data: () => ({
    locales: [
      { long: "English", abbr: "en" },
      { long: "Spanish", abbr: "es" },
      { long: "French", abbr: "fr" },
      { long: "Japanese", abbr: "ja" },
    ],
  })
};
</script>

<style>
</style>