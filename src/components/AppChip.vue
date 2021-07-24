<template>
  <v-chip
    close
    class="mr-2"
    :data-uuid="app.uuid"
    @click:close="deleteApp"
    @click.stop="$emit('update:current', { uuid: app.uuid, manifest: app })"
    :color="app.uuid === current.uuid ? 'primary' : 'default'"
  >
    {{ app.app_profile.en.app_name }}
  </v-chip>
</template>

<script>
export default {
  name: "AppChip",
  props: {
    current: Object,
    app: Object,
  },
  data: () => ({}),
  methods: {
    deleteApp() {
      this.$emit("delApp", {
        uuid: this.app.uuid,
        name: this.app.app_profile.en.app_name,
      });
    },
  },
};
</script>

<style>
</style>