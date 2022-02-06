<template>
  <div class="container">
    <h1 class="title">
      Repositórios do GitHub - Projeto Ateliware
    </h1>
    <div class="language-picker">
      <div class="selector">
        <div class="picker">
          <label for="language-selector">
            Escolha até 5 linguagens: <span v-if="cannotChooseAnotherLanguage()">(5 já foram escolhidas)</span>
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
        <div class="buttons">
          <button class="button" @click.prevent="loadAndFetchRepositories()">
            Puxar repositórios
          </button>  
        </div>         
      </div>     
      <div class="chosen">
        <div class="title">
          Linguagens escolhidas
        </div>
        <div class="chosen-container">
          <div class="chosen-language" v-for="(chosen_language, chosen_language_index) of chosen_languages" :key="chosen_language_index">
            <div class="language-name">
              {{chosen_language}}
            </div>
            <div class="unchoose" @click.prevent="unchooseLanguage(chosen_language)">
              <img src="/img/close.svg" />
            </div>
          </div>        
        </div>
      </div>
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

export interface TGitHubRepositoryCard {
  name?: string;
  url?: string;
  owner?: string;
  description?: string;
  language?: string;
  forks?: number;
  open_issues?: number;
  watchers?: number;
}

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
      repositories: [] as TGitHubRepositoryCard[],
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

@import '@/assets/scss/index.scss';

.container {
  display: grid;
  background: $blue;
  color: white;
}

select {
  font-family: Sora;
  width: 10rem;
}

.title {
  font-size: 2rem;
  padding: 0 1rem;
}

.language-picker {
  display: flex;
  .selector {
    flex: 1;
    display: grid;
    gap: .5rem;
    justify-content: center;
    .picker {
      align-self: flex-end;
      display: flex;
      justify-content: center;
      align-items: center;
      label {
        margin-right: 1rem;
        color: white;
      }
    }
    .buttons {
      align-self: flex-start;
      display: flex;
      .button {
        @include button-component;
        flex: 1;
      }
    }
  }
  .chosen {
    flex: 1;
    color: white;
    padding: 1rem;
    .title {
      font-size: 1.3rem;
    }
    .chosen-container {
      border: 1px solid $dark-gray;
      border-radius: .3rem;
      padding: 1rem;
      min-height: 12rem;
      display: grid;
      gap: 1rem;
      grid-auto-flow: row;
      grid-template-columns: 1fr 1fr;
      .chosen-language {
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid $dark-gray;
        border-radius: .3rem;
        width: max-content;
        padding: .5rem;
        height: 2rem;
        background: white;
        color: $darker-gray;
        .language-name {
          margin-right: .5rem;
        }
        .unchoose {
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px solid $dark-gray;
          border-radius: 50%;
          width: 1.3rem;
          height: 1.3rem;
          img {
            margin: auto;
            width: .9rem;
            height: .9rem;
          }
          transition: .3s;
          &:hover {
            background-color: $gray;
            cursor: pointer;
          }       
        }
      }
    }
  }
}

</style>

