<template>
  <div class="home">
    <div class="columns">
      <div class="column is-8 is-offset-2">
        <h1 class="title">Start</h1>
        <template v-if="$store.state.isAuthenticated">
          <h3>Hello {{$store.state.user.username}}!</h3>
        </template>
        <template v-else>
          <h3>Hello guest! Consider signing up or logging in to use the provided flash card functionalities.</h3>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HomeView'
  }
</script>
