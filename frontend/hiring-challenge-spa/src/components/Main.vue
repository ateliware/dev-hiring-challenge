<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-row align="center" justify="center">
          <v-col cols="6">
            <v-combobox
              multiple
              chips
              :items="defaultLanguages"
              v-model="selectedLanguages"
              label="Select languages to search or type a new one"
              hint="Maximum of 5 tags"
            ></v-combobox>
            <v-btn color="success" @click="search(selectedLanguages)">Search Repos</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row justify="center" align="center">
      <v-col cols="8" v-for="(repos, index) in githubRepos" :key="index">
        <v-card v-for="(repo, index) in repos.items" :key="index" class="mb-2">
          <v-toolbar color="primary" dark>
            <v-card-title primary-title>
              <h3 class="headline mb-0">{{repo.name}}</h3>
            </v-card-title>
            <v-spacer></v-spacer>
            <v-chip outlined class="ma-3" color="white" text-color="white">
              <v-icon left>mdi-star</v-icon>
              {{repo.stargazers_count}}
            </v-chip>
            <v-divider vertical></v-divider>
            <v-chip outlined class="ma-3" color="white" text-color="white">
              <v-icon left>mdi-file-code</v-icon>
              {{repo.language}}
            </v-chip>
          </v-toolbar>

          <v-card-text>
            <div>{{repo.description}}</div>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="warning" :href="repo.html_url">More Info</v-btn>
            <v-btn color="success" @click="save(repo)">Save</v-btn>
          </v-card-actions>
        </v-card>
        <v-divider class="mt-6"></v-divider>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "MainComponent",

  data: () => ({
    githubRepos: [],
    selectedLanguages: ["python", "ruby", "java", "javascript", "csharp"],
    defaultLanguages: ["python", "ruby", "java", "javascript", "csharp"]
  }),
  methods: {
    search(languages) {
      this.githubRepos = new Array();
      languages.forEach(language => {
        axios
          .get(
            `https://api.github.com/search/repositories?q=stars:>=20000+language:${language}&sort=stars&order=desc`
          )
          .then(response => {
            this.githubRepos.push(response.data);
          })
          .catch(error => {
            this.$store.commit("show_message", {
              message: error.response.data.message,
              color: "error"
            });
          });
      });
    },
    save(repository) {
      axios
        .post("http://localhost:5000/api/repositories", {
          repositoryId: repository.id,
          name: repository.name,
          fullName: repository.full_name,
          owner: repository.owner.login,
          htmlUrl: repository.html_url,
          description: repository.description,
          language: repository.language,
          stargazersCount: repository.stargazers_count,
          creationDate: repository.created_at
        })
        .then(response => {
          if (response) {
            this.$store.commit("show_message", {
              message: "Repository has been saved successfully",
              color: "success"
            });
          }
        })
        .catch(error => {
          this.$store.commit("show_message", {
            message: error.response.data,
            color: "error"
          });
        });
    }
  }
};
</script>
