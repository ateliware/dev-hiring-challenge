<template>
  <div v-if="currentRepository" class="edit-form py-3">
    <!-- <p class="headline" v-model="currentRepository.language"></p> -->
    <h2>{{currentRepository.name}}</h2>
    <v-divider class="my-5"></v-divider>

    <v-form ref="form" lazy-validation readonly>
      
      <v-text-field
        v-model="currentRepository.full_name"
        label="Nome completo"
        readonly
      ></v-text-field>

      <v-text-field
        v-model="currentRepository.language"
        label="Linguagem"
        readonly
      ></v-text-field>

      <v-text-field
        v-model="currentRepository.description"
        label="Descrição"
        readonly
      ></v-text-field>
      
      <v-text-field
        v-model="currentRepository.owner"
        label="Dono"
        readonly
      ></v-text-field>

      <v-text-field
        v-model="currentRepository.stargazers_count"
        label="Número de estrelas"
        readonly
      ></v-text-field>

      <v-text-field
        v-model="currentRepository.forks"
        label="Forks"
        readonly
      ></v-text-field>

      <v-text-field
        v-model="currentRepository.html_url"
        label="URL no Github"
        readonly
      ></v-text-field>

    </v-form>

    <v-btn 
      color="success"
      to="/repositories" >OK</v-btn>

    <p class="mt-3">{{ message }}</p>
  </div>

  <div v-else>
    <p>Please click on a Tutorial...</p>
  </div>
</template>

<script>
import RepositoryDataService from "../services/RepositoryDataService";

export default {
  name: "tutorial",
  data() {
    return {
      currentRepository: null,
      message: "",
    };
  },
  methods: {
    getTutorial(id) {
      RepositoryDataService.get(id)
        .then((response) => {
          this.currentRepository = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentRepository.id,
        name: this.currentRepository.name,
        description: this.currentRepository.description,
        published: status,
      };

      RepositoryDataService.update(this.currentRepository.id, data)
        .then((response) => {
          this.currentRepository.published = status;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateTutorial() {
      RepositoryDataService.update(this.currentRepository.id, this.currentRepository)
        .then((response) => {
          console.log(response.data);
          this.message = "The tutorial was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteTutorial() {
      RepositoryDataService.delete(this.currentRepository.id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "repositories" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getTutorial(this.$route.params.id);
  },
};
</script>

<style>
.edit-form {
  max-width: 850px;
  margin: 15px;
}
</style>