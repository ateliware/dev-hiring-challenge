<template>
  <v-container class="width-page">
    <Buscar @buscar="buscar" />
  </v-container>
</template>

<script>
import Buscar from "./buscar";
import service from "../../service/repositorio.service.js";

export default {
  components: {
    Buscar
  },

  methods: {
    async buscar(linguagem) {
      await service.buscarRepositorios(linguagem);
    }
  }
}
</script>

<style>
.width-page {
  max-width: 1260px;
}
</style>