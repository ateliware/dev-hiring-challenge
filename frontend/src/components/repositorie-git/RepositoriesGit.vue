<template>
<div>
    <table class="table">
        <thead>
            <tr>
                <td>Código</td>
                <td>Autor/Repositório</td>
                <td>Linguagem</td>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(repo) in repositories" :key="repo.ID">
                <td>{{ repo.ID }}</td>
                <td>{{ repo.OWNER }}</td>
                <td>{{ repo.LANGUAGE }}</td>
                <td>
                    <a 
                        class="btn btn-primary btn-sm tooltip tooltip-left"
                        data-tooltip="Informação"
                        @click="openModal(repo)"
                    >
                        <i class="icon icon-more-vert"></i>
                    </a>
                </td>
            </tr>
        </tbody>
    </table>
    <Modal 
        v-show="isVisibleModal"
        :repositorie="repoModal"
        @close="closeModal"
    />
</div>
</template>

<script>
import { useStore } from "vuex";
import { computed, reactive, toRefs } from "vue";
import Modal from '../modal/InformationRepositorie.vue'

export default {
    name: 'RepositoriesGit',
    components: {
        Modal
    },
    setup() {
        const data = reactive({
            isVisibleModal: false,
            repoModal: {}
        })
        const store = useStore()
        const repositories = computed(() => store.getters.getRepositories)

        const closeModal = () => {
            data.isVisibleModal = false
        }

        const openModal = (repo) => {
            data.isVisibleModal = true
            data.repoModal = repo
        }

        return {
            repositories,
            ... toRefs(data),
            closeModal,
            openModal
        }
    }    
}
</script>