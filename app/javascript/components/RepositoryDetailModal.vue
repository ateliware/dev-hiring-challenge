<template>
    <div class="modal fade container-detail" id="repository-modal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{dataRepository.name}}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <article class="text-start">
                        <div class="d-flex justify-content-between align-items-center">
                            <div title="stargazers">
                                <font-awesome-icon icon="star"/><span>{{dataRepository.stargazers_count}}</span>
                            </div>
                            <div title="forks">
                                <font-awesome-icon icon="code-branch"/><span>{{dataRepository.forks_count}}</span>
                            </div>
                            <div title="open issues">
                                <font-awesome-icon icon="exclamation-circle"/><span>{{dataRepository.open_issues_count}}</span>
                            </div>
                            <div title="watchers">
                                <font-awesome-icon icon="eye"/><span>{{dataRepository.watchers_count}}</span>
                            </div>
                        </div>
                        <div class="mt">{{dataRepository.description}}</div>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="d-flex justify-content-start align-items-center">
                                <img class="rounded-circle" :src="dataRepository.owner_avatar_url">
                                <p class="mb-0">{{dataRepository.owner_name}}</p>
                            </div>
                            <div>
                                <small>Create: {{dataRepository.github_create}}</small><br/>
                                <small>Update: {{dataRepository.github_update}}</small>
                            </div>
                        </div>
                    </article>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <a :href="dataRepository.html_url" class="btn btn-primary">Ver no github</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Modal } from 'bootstrap'

export default {
    name: 'RepositoryDetailModal',
    mounted(){
        this.repositoryModal = new Modal(document.getElementById('repository-modal'))
    },
    props:{
        dataRepository: {}
    }
}
</script>

<style>
    .container-detail img{
        width: 30px;
        height: 30px;
        margin-right: 4px;
    }

    .container-detail small{
        font-size: 12px;
        color: #999999;
    }

    .container-detail .mt{
        margin: 32px 0;
    }

    .container-detail span{
        margin-left: 4px;
    }
</style>