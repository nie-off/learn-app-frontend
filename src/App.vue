<template>
  <nav class="navbar is-info" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item" id="brandName"><strong>{{this.$options.name}}</strong></router-link>
      <div class="navbar-burger" @click="showNav = !showNav" :class="{ 'is-active': showNav }">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <div class="navbar-menu" :class="{ 'is-active': showNav }">
      <div class="navbar-start">
        <template v-if="$store.state.isAuthenticated">
          <router-link to="/training" class="navbar-item"><font-awesome-icon class="marginRight" icon="fa-solid fa-vial"/>Training</router-link>
          <router-link to="/cards" class="navbar-item"><font-awesome-icon class="marginRight" icon="fa-solid fa-rectangle-list"/>Cards</router-link>
        </template>
        
      </div>
      <div class="navbar-end">
        <template v-if="$store.state.isAuthenticated">
          <div class="navbar-item">
            <button class="button is-danger" @click="logout">Logout</button>
          </div>
        </template>
        <template v-else>
          <div class="navbar-item">
            <div class="buttons">
              <router-link to="/create" class="button is-success">Sign Up</router-link>
              <router-link to="/login" class="button is-light">Login</router-link>
            </div>
          </div>
        </template>
      </div>
    </div>
  </nav>
  <section class="section">
    <router-view/>
  </section>
  
  <footer class="footer">
    <p class="content has-text-centered">Check out the source code of <strong>{{this.$options.name}}</strong> on <a href="https://github.com/nie-off">Github</a>! Created in October 2022.</p>
  </footer>
</template>

<script>
  import axios from 'axios'
  
  export default {
    name: 'LearnApp',
    data() {
      return {
        showNav: false
      }
    },
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
    },
    methods: {
      logout() {
        this.$store.commit('deleteToken')
        localStorage.removeItem("token")
        axios.defaults.headers.common["Authorization"] = ""        
      }
    }
  }
</script>

<style lang="scss">
  @import '../node_modules/bulma';
  
  #brandName {
    font-size: 20px;
  }
  .marginRight {
    margin-right: 3px;
  }
</style>