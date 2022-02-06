<template>
  <div class="repository-card">
    <div class="fixed">
      <div class="main-info">
        <div class="main-field">
          <div class="field-name">
            Repositório
          </div>
          <div class="field-value">
            {{repository.name}}
          </div>
        </div>
        <div class="main-field">
          <div class="field-name">
            Dono
          </div>
          <div class="field-value">
            {{repository.owner}}
          </div>
        </div>     
      </div>
      <div class="buttons">
        <button class="button">
          <a :href="repository.url" target="_blank">
            Acessar
          </a>        
        </button>
        <button class="button" @click.prevent="toggleOpenCard()">
          {{isOpen ? '-' : '+'}} Info
        </button>
      </div>
    </div>
    <div class="togglable" v-if="isOpen">
      <div class="field">
        <div class="field-name">
          Descrição
        </div>
        <div class="field-value">
          {{repository.description}}
        </div>
      </div>
      <div class="field">
        <div class="field-name">
          Linguagem
        </div>
        <div class="field-value">
          {{repository.language ? repository.language : 'Nenhuma'}}
        </div>
      </div>
      <div class="field">
        <div class="field-name">
          Forks
        </div>
        <div class="field-value">
          {{repository.forks}}
        </div>
      </div>
      <div class="field">
        <div class="field-name">
          Issues abertas
        </div>
        <div class="field-value">
          {{repository.open_issues}}
        </div>
      </div>
      <div class="field">
        <div class="field-name">
          Watchers
        </div>
        <div class="field-value">
          {{repository.watchers}}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      isOpen: false
    }
  },
  props: {
    repository: {required: true}
  },
  methods: {
    toggleOpenCard () {
      this.isOpen = !this.isOpen
    }
  }
})
</script>

<style scoped lang="scss">

@import '@/assets/scss/index.scss';

.repository-card {
  color: $darker-gray;
  border-radius: .3rem;
  display: block;
}

.fixed {
  display: grid;
}

.main-info, .buttons {
  background: white;
  display: flex;
  text-align: center;
  .main-field {
    flex: 1;
    display: grid;
    grid-template-rows: 1fr 1fr;
    justify-content: stretch;
    align-items: flex-start;
  }
  .field-name {
    color: $darker-gray;
    font-weight: bold;
    font-size: 1.1rem;
  }
}

.togglable {
  background: white;
  display: grid;
  padding: 1rem;
  .field {
    display: flex;
    justify-content: space-between;
    padding: 0 3rem;
    .field-name {
      margin-right: 1rem;
      font-weight: bold;
    }
  }
}

.button {
  @include button-component;
  background-color: lighten($blue, 5%);
  height: 2rem;
  flex: 1;
  padding: 0;
  a {
    border-radius: .3rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

</style>