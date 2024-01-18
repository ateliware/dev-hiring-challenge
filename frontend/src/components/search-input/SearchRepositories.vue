!<template>
  <div class="form-group">
      <label class="form-label" for="language-search">Linguagem:</label>
      <input 
        class="form-input" 
        type="text" 
        v-model="language" 
        name="SearchRepo" 
        id="language-search" 
        placeholder="Java/Python"
        @keypress.enter="saveRepositories"
    >
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref } from "vue";
import api from '@/services/api'

export default {
    name:'SearchRepositories',
    setup() {
        const store = useStore()
        const language = ref('')

        const saveRepositories = async () => {
            if (language.value != "") {
                const response = await api.getRepo('/repo', { language: language.value })
                store.dispatch('saveRepositories', response)
                language.value = ""
            }
            
        }

        return {
            saveRepositories,
            language
        }
    }
}
</script>