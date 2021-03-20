<template>
  <div>
    <header class="d-flex align-items-center justify-content-center">
      <div class="text-center">
        <h3 class="text-light mb-0">Dev Hiring Challenge</h3>
        <small class="text-light">Created by <a href="https://www.linkedin.com/in/tiago-p-1a2365117/" target="_blank">Tiago Junior Pereira</a></small>
      </div>
    </header>
    <Repositories />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Repositories from './components/Repositories'

export default {
  components: {
    Repositories
  },
  methods: {
    ...mapActions([
      'getLanguages',
    ])
  },
  mounted(){
    this.getLanguages()
  }
}
</script>

<style scoped>
    header{
        height: 80px;
        background-color: #191970;
        line-height: 1;
    }

    header a{
      color: #FFFFFF;
      text-decoration: none;
    }

    header a:hover{
      color: #FFFFFF;
      text-decoration: underline;
    }
</style>
