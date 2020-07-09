<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-row align="center" justify="center">
          <v-col xs="12" sm="12" md="5" lg="5">
            <!-- <validation-observer ref="observer"> -->
            <!-- <validation-provider v-slot="{ errors }" name="Search" :rules="{ between: [1, 5] }"> -->
            <v-combobox
              deletable-chips
              multiple
              chips
              :counter="5"
              :items="defaultLanguages"
              v-model="selectedLanguages"
              label="Select languages to search or type a new one"
              hint="Maximum of 5 tags"
            ></v-combobox>
            <!-- </validation-provider> -->
            <!-- </validation-observer> -->

            <v-card flat>
              <v-card-text>
                <v-row align="center" justify="center">
                  <v-col cols="12">
                    <p class="text-center">Limit the quantity of search results</p>
                  </v-col>
                  <v-btn-toggle group v-model="numberOfRepos" mandatory class="mt-n2">
                    <v-btn value="5">5</v-btn>
                    <v-btn value="10">10</v-btn>
                    <v-btn value="15">15</v-btn>
                  </v-btn-toggle>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-row align="center" justify="center">
        <v-btn color="success" @click="search(selectedLanguages, numberOfRepos )">Search Repos</v-btn>
      </v-row>
    </v-row>

    <v-row v-if="!error" justify="center" align="center">
      <v-col xs="12" sm="12" md="8" lg="8" v-for="(repos, index) in githubRepos" :key="index">
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
    <v-row justify="center" align="center" class="mt-10" v-else>
      <v-alert outlined type="error">
        {{error}}
      </v-alert>
    </v-row>
  </v-container>
</template>

<script>
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from "vee-validate";
import { required, between } from "vee-validate/dist/rules";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "{_field_} can not be empty"
});

extend("between", {
  ...between,
  message: "{_field_} must be between 1 and 5"
});

export default {
  name: "MainComponent",
  components: {
    ValidationProvider,
    ValidationObserver
  },

  data: () => ({
    githubRepos: [],
    selectedLanguages: ["python", "ruby", "java", "javascript", "csharp"],
    defaultLanguages: ["python", "ruby", "java", "javascript", "csharp"],
    numberOfRepos: 5,
    error: ""
  }),
  methods: {
    search(languages, numberOfRepos) {
      let GITHUB_API_URL = process.env.VUE_APP_GITHUB_URL;
      this.githubRepos = new Array();
      languages.forEach(language => {
        axios
          .get(
            `${GITHUB_API_URL}?q=stars:>=20000+language:${language}&sort=stars&order=desc&per_page=${numberOfRepos}`
          )
          .then(response => {
            this.githubRepos.push(response.data);
          })
          .catch(error => {
            this.$store.commit("show_message", {
              message: error.response.data.message,
              color: "error"
            });
            this.error =
              "Ops, looks like we couldn't fetch any repositories, try again in a minute...";
          });
      });
    },
    save(repository) {
      axios
        .post("/repositories", {
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
