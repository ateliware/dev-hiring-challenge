<template>
  <div class="repository-list">
    <div class="title">
      Repositórios encontrados
    </div>
    <div class="repository-cards" v-if="repositories.length > 0">
      <RepositoryCard v-for="repository of repositories" :key="repository.id" :repository="repository" />
    </div>
    <div class="no-cards" v-else>
      Nenhum repositório foi encontrado.
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    repositories: {required: true}
  }
})
</script>

<style scoped lang="scss">

@import '@/assets/scss/index.scss';

.repository-list {
  padding: 1rem;
  display: grid;
  gap: 1rem;
  background: $blue;
  color: $gray;
  height: calc(100vh - 25rem);  
}

.title {
  font-size: 1.5rem;
  color: white;
}

.repository-cards {
  border: 1px solid $gray;
  border-radius: .3rem;
  padding: 1rem;
  overflow-y: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1rem;
}

</style>
