<template>
  <v-app>
    <v-app-bar app dark>
      <div class="d-flex align-center mr-2">
        André Goulart
      </div>

      <v-btn to="/add" text>
        Buscar
      </v-btn>

      <v-btn to="/repositories" text>
        Repositórios
      </v-btn>

    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "app",
};
</script>