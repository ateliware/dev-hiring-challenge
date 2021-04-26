<template>
    <v-card>
     <v-toolbar
      color="pink"
      dark
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Repositórios</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" :disabled="listRepository.length == 0" @click="salvar">{{repositoreis.length > 0 ? 'Salvar '+repositoreis.length+' selecionados' : 'Salvar selecionados' }} </v-btn>
      <v-btn color="primary" @click="salvar" v-if="listRepository.length>0">Os {{listRepository.length}} repositórios da linguagem {{language}} </v-btn>
    </v-toolbar>

    <v-list two-line>
      <v-list-item-group>
          Selecione a linguagem do dos repositorios que deseja listar
        <v-btn @click="getRepositories('Ruby')" :disabled="language =='Ruby'">Ruby</v-btn>
        <v-btn @click="getRepositories('Python')" :disabled="language =='Python'">Python</v-btn>
        <v-btn @click="getRepositories('Lua')" :disabled="language=='Haskell'">Lua</v-btn>
        <v-btn @click="getRepositories('Haskell')" :disabled="language=='Haskell'">Haskell</v-btn>
        <v-btn @click="getRepositories('Java')" :disabled="language =='Java'">Java</v-btn>
        <br/><br/>
        <template v-for="(repo, index) in listRepository">
          <v-list-item :key="repo.id">
            <template>
              <v-list-item-content>
                <v-list-item-title v-text="repo.name + '--'+ repo.full_name"></v-list-item-title>

                <v-list-item-subtitle
                  class="text--primary"
                  v-text="repo.description"
                ></v-list-item-subtitle>
                <v-list-item-subtitle v-text="repo.language"></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-list-item-action-text v-text="repo.html_url"></v-list-item-action-text>
              
                <v-btn @click="addRepo(repo)">+</v-btn>
                <v-btn @click="removeRepo(index)">-</v-btn>
                <v-checkbox
                  v-model="repo.checked"
                  :label="`Checkbox 1: ${checkbox1.toString()}`"
                ></v-checkbox>
              </v-list-item-action>
            </template>
          </v-list-item>

          <v-divider
            v-if="index < listRepository.length - 1"
            :key="index"
          ></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
    {{listRepository[0]}}
  </v-card>
</template>
<script>
import axios from 'axios'

export default {
  data: function () {
    return {
      listRepository: {},
      repositoreis: [],
      language: null,
      }
  },
    methods: {
     async getRepositories (language,page=1, per_page=10) {
       this.language = language
      let response = await axios.get('https://api.github.com/search/repositories?q=language:'+language+'&page='+page+'&per_page='+per_page)
       this.listRepository = response.data.items
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
     },
     removeRepo (index) {
       this.repositoreis.splice(index, 1)
    },
    async salvarTodos(){
    console.log(this.listRepository)
      await axios.post("/repositories",this.listRepository)
    },
    async salvar () {
      const response = await axios.post("/repositories",this.repositoreis)
      if(response.status='OK'){
        this.repositoreis = []
      }else{
        alert('Ocorreu um erro ao salvar')
      }
    },
    goToPage(page){
    this.getRepositories(this.language,page, 10)
    }
  }
}
</script>