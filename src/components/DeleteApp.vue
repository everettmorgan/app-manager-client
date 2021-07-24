<template>
  <v-container>
    <v-dialog v-model="show" max-width="750">
      <v-card>
        <v-card-title class="text-h5" style="word-break: break-word">
          Are you sure you want to remove "{{ app.name }}"?
        </v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            text
            @click="deleteApp"
            :loading="loading"
          >
            Delete
          </v-btn>
          <v-btn
            color="grey darken-1"
            text
            @click="$emit('update:show', false)"
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
  name: "DeleteApp",
  props: {
    name: String,
    app: Object,
    show: Boolean,
  },
  data: () => ({
    loading: false,
    rules: {
      notNull: (check) => !!check || "Required.",
    },
  }),
  methods: {
    deleteApp() {
      this.loading = true;

      const options = {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uuid: this.app.uuid,
        }),
      };

      fetch("https://duda.ejmorgan.com/8082/api/apps", options).then(
        async (res) => {
          const ok = res.ok;
          const reply = await res.json();

          if (!ok) {
            return this.$emit("delApp:error", reply.message);
          }

          this.loading = false;
          this.$emit("update:show", false);
          this.$emit("delApp:ok");
        }
      );
    },
  },
};
</script>

<style>
</style>