<template>
  <div>
    Welcome to GitHub Repositories collector!
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async mounted () {
    await this.fetchRepositories()
  },
  methods: {
    async fetchRepositories () {
      const test = await this.$axios.$get(`${process.env.SERVER_URL}/repository`)
      console.log(test)
    }
  }
})
</script>
