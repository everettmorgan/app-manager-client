<template>
  <v-form ref="form" :disabled="loading">
    <v-container>
      <h1 id="header">Log in</h1>
      <v-row>
        <v-col cols="5">
          <v-text-field
            id="user"
            label="api username"
            placeholder="your-username"
            :rules="[rules.notNull]"
            outlined
          >
          </v-text-field>
        </v-col>
        <v-col cols="5">
          <v-text-field
            id="pass"
            label="api password"
            placeholder="your-password"
            :rules="[rules.notNull]"
            type="password"
            outlined
          >
          </v-text-field>
        </v-col>
        <v-col cols="2">
          <v-btn
            ref="submit"
            style="margin: 0 auto 15px auto"
            @click="login"
            color="primary"
            x-large
            :loading="loading"
          >
            SUBMIT
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { validate } from "uuid";

export default {
  name: "Login",
  data: () => ({
    user: "",
    pass: "",
    loading: false,
    rules: {
      validateUUID: (check) => validate(check) || "Invalid UUID.",
      notNull: (check) => !!check || "Required.",
    },
  }),
  methods: {
    login() {
      if (!this.$refs.form.validate()) {
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
          user: document.querySelector("#user").value,
          pass: document.querySelector("#pass").value,
          aid: this.$route.query.current_user_uuid,
        }),
      };

      fetch("https://duda.ejmorgan.com/8082/auth/login", options).then(
        async (res) => {
          if (res.ok) {
            this.$store.commit("login");
            this.$router.push({ name: "Home" });
          }
        }
      );
    },
  },
};
</script>

<style scoped>
#header {
  margin-bottom: 15px;
}
</style>