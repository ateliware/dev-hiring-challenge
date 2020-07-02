<template>
  <v-app id="app">
    <Snackbar></Snackbar>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-btn text to="/">
          <v-icon large>mdi-monitor-star</v-icon>

          <v-subheader>
            <h2>Most Starred Github Repos</h2>
          </v-subheader>
        </v-btn>
      </div>
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
export default {
  components: {
    Snackbar
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
