<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <template v-if="$store.state.isAuthenticated">
      <button class="button is-danger" @click="logout">Logout</button>
    </template>
    <template v-else>
    <router-link to="/create">Create Account</router-link> |
    <router-link to="/login">Login</router-link> |
    </template>
  </nav>
  <router-view/>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'App',
    beforeCreate() {
      this.$store.commit('initStore')
      const token = this.$store.state.token

      if (token) {
        axios.defaults.headers.common["Authorization"] = "Token " + token;
      } else {
        axios.defaults.headers.common["Authorization"] = "";
    }
  },
  mounted() {
    document.title = 'Learn Application'
    // TODO: Debugging
    console.log(this.$store.state.isAuthenticated)
  },
  methods: {
    logout() {
      this.$store.commit('deleteToken')
    }
  }
}
</script>

<style lang="scss">
  @import '../node_modules/bulma'
</style>