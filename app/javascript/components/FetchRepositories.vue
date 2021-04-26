<template>
    <v-card>
     <v-toolbar
      color="pink"
      dark
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Capituar repositórios Github</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-col cols="12" lg="6" md="6">
              <p> Selecione a linguagem do dos repositórios que deseja listar, depois selecione os repositórios de seu interesse</p>
              <v-btn @click="getRepositories('Ruby')" :disabled="language =='Ruby'">Ruby</v-btn>
              <v-btn @click="getRepositories('Python')" :disabled="language =='Python'">Python</v-btn>
              <v-btn @click="getRepositories('Lua')" :disabled="language=='Lua'">Lua</v-btn>
              <v-btn @click="getRepositories('Haskell')" :disabled="language=='Haskell'">Haskell</v-btn>
              <v-btn @click="getRepositories('Java')" :disabled="language =='Java'">Java</v-btn>
            </v-col>
            <v-col cols="12" lg="6" md="6">
              <v-btn color="primary" :disabled="listRepository.length == 0" @click="salvar">{{repositoreis.length > 0 ? 'Salvar '+repositoreis.length+' selecionados' : 'Salvar selecionados' }} </v-btn>
            </v-col>
          </v-row>
        </v-col>
          <v-col cols="6">
            <v-list two-line>      
              <template v-for="(repo, index) in listRepository">
                <v-list-item :key="repo.id">
                  <template>
                    <v-list-item-content>
                      <v-list-item-title v-text="repo.name"></v-list-item-title>

                      <v-list-item-subtitle
                        class="text--primary"
                        v-text="repo.description"
                      ></v-list-item-subtitle>
                      <v-list-item-subtitle v-text="repo.language"></v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-list-item-action-text v-text="repo.full_name"></v-list-item-action-text>
                      <v-btn @click="addRepo(repo,index)">+</v-btn>
                    </v-list-item-action>
                  </template>
                </v-list-item>

                <v-divider
                  v-if="index < listRepository.length - 1"
                  :key="index"
                ></v-divider>
              </template>
            </v-list>
          </v-col>
          <v-col cols="6">
          <v-list two-line>      
              <v-list-item-group>        
              <template v-for="(repo, index) in repositoreis">
                <v-list-item :key="repo.repository.id">
                  <template>
                    <v-list-item-content>
                      <v-list-item-title v-text="repo.repository.name"></v-list-item-title>

                      <v-list-item-subtitle
                        class="text--primary"
                        v-text="repo.description"
                      ></v-list-item-subtitle>
                      <v-list-item-subtitle v-text="repo.repository.language"></v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-list-item-action-text v-text="repo.repository.full_name"></v-list-item-action-text>
                    
                      <v-btn @click="removeList(repo,index)">-</v-btn>
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
      </v-col>
      </v-row>
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
     addRepo (repo,index) {
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

        this.listRepository.splice(index, 1)
     },
     removeList (repo,index) {
       this.repositoreis.splice(index, 1)
       this.listRepository.push(repo.repository)
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