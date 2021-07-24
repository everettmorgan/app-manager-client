<template>
  <v-form>
    <h2>Callbacks</h2>
    <v-container class="ps-0">
      <v-row>
        <v-col cols="6">
          <v-text-field
            outlined
            label="install"
            placeholder="install"
            :value="callbacks.install"
          >
          </v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            outlined
            label="uninstall"
            placeholder="uninstall"
            :value="callbacks.uninstall"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-text-field
            outlined
            label="updowngrade"
            placeholder="updowngrade"
            :value="callbacks.updowngrade"
          >
          </v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            outlined
            label="sso"
            placeholder="soo"
            :value="callbacks.sso"
          >
          </v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: "Callbacks",
  props: {
    callbacks: Object,
  },
  data: () => ({}),
};
</script>

<style>
</style>