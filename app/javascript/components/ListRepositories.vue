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
      <!-- <v-list-item-group
        multiple
      > -->
        <template v-for="(repository, index) in repositoreis">
          <v-list-item :key="repository.id">
            <template>
              <v-list-item-content>
                <v-list-item-title v-text="repository.name + '--'+ repository.full_name"></v-list-item-title>
                <v-list-item-subtitle
                  class="text--primary"
                  v-text="repository.description"
                />

                Página: <a :href="repository.html_url" target="_blank">{{repository.html_url}}</a>
                GIT: <code>{{repository.git_url}}</code>
                SSH: <code>{{repository.ssh_url}}</code>
                SVN: <code>{{repository.ssh_svn}}</code>
                <v-list-item-subtitle v-text="repository.language"></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn @click="removeRepository(repository.id)">Remover</v-btn>
              </v-list-item-action>
            </template>
          </v-list-item>
          <v-divider
            v-if="index < repositoreis.length - 1"
            :key="index"
          ></v-divider>
        </template>
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