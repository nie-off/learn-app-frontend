<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/create">Create Account</router-link> |
    <router-link to="/login">Login</router-link> |
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
  }
}
</script>

<style lang="scss">
  @import '../node_modules/bulma'
</style>