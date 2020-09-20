<template>
  <v-row justify="center" data-app>
    <v-dialog 
      persistent 
      width="800px"
      :value="value"
      @keydown.esc="fecharModal"
      @click:outside="fecharModal"
    >
      <v-card>
        <v-app-bar color="primary" dark dense>Ajuda</v-app-bar>
        <v-card-title></v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field 
                readonly
                label="Nome"
                v-model="repositorio.nome"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field 
                readonly
                label="Proprietário"
                v-model="repositorio.proprietario"
              />
            </v-col>
            <v-col cols="12" md="12">
              <v-text-field 
                readonly
                label="Descrição"
                v-model="repositorio.descricao"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field 
                readonly
                label="URL"
                v-model="repositorio.url"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field 
                readonly
                label="Linguagem"
                v-model="repositorio.linguagem"
              />
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field 
                readonly
                label="Forks"
                v-model="repositorio.forks"
              />
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field 
                readonly
                label="Issues"
                v-model="repositorio.issues"
              />
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field 
                readonly
                label="Estrelas"
                v-model="repositorio.estrelas"
              />
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field 
                readonly
                label="Seguidores"
                v-model="repositorio.seguidores"
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" outlined @click="fecharModal">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "Modal",
  
  model: {
    prop: "value",
    event: "fecharModal"
  },

  props: {
    value: {
      default: false
    }, 
    repositorio: {
      type: Object,
      default: () => {}
    }
  },

  methods: {
    fecharModal() {
      this.$emit("fecharModal", false);
    }
  }
}
</script>