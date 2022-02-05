<template>
  <div class="repository-list">
    <div class="title">
      Repositórios do GitHub
    </div>
    <div class="repository-cards">
      <RepositoryCard v-for="repository of repositories" :key="repository.id" :repository="repository" />
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
