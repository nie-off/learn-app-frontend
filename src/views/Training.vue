<template>
  <div class="training">
    <div class="columns is-multiline">
      <div class="column is-8 is-offset-2">
        <h1 class="title">Training</h1>
      </div>
      <div class="column is-12">
        <div class="box">
          <h3 class="is-size-4 mb-4">{{ currentCard.task }}</h3>
          <div class="field">
            <label class="label">Answer:</label>
            <div class="control">
              <input class="input" type="text" placeholder="Answer" name="answer" v-model="answer"></div>
            </div> 
          </div>
          <button class="button is-success" @click="checkAnswer">Check</button>
          <h4>{{result}}</h4>
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
          currentCard: {},
          answer: "",
          result: ""
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
            // TODO: Select by chance
            this.currentCard = this.cards[0]
          })
          .catch(error => {
            console.log(JSON.stringify(error))
          })
        },
        checkAnswer() {
          let levenshtein_distance = this.similarity(this.answer, this.currentCard.answer)
          if (levenshtein_distance > 0.7) {
            this.result = "CORRECT!"
          } else {
            this.result = "Not correct."
          }


        },
        // Levenshtein Implemention from https://stackoverflow.com/questions/10473745/compare-strings-javascript-return-of-likely
        similarity(s1, s2) {
          var longer = s1;
          var shorter = s2;
          if (s1.length < s2.length) {
            longer = s2;
            shorter = s1;
          }
          var longerLength = longer.length;
          if (longerLength == 0) {
            return 1.0;
          }
          return (longerLength - this.editDistance(longer, shorter)) / parseFloat(longerLength);
        },
        editDistance(s1, s2) {
          s1 = s1.toLowerCase();
          s2 = s2.toLowerCase();
          
          var costs = new Array();
          for (var i = 0; i <= s1.length; i++) {
            var lastValue = i;
            for (var j = 0; j <= s2.length; j++) {
              if (i == 0)
              costs[j] = j;
              else {
                if (j > 0) {
                  var newValue = costs[j - 1];
                  if (s1.charAt(i - 1) != s2.charAt(j - 1))
                  newValue = Math.min(Math.min(newValue, lastValue),
                  costs[j]) + 1;
                  costs[j - 1] = lastValue;
                  lastValue = newValue;
                }
              }
            }
            if (i > 0)
            costs[s2.length] = lastValue;
          }
          return costs[s2.length];
        }
      }
    }
  </script>
  
  <style>
    
  </style>