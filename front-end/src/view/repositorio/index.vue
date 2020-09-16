<template>
  <v-container class="width-page">
    <Consultar v-if="modoConsultar" :repositorios="repositorios" @buscarRepositorio="buscarRepositorio" />
    <Buscar v-else @buscar="buscar" />
  </v-container>
</template>

<script>
import Buscar from "./components/buscar";
import Consultar from "./components/consultar"
import repositorioService from "../../service/repositorio.service.js";

export default {
  components: {
    Buscar,
    Consultar
  },

  data: () => ({
    modoConsultar: false,
    repositorios: [],
  }),

  methods: {
    async buscar(linguagem) {
      const retorno = await repositorioService.buscarRepositorios(linguagem);

      if (retorno) {
        this.repositorios = repositorioService.buscarRepositoriosSalvos(linguagem);
        this.modoConsultar = true;
      }
    }, 

    buscarRepositorio() {
      this.modoConsultar = false;
    }
  },
}
</script>

<style>
.width-page {
  max-width: 1260px;
}
</style>