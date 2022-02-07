<template>
  <div class="container">
    <div class="language-picker">
      <div class="control">
        <div class="title">
          Repositórios do GitHub - Projeto Ateliware
        </div>
        <div class="selector">
          <label for="language-selector">
            Escolha até 5 linguagens: <span v-if="cannotChooseAnotherLanguage()">(5 já foram escolhidas)</span>
          </label>          
          <div class="picker">
            <select name="language-selector"
            v-model="chosen_language"
            @change.prevent="chooseLanguage(chosen_language)"
            :disabled="cannotChooseAnotherLanguage()">
              <option :value="language" v-for="(language, language_index) of notChosenLanguages" :key="language_index">
                {{language}}
              </option>
            </select>
            <button class="button" @click.prevent="loadAndFetchRepositories()">
              Puxar repositórios
            </button>            
          </div>
        </div>
      </div>
      <div class="chosen">
        <div class="title">
          Linguagens escolhidas:
        </div>
        <div class="chosen-container">
          <div class="languages" v-if="chosen_languages.length > 0">
            <div class="chosen-language" v-for="(chosen_language, chosen_language_index) of chosen_languages" :key="chosen_language_index">
              <div class="language-name">
                {{chosen_language}}
              </div>
              <div class="unchoose" @click.prevent="unchooseLanguage(chosen_language)">
                <img src="/img/close.svg" />
              </div>
            </div>
          </div>
          <div class="no-chosen" v-else>
            <div class="icon">
              <img src="/img/close.svg">
            </div>
            <div class="text">
              Nenhuma linguagem escolhida.
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
  color: black;
}

select {
  font-family: Arial;
  width: 10rem;
}

.language-picker {
  display: flex;
  justify-content: center;
  padding: 4rem 8rem;
  .control {
    flex: 1;
    display: grid;
    gap: 4rem;
    .title {
      font-size: 3rem;
      width: 60%;
    }
    .selector {
      .picker {
        display: flex;
        width: 80%;
        select {
          flex: 1;
        }
        .button {
          flex: 1;
          @include button-component;
        }
      }
    }
  }
}

.chosen {
  flex: 1;
  color: white;
  padding: 1rem;
  .title {
    color: $blue;
    font-size: 1.3rem;
    padding: 1rem 0;
  }
  .chosen-container {
    border: 1px solid $dark-gray;
    border-radius: .3rem;
    padding: 1rem;
    min-height: 12rem;
    background: $light-gray;
    .languages {
      display: grid;
      gap: 1rem;
      grid-auto-flow: row dense;
      grid-template-columns: 1fr 1fr;
    }
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
      box-shadow: 2px 4px 8px 0px rgba(0, 0, 0, 0.2), 2px 6px 20px 0 rgba(0, 0, 0, 0.19);
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
        background-color: $gray;
        img {
          margin: auto;
          width: .9rem;
          height: .9rem;
        }
        transition: .3s;
        &:hover {
          background-color: darken($gray, 10%);
          cursor: pointer;
        }       
      }
    }
  }
}

.no-chosen {
  display: grid;
  justify-content: center;
  align-items: center;
  height: 12rem;
  color: $darker-gray;
  .icon {
    background: $dark-gray;
    margin: auto;
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 70%;
      height: 70%;
    }
  }
}

.loading {
  padding: 1rem 8rem;
}

@media(max-width: 1200px) {

  select {
    width: auto;
  }

  .language-picker {
    display: grid;
    padding: 0rem;
    .control {
      gap: 1rem;
      .title {
        width: auto;
        font-size: 2.5rem;
        padding: 1rem;
      }
      .selector {
        padding: 0 1rem;
        .picker {
          width: auto;
        }
      }
    }
  }

  .loading {
    padding: 1rem;
  }
}

</style>