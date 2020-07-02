<template>
  <div>
    <saved-repositories></saved-repositories>
  </div>
</template>

<script>
// @ is an alias to /src
import SavedRepositories from "@/components/repositories/SavedRepositories.vue";

export default {
  name: "Repositories",
  components: {
    SavedRepositories
  }
};
</script>
