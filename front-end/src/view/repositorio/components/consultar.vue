<template>
  <v-container>
    <v-card>
      <v-app-bar color="primary" dark dense>
        Principais repositórios
      </v-app-bar>
      <v-card-text>
        <v-data-table
        date
        :headers="headers"
        :items="repositorios"
        @click:row="abrirModal"
        hide-default-footer
      >
      </v-data-table>
      </v-card-text>
      <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn outlined @click="buscarRepositorio">Buscar outro repositório</v-btn>
        </v-card-actions>
    </v-card>
    <Modal 
      :repositorio="repositorio"
      :value="mostrarModal" 
      @fecharModal="fecharModal" 
    />
  </v-container>
</template>

<script>
import Modal from './modal'

export default {
  name: "Consultar",

  components: {
    Modal,
  },
  
  props: {
    repositorios: {
      type: Array,
      default: () => []
    },
  },

  data: () => ({
    repositorio: {},
    mostrarModal: false,
    headers: [
      {
        text: "Nome",
        value: "nome",
        sortable: false,
        align: "start"
      },
      {
        text: "Estrelas",
        value: "estrelas",
        sortable: false,
        align: "start"
      }
    ]
  }),

  methods: {
    abrirModal(item) {
      this.repositorio = item;
      this.mostrarModal = true;
    }, 

    fecharModal() {
      this.mostrarModal = false;
    },

    buscarRepositorio() {
      this.$emit("buscarRepositorio", false);
    }
  }
}
</script>