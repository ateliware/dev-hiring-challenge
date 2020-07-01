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
    <v-row v-for="(language, index) in selectedLanguages" :key="index">
      <v-subheader>{{language}}</v-subheader>
      <span v-if="githubRepos[language]">
        <v-card v-for="(repo, index) in githubRepos[language].items" :key="index">
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{repo.name}}</h3>
              <div>{{repo.description}}</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn color="primary" @click="save(repo)">Save</v-btn>
          </v-card-actions>
        </v-card>
      </span>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "MainComponent",

  data: () => ({
    githubRepos: {},
    selectedLanguages: ["python", "ruby", "java", "javascript", "csharp"],
    defaultLanguages: ["python", "ruby", "java", "javascript", "csharp"]
  }),
  methods: {
    search(languages) {
      this.githubRepos = new Object();
      languages.forEach(async language => {
        await axios
          .get(
            `https://api.github.com/search/repositories?q=stars:>=20000+language:${language}&sort=stars&order=desc`
          )
          .then(response => {
            this.githubRepos[language] = response.data;
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
          console.log(response);
        });
    }
  }
};
</script>
