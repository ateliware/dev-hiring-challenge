<template>
  <div>
    <Nuxt />
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  head() {
    return {
      title: 'Teste Ateliware'
    }
  }
})
</script>

<style scoped lang="scss">

@import '@/assets/scss/index.scss';

* {
  background: $light-gray;
  font-family: Sora;
}

select {
  font-family: Sora;
}

.loading {
  @include loading-component;
}

</style>