<template>
  <div id="app">
  <v-card>
    <v-btn @click="salvar">Salvar Lista</v-btn>
    <v-btn @click="salvar">Os {{listRespos.length}} repositórios da linguagem {{language}} </v-btn>
     <v-toolbar
      color="pink"
      dark
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Repositórios</v-toolbar-title>
      <v-spacer></v-spacer>
        <v-btn @click="getRepositories('Ruby')">Ruby</v-btn>
        <v-btn @click="getRepositories('Python')">Python</v-btn>
        <v-btn @click="getRepositories('Lua')">Lua</v-btn>
        <v-btn @click="getRepositories('Haskell')">Haskell</v-btn>
        <v-btn @click="getRepositories('Java')">Java</v-btn>
      <v-btn icon>
        <v-icon>mdi-checkbox-marked-circle</v-icon>
      </v-btn>
    </v-toolbar>

    <v-list two-line>
      <v-list-item-group
        active-class="pink--text"
        multiple
      >
        <template v-for="(repo, index) in listRespos">
          <v-list-item :key="repo.id">
            <template v-slot:default="{ active }">
              <v-list-item-content>
                <v-list-item-title v-text="repo.name + '--'+ repo.full_name"></v-list-item-title>

                <v-list-item-subtitle
                  class="text--primary"
                  v-text="repo.description"
                ></v-list-item-subtitle>

                <v-list-item-subtitle v-text="repo.language"></v-list-item-subtitle>
                 HTML: <code>{{repo.html_url}}</code>
                 GIT: <code>{{repo.git_url}}</code>
                 SSH: <code>{{repo.ssh_url}}</code>
                 SVN: <code>{{repo.ssh_svn}}</code>
              </v-list-item-content>

              <v-list-item-action>
                <v-list-item-action-text v-text="repo.html_url"></v-list-item-action-text>

                <v-icon
                  v-if="!active"
                  color="grey lighten-1"
                >
                  mdi-star-outline
                </v-icon>

                <v-btn v-if="!active" @click="addRepo(repo)">+</v-btn>
                <v-btn v-if="active" @click="removeRepo(index)">-</v-btn>
              </v-list-item-action>
            </template>
          </v-list-item>

          <v-divider
            v-if="index < listRespos.length - 1"
            :key="index"
          ></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
  </v-card>
  <v-btn @click="salvar">Salvar Lista</v-btn>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data: function () {
    return {
      listRespos: {},
      repositoreis: [],
      language: null
      }
  },
    methods: {
     async getRepositories (language) {
       this.language = language
      let response = await axios.get('https://api.github.com/search/repositories?q=language:'+language)
       this.listRespos = response.data.items
     },
     addRepo (repo) {
       this.repositoreis.push({ repository: {
          id: repo.id,
          node_id: repo.node_id,
          name: repo.name,
          full_name: repo.full_name,
          homepage: repo.homepage,
          html_url: repo.html_url,
          ssh_url: repo.ssh_url,
          git_url: repo.git_url,
          clone_url: repo.clone_url,
          created_at: repo.created_at,
          updated_at: repo.updated_at,
          svn_url: repo.svn_url,
          description: repo.description,
          forks: repo.forks,
          language: repo.language,
          size: repo.size,
          size: repo.watchers,
          size: repo.stargazers_count,
          owner: repo.owner,
          pushed_at: repo.pushed_at,
          license: repo.license

          }
        })
         console.log(this.listRespos)
     },
     removeRepo (index) {
       this.repositoreis.splice(index, 1)
    },
    async salvarTodos(){
      this.listRespos.map(item => {
          addRepo (item)
      })
      console.log(this.repositoreis)
      await axios.post("/repositories",this.repositoreis)
    },
    async salvar () {
      const response = await axios.post("/repositories",this.repositoreis)
      if(response.status='OK'){
        alert('salvou')
        this.repositoreis = {}
      }else{
        alert('Erro')
      }
    }
    }
}
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
