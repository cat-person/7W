<template>
  <div id="app">
    <h1> Players </h1>

    <div class="players" v-for="(playerScore, index) in playerScores" :key="index">
      <Player :playerScore="playerScore" @editClicked="editPlayer($event)"/>
    </div>

    <div class="vertical">
      <button class="button" @click="addNewPlayer">Add Player</button>
      <button class="new_game_button" @click="startNewGame">Start new game</button>
    </div>
  </div>
</template>

<script>
  import wonders from '@/assets/wonders.json'
  import Player  from './components/Player.vue';

  export default {
    data() {
      console.error(`Players.data(): { playerScores: ${JSON.stringify(this.playerScores)} }`)
      return {
        playerScores: this.playerScores,
        wonders: wonders,
      };
    },
    props: {
      playerScores: Array
    },
    components: {
      Player
    },
    methods: {
      addNewPlayer(){
        this.$emit("addNewPlayer")
      },
      startNewGame(){
        this.$emit("startNewGame")
      },
      editPlayer(playerScore){
        this.$emit("editPlayer", playerScore)
      },
    }
  }
</script>

<style scoped>
  .players {
    justify-self: center;
    justify-items: center;
  }
  .button {
    margin: 4mm
  }

  .new_game_button {
    margin: 4mm;
    background-color: rosybrown;
  }

  .vertical {
    display: flex;
    flex-direction: column;
    justify-self: center;
    width: 40mm;
  }

</style>