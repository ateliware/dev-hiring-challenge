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
          {{repositorio}}
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