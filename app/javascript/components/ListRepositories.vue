<template>
    <v-card>
     <v-toolbar
      color="pink"
      dark
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Repositórios salvos</v-toolbar-title>
     
    </v-toolbar>

    <v-list two-line>
      <v-list-item-group
        multiple
      >
        <template v-for="(repository, index) in repositoreis">
          <v-list-item :key="repository.id">
            <template>
              <v-list-item-content>
                <v-list-item-title v-text="repository.name + '--'+ repository.full_name"></v-list-item-title>
                <v-list-item-subtitle
                  class="text--primary"
                  v-text="repository.description"
                ></v-list-item-subtitle>
                <v-list-item-subtitle v-text="repository.language"></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-list-item-action-text v-text="repository.html_url"></v-list-item-action-text>
                <v-btn @click="removeRepository(repository.id)">Remover</v-btn>
              </v-list-item-action>
            </template>
          </v-list-item>

          <v-divider
            v-if="index < repositoreis.length - 1"
            :key="index"
          ></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>
<script>
import axios from 'axios'

export default {
  data: function () {
    return {
      repositoreis: {},
      }
  },
  created () {
      this.getLocalRepositories()
  },
  methods: {
    async getLocalRepositories () {
      let response = await axios.get('/repositories')
      this.repositoreis = response.data
    },
    async removeRepository (id) {
        console.log(this.repositoreis)
      await axios.delete('/repositories/'+id)
       const indice = this.repositoreis.findIndex(t => t.id === id)
        this.repositoreis.splice(indice, 1)
    }
  },
}
</script>