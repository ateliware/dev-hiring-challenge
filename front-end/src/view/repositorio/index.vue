<template>
  <v-container class="width-page">
    <Consultar v-if="modoConsultar" :repositorios="repositorios" @buscarRepositorio="buscarRepositorio" />
    <Buscar v-else @buscar="buscar" :loading="loading" />
    <v-snackbar
      v-model="toast.mostrar"
      right
      color="red"
    >
      {{ toast.mensagem }}
    </v-snackbar>
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
    loading: false,
    modoConsultar: false,
    repositorios: [],
    toast: {
      mensagem: "",
      mostrar: false
    }
  }),

  methods: {
    buscar(linguagem) {
      this.loading = true;
      repositorioService.buscarRepositorios(linguagem)
        .then(response => {
          this.repositorios = response.data;
          this.modoConsultar = true;
        })
        .catch(err => {
          this.toast.mensagem = err.response.data;
          this.toast.mostrar = true;
        })
        .finally(() => this.loading = false);
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