<template>
  <v-container>
    <v-card>
      <v-app-bar color="primary" dark dense>
        Buscar repositórios
      </v-app-bar>
      <v-card-text>
        <v-row v-if="loading">
          <v-col cols="12" md="10">
            <v-progress-circular
              class="text-center"
              indeterminate
              color="primary"
            ></v-progress-circular>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col cols="12" md="10">
            <v-text-field 
              label="Linguagem de pesquisa"
              v-model="linguagem"
            />
          </v-col>
          <v-col cols="12" md="2">
            <v-btn rounded dark color="primary" @click="buscar">
              Pesquisar 
              <v-icon right dark>mdi-magnify</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Buscar", 

  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    linguagem:"",
  }),

  methods: {
    buscar() {
      this.$emit("buscar", this.linguagem);
    }
  }
}
</script>
