<template>
  <div class="container">
    <div class="language-picker">
      <div class="selector">
        <label for="language-selector">
          Escolha até 5 linguagens:
        </label>
        <select name="language-selector"
        v-model="chosen_language"
        @change.prevent="chooseLanguage(chosen_language)"
        :disabled="cannotChooseAnotherLanguage()">
          <option :value="language" v-for="(language, language_index) of notChosenLanguages" :key="language_index">
            {{language}}
          </option>
        </select>
      </div>
      <div class="chosen">
        <div class="chosen-language" v-for="(chosen_language, chosen_language_index) of chosen_languages" :key="chosen_language_index">
          <div class="language-name">
            {{chosen_language}}
          </div>
          <div class="unchoose" @click.prevent="unchooseLanguage(chosen_language)">
            X
          </div>
        </div>
      </div>
    </div>
    <div class="buttons">
      <button class="button" @click.prevent="loadAndFetchRepositories()">
        Puxar repositórios
      </button>  
    </div>
    <RepositoryList v-if="!loading" :repositories="repositories" />
    <div class="loading" v-else>
      <div class="loading-text">
        {{loading}}
      </div>
      <div class="loader">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      languages: [
        'Javascript',
        'Python',
        'Java',
        'C#',
        'PHP',
        'C++',
        'C',
        'Shell',
        'Ruby',
        'Typescript'                           
      ] as string[],
      chosen_languages: [] as string[],
      chosen_language: undefined as string | undefined,
      repositories: [] as any[],
      loading: undefined as string | undefined
    }
  },
  computed: {
    notChosenLanguages () {
      
      let not_chosen_languages = []

      const languages: string[] = this.languages

      for (let language of languages) {
        if (this.chosen_languages.indexOf(language) === -1) not_chosen_languages.push(language)
      }

      return not_chosen_languages

    },
  },
  async mounted () {
    await this.fetchRepositories()
  },
  methods: {
    chooseLanguage (chosen_language: string) {

      if (!chosen_language) return
      
      this.chosen_languages.push(chosen_language)

    },
    unchooseLanguage (language: string) {
      
      this.chosen_languages = this.chosen_languages.filter(chosen_language => chosen_language !== language)

    },
    cannotChooseAnotherLanguage () {

      const max_amount_of_chosen_languages = 5

      return this.chosen_languages.length >= max_amount_of_chosen_languages
    },
    async loadAndFetchRepositories () {

      let repositories = []

      const load = await this.loadRepositories()

      if (load && load.success) {
        repositories = await this.fetchRepositories()
      }

      return repositories
    },
    async loadRepositories () {

      this.loading = 'Carregando banco de dados com repositórios do GitHub...'
      
      const load = await this.$axios.$post(`${process.env.SERVER_URL}/repository/load`, {
        languages: this.chosen_languages
      })

      this.loading = undefined

      return load

    },
    async fetchRepositories () {

      this.loading = 'Puxando repositórios do banco de dados...'

      const {repositories} = await this.$axios.$get(`${process.env.SERVER_URL}/repository`)

      this.repositories = repositories

      this.loading = undefined

      return repositories

    }
  }
})
</script>

<style scoped lang="scss">

@import '@/assets/scss/mixins.scss';

.container {
  display: grid;
}

.loading {
  @include loading-component;
}

</style>

