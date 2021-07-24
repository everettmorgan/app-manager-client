<template>
  <v-container>
    <v-dialog v-model="show" max-width="750">
      <v-card>
        <v-card-title class="text-h5"> Add New App </v-card-title>

        <v-card-text style="padding-top: 25px; padding-bottom: 0">
          <v-form ref="addAppForm">
            <v-text-field
              id="newAppUUID"
              label="app uuid"
              placeholder="app-uuid"
              outlined
              :rules="[rules.notNull]"
            >
            </v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="addApp" :loading="loading">
            Add
          </v-btn>
          <v-btn
            color="grey darken-1"
            text
            @click.stop="$emit('update:show', false)"
          >
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "AddApp",
  props: {
    show: Boolean,
    processing: Boolean,
  },
  data: () => ({
    loading: false,
    rules: {
      notNull: (check) => !!check || "Required.",
    },
  }),
  methods: {
    addApp() {
      if (!this.$refs.addAppForm.validate()) {
        return;
      }

      this.loading = true;

      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uuid: document.querySelector("#newAppUUID").value,
        }),
      };

      fetch("https://duda.ejmorgan.com/8082/api/apps", options).then(
        async (res) => {
          const ok = res.ok;
          const reply = await res.json();

          if (!ok) {
            return this.$emit("addApp:error", reply.message);
          }

          this.loading = false;
          this.$emit("update:show", false);
          this.$refs.addAppForm.reset();
          this.$emit("addApp:ok");
        }
      );
    },
  },
};
</script>

<style>
</style>