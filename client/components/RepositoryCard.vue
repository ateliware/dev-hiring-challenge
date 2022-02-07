<template>
  <div class="repository-card">
    <div class="fixed">
      <div class="main-info">
        <div class="field">
          <div class="icon">
            <img src="/img/repository.svg">
          </div>
          <div class="text">
            Repositório: <b>{{repository.name}}</b>
          </div>
        </div>
        <div class="field">
          <div class="icon">
            <img src="/img/person.svg">
          </div>
          <div class="text">
            Dono: <b>{{repository.owner}}</b>
          </div>
        </div>       
      </div>
      <div class="buttons">
        <div class="clickable-text" @click.prevent="toggleOpenCard()">
          Detalhes
        </div>        
        <button class="button">
          <a :href="repository.url" target="_blank">
            Acessar
          </a>        
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
  // background: white;
  padding: 2rem 1rem;
  display: block;
}

.fixed {
  display: grid;
  grid-template-rows: 1fr 1fr;
  padding: 1rem 2rem;
  background: white;
  .main-info {
    display: grid;
    grid-template-rows: 1fr 1fr;
    gap: 1rem;
    padding: 1rem 0;
    .field {
      display: flex;
      align-items: center;
      .icon {
        margin-right: 1rem;
      }
    }
  }
  .buttons {
    display: flex;
    align-items: flex-end;
    .clickable-text {
      flex: 1;
      color: $blue;
      font-size: 1rem;
      display: flex;
      align-items: center;
      text-align: left;
      height: 3rem;
      cursor: pointer;
    }
    .button {
      flex: 1;
      @include button-component;
      a {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
      }
    }
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

</style>