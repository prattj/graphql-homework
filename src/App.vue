<template>
  <div id="app">
    <h1>Latest Block</h1>
    <button @click="fetch">Load</button>
    <hr>
    <vue-json-pretty
      :path="'res'"
      :data="response">
    </vue-json-pretty>
  </div>
</template>
<script>
import axios from 'axios'
import VueJsonPretty from 'vue-json-pretty'
export default {
  name: 'app',
  data () {
    return {
      response: {}
    }
  },
  methods: {
    async fetch () {
      try {
        const res = await axios.post('http://localhost:4000/graphql', {
          query: '{ getRecentBlock { id action_cnt } }'
        })
        this.response = res.data.data.getRecentBlock
      } catch (e) {
        // eslint-disable-next-line
        console.log('err', e)
      }
    }
  },
  components: {
    VueJsonPretty
  }
}
</script>
