<template>
  <div class="card-create">
    <div class="columns">
      <div class="column is-8 is-offset-2">
        <h1 class="title">Edit a Card</h1>
        <form>
        <div class="field">
          <label>Task</label>  
          <div class="control">
            <input type="text" name="name" class="input" placeholder="Task" v-model="card.task">
          </div>
        </div>
        <div class="field">
          <label>Answer</label>  
          <div class="control">
            <input type="text" name="name" class="input" placeholder="Answer" v-model="card.answer">
          </div>
        </div>
        <div class="notification is-danger" v-if="errors.length">
          <p v-for="error in errors" v-bind:key="error">
            {{ error }}
          </p>
        </div>
        
        <div class="field">
          <div class="control">
            <button class="button is-success" @click="updateCard">Update</button>
          </div>
        </div>
      </form>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  
    export default {
      name: 'CardEdit',
      data() {
        return {
          card: {},
          cardId : null,
          errors : []
        }
      },
      mounted() {
        this.cardId = this.$route.params.id
        this.getCard()
      },
      methods: {
        getCard() {
          axios
          .get('/api/v1/cards/' + this.cardId)
          .then(response => {
            console.log(response);
            this.card = response.data
          })
          .catch(error => {
            console.log(JSON.stringify(error))
          })
        },
        updateCard(e) {
        e.preventDefault()
        axios
          .patch(`/api/v1/cards/${this.cardId}/`, this.card)
          .then(response => {
          this.$router.push('/cards')
        })
        .catch(error => {
          console.log(error)
          if (error.response) {
            for (const property in error.response.data) {
              if (error.response.data.length < 50)
              this.errors.push(`${property}: ${error.response.data[property]}`)
            }
            console.log(JSON.stringify(error.response.data))
          } else {
            console.log(JSON.stringify(error))
          }
        })
      }
      }
    }
  </script>

<style>

</style>