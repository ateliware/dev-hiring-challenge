<template>
  <div>
    <home-component></home-component>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeComponent from "@/components/Main.vue";

export default {
  name: "Home",
  components: {
    HomeComponent
  }
};
</script>
