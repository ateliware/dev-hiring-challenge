<template>
  <div class="bootstrap ml-3 mr-3">
    <p></p>
    <h6 id="topHeader">
      <b-badge variant="primary"> Let´s go!</b-badge>
      Call a Spring Boot REST backend service, by selecting an input and clicking the button:
    </h6>
    <p></p>
    <b-form-select id="bFormSelect" class="w-25" v-model="selected">
      <template v-slot:first>
        <option :value="null" disabled>-- Please select a language --</option>
      </template>
      <option value="c">C</option>
      <option value="php">PHP</option>
      <option value="java">JAVA</option>
      <option value="python">PYTHON</option>
      <option value="javascript">JAVA SCRIPT</option>
    </b-form-select>
    <p></p>
    <b-button ref="bFetchButton" v-if="selected != null" variant="success" @click="callListRestService()">Click to fetch
      top 10
      repositories in GitHub
    </b-button>
    <p></p>
    <div id="div-loading" v-if="fetching" class="d-flex justify-content-center mb-3 mt-5">
      <b-spinner class="mr-2"></b-spinner>
      <h3>Loading...</h3>
    </div>
    <div>
      <b-card-group>
        <b-card v-for="item in restResponse" v-bind:key="item.id" :title="item.name" :img-src="item.owner.avatarUrl">
          <b-card-text class="text-left">
            {{ item.description }}
          </b-card-text>
          <b-button variant="primary" :href="item.htmlUrl">Read more</b-button>
          <template v-slot:footer>
            <small class="text-muted">Followers {{item.watchersCount}}</small>
          </template>
        </b-card>
      </b-card-group>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'service',

  data () {
    return {
      selected: null,
      fetching: false,
      postBody: '',
      restResponse: '',
      errors: []
    }
  },

  methods: {
    callListRestService () {
      // before a request is made start the loading spinner
      axios.interceptors.request.use(config => {
        this.fetching = true
        return config
      })

      // before a response is returned stop the loading spinner
      axios.interceptors.response.use(response => {
        this.fetching = false
        return response
      })

      axios.post(`/repositories`, JSON.parse('{"language":"' + this.selected + '"}'))
        .then(response => {
          // JSON responses are automatically parsed.
          this.restResponse = response.data.items
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  }
}
</script>
