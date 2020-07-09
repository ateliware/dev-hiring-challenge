<template>
  <v-container>
    <v-row v-if="repositories.length" align="center" justify="center">
      <v-col xs="12" sm="12" md="8" lg="8">
        <v-card v-for="(repo, index) in repositories" :key="index" class="mb-2">
          <v-toolbar color="primary" dark>
            <v-card-title primary-title>
              <h3 class="headline mb-0">{{repo.name}}</h3>
            </v-card-title>
            <v-spacer></v-spacer>
            <v-chip outlined class="ma-3" color="white" text-color="white">
              <v-icon left>mdi-star</v-icon>
              {{repo.stargazersCount}}
            </v-chip>
            <v-divider vertical></v-divider>
            <v-chip outlined class="ma-3" color="white" text-color="white">
              <v-icon left>mdi-file-code</v-icon>
              {{repo.language}}
            </v-chip>
          </v-toolbar>

          <v-card-text>
            <div>{{repo.description}}</div>
            <div>Owner: {{repo.owner}}</div>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="warning" :href="repo.htmlUrl">More Info</v-btn>
            <v-btn color="error" @click="remove(repo)">Remove</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" align="center" class="mt-10" v-else>
      <v-alert outlined type="error">{{error}}</v-alert>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    repositories: [],
    error: "Ops, looks like you haven't saved any repositories, try to go back, search and save one. It will show up here"
  }),
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      axios.get("/repositories").then(response => {
        this.repositories = response.data;
      });
    },
    async remove(repo) {
      await axios.delete(`/repositories/${repo.id}`).then(response => {
        if (response) {
          this.$store.commit("show_message", {
            message: "Repository has been removed successfully",
            color: "success"
          });
        }
        this.repositories.splice(this.repositories.indexOf(repo), 1);
      });
    }
  }
};
</script>

<style>
</style>