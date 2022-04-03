<template>
  <div class="container">
    <SearchRepositories />
    <div class="card">
      <div class="card-header">
        <div class="h4">Repositorios Obtidos</div>
        <div class="card-body">
          <RepositoriesGit />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RepositoriesGit from './components/repositorie-git/RepositoriesGit.vue'
import SearchRepositories from './components/search-input/SearchRepositories.vue'

export default {
  name: 'App',
  components: { 
    RepositoriesGit,
    SearchRepositories 
  },
}
</script>
