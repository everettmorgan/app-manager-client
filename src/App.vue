<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark>
      <v-toolbar-title><b>App Manager</b></v-toolbar-title>
    </v-app-bar>
    <router-view id="view"></router-view>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data: () => ({
    //
  }),
};
</script>

<style>
#view {
  margin-top: 75px;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>