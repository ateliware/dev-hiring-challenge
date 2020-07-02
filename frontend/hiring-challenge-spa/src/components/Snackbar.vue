<template>
  <v-snackbar top v-model="show" :color="color">
    {{message}}
    <v-btn text @click="show = false">
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  data: () => ({
    show: false,
    message: "",
    color: ""
  }),
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "show_message") {
        this.message = state.snackbar.message;
        this.color = state.snackbar.color;
        this.show = true;
      }
    });
  }
};
</script>

<style>
</style>