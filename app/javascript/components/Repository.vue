<template>
  <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-card-text>
      <div>{{repository.language}}</div>
      <p class="display-1 text--primary">
        {{repository.full_name}}
      </p>
      <p>{{repository.owner}}</p>
      <div class="text--primary">
        {{repository.description}}
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn
        text
        color="teal accent-4"
        @click="reveal = true"
      >
        Exibir detalhes
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <v-card
        v-if="reveal"
        class="transition-fast-in-fast-out v-card--reveal"
        style="height: 100%;"
      >
        <v-card-text class="pb-0">
          <p class="display-1 text--primary">
            Page|Clone
          </p>
          HTML: <code>{{repo.html_url}}</code>
          GIT: <code>{{repo.git_url}}</code>
          SSH: <code>{{repo.ssh_url}}</code>
          SVN: <code>{{repo.ssh_svn}}</code>
        </v-card-text>
        <v-card-actions class="pt-0">
          <v-btn
            text
            color="teal accent-4"
            @click="reveal = false"
          >
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-expand-transition>
  </v-card>
</template>
<script>
import axios from 'axios'

export default {
  data: function () {
    return {
      repository: {},
      
      language: null
      }
  },
    methods: {
    
    async gerRepositoryLocal (id) {
      const response = await axios.post("/repositories/",id)
      if(response.status='OK'){
        this.repository = response.data
      }else{
        alert('Ocorreu um erro ao buscar o registro')
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
