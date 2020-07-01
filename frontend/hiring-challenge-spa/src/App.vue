<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-icon large>mdi-monitor-star</v-icon>

        <v-subheader>
          <h2>Most starred Github repos</h2>
        </v-subheader>
      </div>
    </v-app-bar>

    <v-main>
      <search-repos></search-repos>
    </v-main>
  </v-app>
</template>

<script>
import SearchRepos from "./components/Main";

export default {
  name: "App",

  components: {
    SearchRepos
  },

  data: () => ({
    //
  })
};
</script>
