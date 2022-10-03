<template>
  <div class="card-details">
    <div class="columns">
      <div class="column is-8 is-offset-2">
        <h1 class="title">Card Details</h1>
        <p>{{card.task}}</p>
        <p>{{card.answer}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

  export default {
    name: 'CardDetails',
    data() {
      return {
        card: {}      
      }
    },
    mounted() {
      this.getCard()
    },
    methods: {
      getCard() {
        const cardId = this.$route.params.id

        axios
        .get('/api/v1/cards/' + cardId)
        .then(response => {
          console.log(response);
          this.card = response.data
        })
        .catch(error => {
          console.log(JSON.stringify(error))
        })
      }
    }
  }
</script>

<style>
  
</style>