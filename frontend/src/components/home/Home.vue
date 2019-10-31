<template>
    <div>
        <div class="container">
            <div class="form-group">
                <label for="local">Linguagem</label>
                <select class="form-control" id="exampleFormControlSelect1" v-model="linguagem">
                    <option value disabled selected>Selecione a linguagem</option>
                    <option>Javascript</option>
                    <option>PHP</option>
                    <option>Go</option>
                    <option>C</option>
                    <option>MATLAB</option>
                </select>
            </div>
            <button @click="buscar" class="btn btn-secondary" id="buscar">Buscar</button>
            <div class="card-columns">
                <div v-for="(repos,id) in repos" :key="id">
                    <div class="card" id="card">
                        <img
                            class="card-img-top"
                            :src="repos.owner.avatar_url"
                            alt="Card image"
                            id="imagem"
                        />
                        <div class="card-body">
                            <h4 class="card-title">{{repos.name}}</h4>
                            <router-link :to="{name:'detalhes',params:{id:`${repos.id}`}}">
                                <button class="btn btn-secondary">Detalhes</button>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
            <button v-if="loadMore" type="button" @click="getRepo" class="btn btn-secondary">
                <i class="fa fa-refresh" aria-hidden="true"></i> Carregar mais
            </button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { baseApiUrl } from '@/global'

export default {
    name: 'Home',
    data: function() {
        return {
            repos: {},
            linguagem: '',
            page: 1,
            loadMore: false
        }
    },
    methods: {
        buscar() {
            const url = `${baseApiUrl}/repos/${this.linguagem}`
            axios(url).then(res => {
                this.repos = res.data
                this.loadMore = true
            })
        },
        getRepo() {
            this.page++
            const url = `${baseApiUrl}/repos/${this.linguagem}?page=${this.page}`
            axios(url).then(res => {
                this.repos = this.repos.concat(res.data)
            })
        }
    }
}
</script>

<style>
a.card-block {
    color: black;
}

#buscar {
    margin-bottom: 10px;
}

#card {
    width: 320px;
}

#iamgem {
    width: 100%;
}
</style>