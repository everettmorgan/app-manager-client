<template>
  <v-container>
    <v-row>
      <v-col cols="12" xs="12" sm="12" md="4" lg="4">
        <v-container>
          <h1>Authenticate</h1>
          <v-row>
            <v-col cols="12">
              <v-text-field
                  id="appid"
                  label="app uuid"
                  placeholder="app uuid"
                  :rules="[validateUUID]"
                  outlined>
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field
                  id="apiuser"
                  label="api user"
                  placeholder="api user"
                  :rules="[notNull]"
                  outlined>
              </v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                  id="apipass"
                  label="api pass"
                  placeholder="api pass"
                  :rules="[notNull]"
                  type="password"
                  outlined>
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-btn 
              @click="getManifest"
              block 
              color="primary">
              GO
            </v-btn>
          </v-row>
        </v-container>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="8" lg="8">
        <v-container>
          <h1>App Preview Pane</h1>
          <preview :manifest="manifest"></preview>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { validate } from 'uuid';
import fetch from 'node-fetch';

import Preview from './Preview';

  export default {
    name: 'Home',
    components: {
      Preview,
    },
    data: () => {
      return {
        rememberLogin: false,
        manifest: {},
      }
    },
    methods: {
      validateUUID(check) {
        return validate(check) || "Invalid UUID";
      },
      notNull(check) {
        return !!check || "Missing value";
      },
      getManifest() {
        const app = document.querySelector("#appid").value;
        const user = document.querySelector("#apiuser").value;
        const pass = document.querySelector("#apipass").value;
        fetch(`https://438aa7fe7d5d.ngrok.io/duda/manifest`, {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uuid: app,
            token: Buffer.from(`${user}:${pass}`).toString('base64'),
          })
        })
        .then((res) => res.json())
        .then((manifest) => this.manifest = manifest)
        .catch((error) => console.error(error));
      }
    }
  }
</script>

<style scoped>
h1 { 
  margin-bottom: 15px;
}
</style>