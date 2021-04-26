<template>
  <v-app> 
      <v-content>
          <v-btn  @click="setRender(1)" :disabled="render==1" >Captuar repositorios</v-btn>
          <v-btn  @click="setRender(3)" :disabled="render==3">Listar repositorios Locais</v-btn> 
        <fetchRepositories v-if="render==1" />
        <listRepositories v-if="render==3"/>
      </v-content>
  </v-app>
</template>

<script>
import FetchRepositories from './components/FetchRepositories'
import Repository from './components/Repository'
import ListRepositories from './components/ListRepositories'

export default {
  components: {
    FetchRepositories, Repository, ListRepositories
  },
  data: function () {
    return {
      render: 1,
      id: 0
      }
  },
    methods: {
      setRender (render) {
        this.render = render
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
