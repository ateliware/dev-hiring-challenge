<template>
  <v-row align="center" class="px-3 mx-auto mt-5">
    <v-col cols="12" sm="12" >
      <v-card class="mx-auto" tile>
        <v-card-title>Repositórios</v-card-title>

        <v-data-table
          :headers="headers"
          :items="repositories"
          disable-pagination
          :hide-default-footer="true"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editRepository(item.id)">mdi-plus</v-icon>
            <v-icon small @click="deleteRepository(item.id)">mdi-delete</v-icon>
          </template>
        </v-data-table>

        <v-card-actions v-if="repositories.length > 0">
          <v-btn small color="error" @click="removeAllRepositories">
            Deletar todos
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import RepositoryDataService from "../services/RepositoryDataService";
export default {
  name: "repositories-list",
  data() {
    return {
      repositories: [],
      name: "",
      headers: [
        { text: "Nome", align: "start", sortable: false, value: "name" },
        // { text: "Avatar", value: "avatar_url", sortable: false },
        { text: "Linguagem", value: "language", sortable: false },
        // { text: "Dono", value: "owner", sortable: false },
        { text: "Qtd. Estrelas", value: "stargazers_count", sortable: false },
        // { text: "Forks", value: "forks", sortable: false },
        { text: "URL", value: "html_url", sortable: false },
        // { text: "Descriçao", value: "description", sortable: false },
        { text: "Actions", value: "actions", sortable: false }
      ],
    };
  },
  methods: {
    retrieveRepositories() {
      RepositoryDataService.getAll()
        .then((response) => {
          this.repositories = response.data.map(this.getDisplayRepository);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveRepositories();
    },

    removeAllRepositories() {
      RepositoryDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    // searchName() {
    //   console.log(this.name)
    //   RepositoryDataService.findByName(this.name)
    //     .then((response) => {
    //       this.repositories = response.data.map(this.getDisplayRepository);
    //       console.log(response.data);
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // },

    editRepository(id) {
      this.$router.push({ name: "repository-details", params: { id: id } });
    },

    deleteRepository(id) {
      RepositoryDataService.delete(id)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getDisplayRepository(repository) {
      console.log(repository)
      return {
        id: repository.id,
        avatar_url: repository.avatar_url,
        name: repository.name,
        language: repository.language,
        owner: repository.owner,
        stargazers_count: repository.stargazers_count,
        forks: repository.forks,
        html_url: repository.html_url,
        description: repository.description.length > 30 ? repository.description.substr(0, 30) + "..." : repository.description,
      };
    },
  },
  mounted() {
    this.retrieveRepositories();
  },
};
</script>

<style>
/* .list {
  max-width: 750px;
} */
</style>