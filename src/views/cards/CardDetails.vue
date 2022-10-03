<template>
  <div class="card-details">
    <div class="columns">
      <div class="column is-6 is-offset-3">
        <h1 class="title">Card Details</h1>
        <div class="column is-6 is-offset-3">
          <Flash-Card :front="card.task" :back="card.answer"></Flash-Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import FlashCard from "../../components/FlashCard.vue";
  
  export default {
    name: 'CardDetails',
    components: {
      FlashCard
    },
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