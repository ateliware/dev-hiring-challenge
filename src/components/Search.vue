<template>
  <div class="hello">
      Please select 5 languages below:
      <div v-for="(lang_value, lang_key) in langs" :key="lang_key">
        <input type="checkbox" :value="{lang_key, lang_value}" :key="lang_key" v-model="checkedLangs">
        <label>{{lang_value}}</label>
      </div>
    <button @click="searchRepo">Search!</button>
    <div v-if="checkedLangs.length > 0">
        <table  v-for="repos in reposByLang" :key="repos.lang.lang_key">
            <caption><hr>{{repos.lang.lang_value}}</caption>
            <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Star count</th>
            </tr>
            <tr v-for="repo in repos.repos" :key="repo.id">
                <td><a v-bind:href="repo.html_url">{{repo.full_name}}</a></td>
                <td>{{repo.description}}</td>
                <td>{{repo.stargazers_count}}</td>
            </tr>
        </table>
    </div>
    
  </div>
</template>

<script>

import axios from 'axios'
import {langs} from '../consts/langs'
import {serverConfig} from '../consts/server'

export default {
  name: 'Search',
  data() {
    return {
        searchUrl: 'https://api.github.com/search/repositories',
        reposByLang: [],
        langs: langs, // const
        checkedLangs: []
    }
  },
  methods: {
    searchRepo: function() {
        if(this.checkedLangs.length != 5) {
            alert('Please select 5 languages.')
            return
        }
        this.reposByLang = [] // force reset
        this.checkedLangs.forEach(selectedLang => {  
    
            const params = {
                q: 'language:' + selectedLang.lang_value,
                sort: 'stars',
                order: 'desc'
            }
            axios.get(this.searchUrl, {params})
            .then(res => {
                let data = {
                    lang: selectedLang,
                    repos: res.data.items
                }
                this.reposByLang.push(data) // add to array
                this.saveRepos(data) // save to DB
            })
            .catch(e => {
                console.log(e)
            })
        })

    },
    shapeDataForDB: function(data) {
        let new_data = {
            lang: data.lang.lang_key,
            repos: []
        }
        data.repos.forEach(repo => {
            new_data.repos.push({
                 'id': repo.id,
                 'name': repo.name,
                 'stargazers_count': repo.stargazers_count,
                 'html_url': repo.html_url
            })
        })
        return new_data
    },
    saveRepos: function(data) {
        axios.post(`${serverConfig.apiAddr}`, this.shapeDataForDB(data))
        .then(res => {
            console.log(res) // no handling now, just log the output
        })
        .catch(e => {
            console.log(e)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
caption {
    color: red;
    font-size: 200%;
    }
</style>
