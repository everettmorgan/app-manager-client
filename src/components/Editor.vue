<template>
  <v-container>
    <profile
      v-if="editorTab === 'all' || editorTab === 'profile'"
      :profiles="app.app_profile"
      :supported_locales="app.supported_locales"
    ></profile>

    <plans
      v-if="editorTab === 'all' || editorTab === 'plans'"
      :plans="app.app_plans"
    ></plans>

    <callbacks
      v-if="editorTab === 'all' || editorTab === 'callbacks'"
      :callbacks="{
        install: app.installation_endpoint,
        uninstall: app.uninstallation_endpoint,
        updowngrade: app.updowngrade_installation_endpoint,
        sso: app.base_sso_url,
      }"
    ></callbacks>

    <webhooks v-if="editorTab === 'all' || editorTab === 'webhooks'"></webhooks>

    <v-menu open-on-hover top offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="secondary"
          large
          fixed
          bottom
          right
          dark
          v-bind="attrs"
          v-on="on"
        >
          Actions
        </v-btn>
      </template>
      <v-list dense>
        <v-list-item
          v-for="(item, index) in [
            'Commit',
            'Diff',
            'Save',
            'Restore',
            'Preview',
          ]"
          :key="index"
          style="cursor: pointer"
        >
          <v-list-item-title>{{ item }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-container>
</template>

<script>
import Plans from "./Plans.vue";
import Profile from "./Profile.vue";
import Webhooks from "./Webhooks.vue";
import Callbacks from "./Callbacks.vue";

export default {
  name: "Editor",
  components: {
    Plans,
    Profile,
    Callbacks,
    Webhooks,
  },
  props: {
    app: Object,
    editorTab: String,
  },
  data: () => ({}),
};
</script>

<style scoped>
.plan-profile-name {
  padding-bottom: 15px;
}
</style>