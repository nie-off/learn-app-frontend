<!-- Highly inspired from https://codesandbox.io/embed/github/jamiemccarville/vue-flipping-card-demo and adapted -->
<template>
    <div class="scene">
        <div class="card"
        @click="cardOne == 'start' ? (cardOne = 'flipped' ) : (cardOne = 'start' )"
        v-bind:class="{ flip: cardOne == 'flipped' }">
        
        <div class="cardFace">
            <div class="card-content">
                <div class="content">
                    {{front}}
                </div>
            </div>
        </div>
        <div class="cardFace flip">
            <div class="card-content">
                <div class="content">
                    Antwort:<br/>{{back}}
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    export default {
        data() {
            return {
                cardOne: "start"
            }
        }, props: {
            front: {
                type: String,
                default: ''
            },
            back: {
                type: String,
                default: ''
            }
        }
    }
</script>

<style scoped>
    .scene {
        width: 100%;
        height: 10rem;
        border: 1px solid #ccc;
        perspective: 600px;
    }
    
    .card {
        width: 100%;
        height: 100%;
        transition: transform 1s;
        transform-style: preserve-3d;
    }
    
    .cardFace {
        position: absolute;
        width: 100%;
        height: 100%;
        text-align: center;
        font-weight: bold;
        backface-visibility: hidden;
    }
    
    .flip {
        transform: rotateY(180deg);
    }
</style>