<template>
    <div>
        <section class="container text-center">
            <button class="btn btn-primary btn-repositories-search" @click="getRepositories">Get Repositories</button>
            <div class="language-list">
                <button v-for="language in LANGUAGES" v-bind:key="language.id" :class="`btn btn-primary btn-languages ${(LANGUAGE_TO_LIST.id == language.id ? 'active' : '')}`" role="button" @click="setLanguageToList(language)">
                    {{language.name}}
                </button>
            </div>            
            <article v-if="REPOSITORIES.length" class="d-flex justify-content-center row">
                <div v-for="repository in REPOSITORIES" v-bind:key="repository.id" class="card col-md-2" data-bs-toggle="modal" data-bs-target="#repository-modal" @click="repositoryDetail(repository)">
                    <div class="card-body d-grid align-items-center">
                        <h6 class="card-title ">{{repository.name}}</h6>
                        <div class="card-info d-flex justify-content-around">
                            <div>
                                <font-awesome-icon icon="star"/>
                                <small>{{repository.stargazers_count}}</small>
                            </div>
                            <div>
                                <font-awesome-icon icon="code-branch"/>
                                <small>{{repository.forks_count}}</small>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
            <article v-if="!REPOSITORIES.length">
                No repository found
            </article>
            <RepositoryDetailModal :dataRepository="this.dataRepository"/>
        </section>        
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import RepositoryDetailModal from './RepositoryDetailModal'

export default {
    components:{
        RepositoryDetailModal
    },
    data: () => {
        return {
            dataRepository: {}
        }
    },
    computed: {
        ...mapGetters([
            'LANGUAGES',
            'REPOSITORIES',
            'LANGUAGE_TO_LIST'
        ])
    },
    methods: {
        ...mapActions([
            'getRepositories',
            'setLanguageToList'
        ]),
        repositoryDetail(repository){
            this.dataRepository = repository
        }
    },
    mounted(){
        this.getRepositories()
    }
}
</script>

<style scoped>
    .container{
        margin-top: 32px;
        text-align: center;
    }

    .container .btn-languages, 
    .container .card{
        margin: 2px 4px;
    }

    .container .card{
        height: 140px;
    }

    .container .card:hover{
        cursor: pointer;
        border: 1px solid #000080;
    }

    .container .language-list{
        display: flex;
        justify-content: center;
    }

    /* color repositories button */
    .container .btn-repositories-search{
        width: 30%;
        background-color: #1E90FF;
        border: 1px solid #1E90FF;
        margin-bottom: 48px;
    }

    .container .btn-repositories-search:hover{
        background-color: #4682B4;
        border: 1px solid #4682B4;
    }

    /* color primary buttons */
    .btn-primary{
        background-color: #191970;
        border: 1px solid #191970;
    }

    .btn-primary.active,
    .btn-primary:focus,
    .btn-primary:hover{
        background-color: #000080;
        border: 1px solid #000080;
    }

    @media screen and (max-width: 780px) {
        .container .btn-repositories-search{
            width: 100%;
        }

        .container article{
            margin: 0;
        }
    }

    @media screen and (max-width: 440px) {
        .container .language-list{
            width: 100%;
            display: block;
        }

        .container .btn-languages{
            width: 100%;
            margin: 2px 0px;
        }

        .container .btn-repositories-search{
            margin-bottom: 15px;
        }
    }
</style>