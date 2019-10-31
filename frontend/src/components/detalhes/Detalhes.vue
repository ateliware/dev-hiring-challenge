<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-4">
                <img :src="repos.owner.avatar_url" height="300px" width="300px" />
            </div>
            <div class="col-lg-8">
                <form>
                    <div class="form-group">
                        <label for="local">Nome</label>

                        <input
                            class="form-control form-control"
                            id="local"
                            type="text"
                            v-model="repos.name"
                        />
                    </div>
                    <div class="form-group">
                        <label for="valor">Stars</label>
                        <input
                            class="form-control form-control"
                            type="text"
                            v-model="repos.stargazers_count"
                        />
                    </div>
                    <div class="form-group">
                        <label for="valor">Forks</label>
                        <input
                            class="form-control form-control"
                            type="text"
                            v-model="repos.forks_count"
                        />
                    </div>
                    <div class="form-group">
                        <label for="valor">Descrição</label>
                        <textarea
                            class="form-control"
                            rows="5"
                            id="comment"
                            v-model="repos.description"
                        ></textarea>
                    </div>
                </form>
            </div>
        </div>

        <button @click="back" id="botao" class="btn btn-light">Voltar</button>
        <button @click="save" class="btn btn-success">
            <i class="fa fa-floppy-o" aria-hidden="true"></i> Salvar
        </button>
    </div>
</template>

<script>
import axios from 'axios'
import { baseApiUrl } from '@/global'

export default {
    name: 'Detalhes',
    data: function() {
        return {
            repos: {}
        }
    },
    methods: {
        get() {
            const url = `${baseApiUrl}/repos/details/${this.repos.id}`
            axios(url).then(res => {
                this.repos = res.data
            })
        },
        back() {
            this.$router.go(-1)
        },
        save() {
            const data = {
                id_github: this.repos.id,
                name: this.repos.name,
                image: this.repos.owner.avatar_url
            }
            const url = `${baseApiUrl}/repos`
            axios
                .post(url, data)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                })
                .catch(error => {
                    this.$toasted.global.defaultError({
                        msg: error.response.data
                    })
                })
        }
    },
    mounted() {
        this.repos.id = this.$route.params.id
        this.get()
    }
}
</script>

<style>
#botao {
    margin-right: 10px;
}
</style>