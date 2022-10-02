<template>
  <div class="cards">
    <div class="columns is-multiline">
      <div class="column is-8 is-offset-4">
        <h1 class="title">List Cards</h1>
        <router-link :to="{name: 'CardCreate'}" class="button is-primary">Create a new Card</router-link>
      </div>
      <div class="column is-12">
        <table class="table is-fullwidth">
          <thead>
            <tr>
              <th>Task</th>
              <th>Answer</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="card in cards" v-bind:key="card.id">
              <td>{{ card.task }}</td>
              <td>{{ card.answer }}</td>
              <td><router-link :to="{name: 'CardDetails', params: { id: card.id }}">Details</router-link></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  
  export default {
    name: 'Cards',
    data() {
      return {
        cards: []
      }
    },
    mounted() {
      this.getCards()
    },
    methods: {
      getCards() {
        axios
        .get('/api/v1/cards')
        .then(response => {
          for (let i = 0; i < response.data.length; i++) {
            this.cards.push(response.data[i])
          }
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