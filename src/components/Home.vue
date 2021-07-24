<template>
  <v-container v-if="current.manifest">
    <v-container>
      <v-row>
        <v-col>
          <h1>Home</h1>
        </v-col>
        <v-col class="centerChildren">
          <v-btn color="primary" style="margin-left: auto" @click.stop="addApp">
            Add New App
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <app-chip
        @delApp="deleteApp"
        v-for="manifest in manifests"
        :key="manifest.uuid"
        :current.sync="current"
        :app="manifest"
      ></app-chip>
    </v-container>

    <v-container>
      <v-btn
        class="mr-4"
        :color="editorTab === 'all' ? 'primary' : 'default'"
        small
        @click.stop="editorTab = 'all'"
      >
        All
      </v-btn>
      <v-btn
        class="mr-4"
        :color="editorTab === 'profile' ? 'primary' : 'default'"
        small
        @click.stop="editorTab = 'profile'"
      >
        Profile
      </v-btn>
      <v-btn
        class="mr-4"
        :color="editorTab === 'plans' ? 'primary' : 'default'"
        small
        @click.stop="editorTab = 'plans'"
      >
        Plans
      </v-btn>
      <v-btn
        class="mr-4"
        :color="editorTab === 'callbacks' ? 'primary' : 'default'"
        small
        @click.stop="editorTab = 'callbacks'"
      >
        Callbacks
      </v-btn>
      <v-btn
        class="mr-4"
        :color="editorTab === 'webhooks' ? 'primary' : 'default'"
        small
        @click.stop="editorTab = 'webhooks'"
      >
        Webhooks
      </v-btn>
    </v-container>

    <v-container>
      <v-divider class="mt-3"></v-divider>
    </v-container>

    <editor :app="current.manifest" :editorTab="editorTab"></editor>

    <v-container>
      <add-app :show.sync="showAddApp" @addApp:ok="getApps"></add-app>
      <delete-app
        :show.sync="showDeleteApp"
        :app="targetApp"
        @delApp:ok="getApps"
      ></delete-app>
    </v-container>
  </v-container>
</template>

<script>
import AddApp from "./AddApp.vue";
import DeleteApp from "./DeleteApp.vue";

import AppChip from "./AppChip.vue";
import Editor from "./Editor.vue";

export default {
  name: "Home",
  components: {
    AddApp,
    DeleteApp,
    AppChip,
    Editor,
  },
  async created() {
    await this.getApps();
  },
  data: () => ({
    editorTab: "all",
    manifests: [],
    chips: [],
    current: {
      uuid: null,
      manifest: null,
    },
    showAddApp: false,
    showDeleteApp: false,
    targetApp: {
      uuid: null,
      name: null,
    },
  }),
  methods: {
    addApp() {
      this.showAddApp = true;
    },
    deleteApp(app) {
      this.targetApp.uuid = app.uuid;
      this.targetApp.name = app.name;
      this.showDeleteApp = true;
    },
    getApps() {
      return fetch("https://duda.ejmorgan.com/8082/api/apps").then(
        async (res) => {
          const ok = res.ok;
          const reply = await res.json();

          if (!ok) {
            return console.error(reply.message);
          }

          this.manifests = reply.message;
          this.current.uuid = this.manifests[0].uuid ?? null;
          this.current.manifest = this.manifests[0] ?? null;
        }
      );
    },
  },
};
</script>

<style scoped>
.centerChildren {
  display: flex;
  align-items: center;
  flex-direction: row;
}
</style>