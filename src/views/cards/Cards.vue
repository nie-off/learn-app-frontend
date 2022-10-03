<template>
  <div class="cards">
    <div class="columns is-multiline">
      <div class="column is-offset-4 is-4 is-offset-5">
        <h1 class="title">Your Flash Cards</h1>
      </div>
      <div class="column is-4">
        <router-link :to="{name: 'CardCreate'}" class="button is-success">Create a new Card</router-link>
      </div>
      <div class="column is-12">
        <table class="table is-fullwidth is-hoverable is-striped">
          <thead>
            <tr>
              <th>Task</th>
              <th>Answer</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="card in cards" v-bind:key="card.id" @mouseover="hover = card.id" @mouseleave="hover = card.id">
              <td>{{ card.task }}</td>
              <td>{{ card.answer }}</td>
              <td v-if="hover == card.id">
                <router-link class="button is-success marginRight" :to="{name: 'CardDetails', params: { id: card.id }}"><font-awesome-icon class="marginRight" icon="fa-solid fa-magnifying-glass"/>Details</router-link>
                <router-link class="button is-warning marginRight" :to="{name: 'CardEdit', params: { id: card.id }}"><font-awesome-icon class="marginRight" icon="fa-solid fa-pencil"/>Update</router-link>
                <button class="button is-danger marginRight" @click="deleteCard(card.id)"><font-awesome-icon class="marginRight" icon="fa-solid fa-trash"/>Delete</button>
              </td>
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
        cards: [],
        hover: null
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
          this.cards = response.data
        })
        .catch(error => {
          console.log(JSON.stringify(error))
        })
      },
      deleteCard(cardId) {
        axios
        .delete('/api/v1/cards/' + cardId)
        .then(result => {
          this.getCards()
        })
      }
    }
  }
</script>
