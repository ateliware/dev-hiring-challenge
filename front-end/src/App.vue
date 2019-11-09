<template>
  <div id="app">
    <div id="nav">
      <b-link href="https://www.linkedin.com/in/evandro-souza/">Linkedin</b-link> |
      <b-link href="https://github.com/evandrosouza89 ">Github</b-link> |
      <b-link href="mailto:evandro.souza89@gmail.com">Email</b-link>
      <h6>© 2019 Evandro Souza</h6>
    </div>
    <p></p>
    <img src="./assets/vue.png">
    <img src="./assets/spring.png">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 30px;
  }

  p {
    margin-bottom: 20px;
  }
</style>
