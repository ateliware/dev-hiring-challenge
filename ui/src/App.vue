<template>
  <div>
    <LanguagesDropdown @language="chooseLanguage" />
    <TableRepos :repos="repos" v-if="!loading"  />
    <p v-if="loading" class="text-muted border-bottom-0"><font-awesome-icon
              icon="fa-solid fa-spinner" /> Loading...</p>
    <p v-if="loading || !repos" class="text-right mt-3"><a :href="downloadUrl">Download</a></p>
  </div>
</template>

<script>
import LanguagesDropdown from './components/LanguagesDropdown.vue';
import TableRepos from './components/TableRepos.vue';

export default {
  name: 'App',
  components: {
    LanguagesDropdown,
    TableRepos,
  },
  data() {
    return {
      qtd: 400,
      repos: [],
      loading: false,
    };
  },
  computed: {
    downloadUrl() {
      return `${import.meta.env.VITE_HOST}/download`;
    }
  },
  methods: {
    chooseLanguage(language) {
      const url = `${import.meta.env.VITE_HOST}/search?q=language:${language}`
      this.loading = true
      this.repos = []
      this.axios.get(url)
        .then((resp) => {
          this.repos = resp.data
        })
        .catch(error => console.log(error))
        .finally(() => this.loading = false)
    }
  }
}
</script>

<style>
@keyframes rotate-spinner {
  from {
    rotate: 0deg;
  }

  to {
    rotate: 360deg;
  }
}

.fa-spinner {
  animation-name: rotate-spinner;
  animation-duration: 2.5s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
