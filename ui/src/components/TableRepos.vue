<template>
  <table class="table table-hover">
    <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col"><font-awesome-icon icon="fa-solid fa-code" /> Repository</th>
        <th scope="col"><font-awesome-icon icon="fa-solid fa-house" /> Homepage</th>
        <th scope="col"><font-awesome-icon icon="fa-solid fa-scale-balanced" /> License</th>
        <th scope="col"><font-awesome-icon icon="fa-solid fa-star" /> Stars</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td colspan="5" v-if="(!repos || repos.length === 0)"
          class="fs-3 text fw-boldertext-center text-muted border-bottom-0">No selection</td>
      </tr>
      <tr v-for="repo in repos" :key="repo.id">
        <th class="text-start text small">{{ repo.id }}</th>
        <td><a :href="repo.url" target="_blank" :title="repo.description" data-bs-toggle="tooltip"
            data-bs-placement="top">{{
              repo.full_name
            }}</a></td>
        <td><a :href="repo.homepage" target="_blank" :title="repo.homepage">{{ repo.homepage }}</a></td>
        <td v-if="repo.license">{{ repo.license.name }}</td>
        <td class="text-muted" v-else>None</td>
        <td>{{ repo.stars }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { Tooltip } from 'bootstrap/dist/js/bootstrap'

export default {
  name: 'TableRepos',
  props: ['repos'],
  mounted() {
    new Tooltip(document.body, {
      selector: "[data-bs-toggle='tooltip']",
    })
  }
}
</script>