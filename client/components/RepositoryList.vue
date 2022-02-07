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
  padding: 0 8rem;
}

.title {
  color: $blue;
}

.repository-cards {
  margin-top: 1rem;
  background: $gray;
  border-radius: .1rem;
  overflow-y: auto;
  height: 40vh;
  display: grid;
  padding: 3rem;
  gap: 1rem;
  grid-template-columns: 1fr 1fr 1fr;
}

</style>
