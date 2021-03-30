<template>
  <div class="submit-form mt-3 mx-auto">
    <v-alert
      v-if="errorAlert"
      border="right"
      colored-border
      type="error"
      elevation="2"
      transition="scale-transition"
      dismissible
    >
      {{this.alertMessage}}
    </v-alert>
    <v-alert
      v-if="warnAlert"
      border="right"
      colored-border
      type="warning"
      elevation="2"
      transition="scale-transition"
      dismissible
    >
      {{this.alertMessage}}
    </v-alert>
    <p class="headline">Buscar e adicionar repositório</p>

    <div v-if="!submitted">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="repository.language"
          :rules="rules"
          label="Linguagem ex: java"
          required
        ></v-text-field>
      </v-form>

      <v-btn 
        color="primary" 
        class="mt-3"
        :disabled="!valid"
        @click="getRepository">Enviar</v-btn>
    </div>

    <div v-else>
      <v-card class="mx-auto">
        <v-card-title> Repositório salvo com sucesso! </v-card-title>

        <v-card-subtitle>
          Clique no botão Adicionar para buscar e adicionar um novo repositório.
        </v-card-subtitle>

        <v-card-actions>
          <v-btn 
            color="success"
            @click="newTutorial" >Adicionar</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import RepositoryDataService from "../services/RepositoryDataService"
import axios from "axios"

export default {
  name: "add-tutorial",
  data() {
    return {
      repository: {
        id: null,
        git_id: 0,
        name: "",
        full_name: "",
        language: "",
        avatar_url: "",
        owner: "",
        stargazers_count: 0,
        forks: 0,
        html_url: "",
        description: "",
      },
      submitted: false,
      rules: [
        v => !!v || "Campo linguagem obrigatório",
      ],
      valid: true,
      errorAlert: false,
      warnAlert: false,
      alertMessage: ""
    }
  },
  methods: {
    validate () {
      this.$refs.form.validate()
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
    getRepository() {
      if (this.repository.language != "") {
        axios
          .get(`https://api.github.com/search/repositories?q=language:${this.repository.language}&sort=stars&page=1`)
          .then((response) => {
            let repositories = response.data.items[0]
            this.errorAlert = false
            this.saveTutorial(repositories)
          })
          .catch((error) => {
            if (error.response.status == 422 && error.response.data.errors[0].code == "invalid") {
              this.errorAlert = true
              this.alertMessage = "Linguagem digitada inválida ou não existe!"
              setTimeout(()=>{
                this.errorAlert = false
              },3000)
            } else {
              console.log("Ocorreu um erro, tente novamente!")
            }
          })
      } else {
        this.warnAlert = true
        this.alertMessage = "Campo linguagem é obrigatório!"
        setTimeout(()=>{
          this.warnAlert = false
        },3000)
      }
    },
    saveTutorial(repositories) {
      var data = {
        git_id: repositories.id,
        name: repositories.name,
        full_name: repositories.full_name,
        language: repositories.language,
        avatar_url: repositories.owner.avatar_url,
        owner: repositories.owner.login,
        stargazers_count: repositories.stargazers_count,
        forks: repositories.forks,
        html_url: repositories.html_url,
        description: repositories.description
      }

      RepositoryDataService.create(data)
        .then((response) => {
          this.repository.id = response.data.id
          console.log(response.data)
          this.submitted = true
        })
        .catch((e) => {
          console.log(e)
        })
    },
    newTutorial() {
      this.submitted = false
      this.repository = {}
    },
  }
}
</script>

<style>
.submit-form {
  max-width: 450px
}
</style>