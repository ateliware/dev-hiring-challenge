<template>
  <v-app id="app">
    <Snackbar></Snackbar>
    <Loader></Loader>
    <v-app-bar app color="primary" dark>
      <v-btn text to="/">
        <v-icon large>mdi-monitor-star</v-icon>

        <v-toolbar-title color="primary">Most Starred Github Repos</v-toolbar-title>
      </v-btn>

      <v-spacer></v-spacer>
      <v-btn text to="/saved-repositories">Saved repositories</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Snackbar from "@/components/Snackbar.vue";
import Loader from "@/components/Loader.vue";
export default {
  components: {
    Snackbar,
    Loader
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
