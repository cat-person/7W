<template>
  <Players 
    v-if="state.id === 'players'" 
    :playerScores="playerScores" 
    @addNewPlayer="handleAddNewPlayer()"
    @editPlayer="handleEditPlayer($event)" 
    @startNewGame="handleStartNewGame()"/>
  <EditPlayer 
    v-if="state.id === 'edit_player'" 
    :availableWonders="getAvailableWonders()"
    :playerScore="state.playerScore"
    @finishEditing="handleFinishEditting($event)"   
  />
  <AddPlayer v-if="state.id === 'add_player'" :availableWonders="getAvailableWonders()"
    @playerAdded="handlePlayerAdded($event)" />
</template>

<script>
import Players from './routes/Players/Players.vue'
import AddPlayer from './routes/AddPlayer/AddPlayer.vue'
import EditPlayer from './routes/AddPlayer/EditPlayer.vue'

import wonders from '@/assets/wonders.json'

function defaultState(localStorage) {
  let result = { id: 'players' }
  if(localStorage.getItem('state')) {
    result = JSON.parse(localStorage.getItem('state'))
  }
  return result
}

function defaultPlayerScores(localStorage) {
  let result = []
  if(localStorage.getItem('playerScores')) {
    result = JSON.parse(localStorage.getItem('playerScores'))
  }
  return result
}


export default {
  name: 'App',
  components: {
    Players,
    AddPlayer,
    EditPlayer,
  },

  data() {
    return {
      wonders: wonders,
      state: defaultState(window.localStorage), 
      playerScores: defaultPlayerScores(window.localStorage)
    }
  },

  methods: {
    getAvailableWonders() {
      let result = []
      wonders.forEach(wonder => {
        if (!this.playerScores.some((playerScore) => wonder.id == playerScore.wonder.id)) {
          result.push(wonder.id)
        }
      })
      return result
    },
    handleAddNewPlayer() {
      this.state = {
        id: 'add_player',
      }
      window.localStorage.setItem('state', JSON.stringify(this.state))
    },
    handleEditPlayer(playerScore) {
      this.state = { 
        id: 'edit_player',
        playerScore: playerScore
       }
      window.localStorage.setItem('state', JSON.stringify(this.state))
    },
    handlePlayerAdded(playerScore) {
      this.playerScores.push(playerScore)
      this.state = { id: 'players' }

      window.localStorage.setItem('state', JSON.stringify(this.state))
      window.localStorage.setItem('playerScores', JSON.stringify(this.playerScores))
    },
    handleStartNewGame(){
      window.localStorage.clear()
      this.state = defaultState(window.localStorage)
      this.playerScores = defaultPlayerScores(window.localStorage)
    },
    handleFinishEditting(givenPlayerScore){
      let editedPlayerIdx = this.playerScores.findIndex(playerScore => playerScore.wonder.id == givenPlayerScore.wonder.id)

      this.playerScores = [...this.playerScores.slice(0, editedPlayerIdx), givenPlayerScore, ...this.playerScores.slice(editedPlayerIdx + 1)]

      this.state = { id: 'players' }

      window.localStorage.setItem('state', JSON.stringify(this.state))
      window.localStorage.setItem('playerScores', JSON.stringify(this.playerScores))
    }
  },
}

</script>

<style>
#app {
  user-select: none;
  text-align: center;
}
</style>
