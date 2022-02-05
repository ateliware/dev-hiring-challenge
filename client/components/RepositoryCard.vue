<template>
  <div class="repository-card">
    <div class="title">
      {{repository.id}}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    repository: {required: true}
  }
})
</script>
