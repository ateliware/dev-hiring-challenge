<template>
<div v-if="repositorie.OWNER != undefined" class="modal active" id="modal-id">
    <a href="#close" class="modal-overlay" aria-label="Close"></a>
    <div class="modal-container">
        <div class="modal-header">
        <a href="#close" class="btn btn-clear float-right" aria-label="Close" @click="$emit('close')"></a>
        <div class="modal-title h5">
            <icon class="icon icon-people"></icon>
            {{ repositorie.OWNER }}
        </div>
        </div>
        <div class="modal-body">
        <div class="content">
            
                <table class="table">
                    <thead>
                        <tr>
                            <td>Criado Em</td>
                            <td>Atualizado Em</td>
                            <td>URL</td>
                            <td>Nº Releases</td>
                            <td>Popularidade</td>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{ moment(repositorie.CREATED_AT).format('DD/MM/YYYY') }}</td>
                            <td>{{ moment(repositorie.UPDATED_AT).format('DD/MM/YYYY') }}</td>
                            <td>{{ repositorie.URL }}</td>
                            <td>{{ repositorie.RELEASES }}</td>
                            <td>{{ repositorie.STARGAZER }}</td>
                        </tr>
                    </tbody>
                </table>
             
            
        </div>
        </div>
        <div class="modal-footer">
            {{ repositorie.LANGUAGE }}
        </div>
    </div>
</div>
</template>
<script>
import moment from 'moment';

export default {
    name: 'InformationRepositorie',
    props: {
        repositorie: { type: Object, required: true }
    },
    emits: ['close'],

    setup() {
        return {
            moment
        }
    }

    
}
</script>

<style scoped>
.modal-container {
    max-width: 1000px !important;
}
</style>