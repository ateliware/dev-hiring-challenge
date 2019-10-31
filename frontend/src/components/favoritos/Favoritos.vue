<template>
    <div>
        <div class="container">
            <div class="card-columns">
                <div v-for="(repos,id) in repos" :key="id">
                    <div class="card" style="width:320px">
                        <img class="card-img-top" :src="repos.image" alt="Card image" id="imagem" />
                        <div class="card-body">
                            <h4 class="card-title">{{repos.name}}</h4>
                            <router-link :to="{name:'detalhes',params:{id:`${repos.id_github}`}}">
                                <button class="btn btn-secondary">Detalhes</button>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { baseApiUrl } from '@/global'

export default {
    name: 'Favoritos',
    data: function() {
        return {
            repos: {}
        }
    },
    methods: {
        get() {
            const url = `${baseApiUrl}/repos`
            axios(url).then(res => {
                this.repos = res.data
            })
        },
        back() {
            this.$router.go(-1)
        }
    },
    mounted() {
        this.get()
    }
}
</script>

<style>
#imagem {
    width: 100%;
}
</style>