<script>
  import wonders from '@/assets/wonders.json'
  import * as util from '@/utils/calc';


  function getAvailableWonders(availableWonderIds){
    let result = wonders.filter(wonder => availableWonderIds.some(availableWonderId => availableWonderId == wonder.id))
    console.error(`getAvailableWonders(${JSON.stringify(result)})`)
    return result 
  }

  export default {
    props: {
      wonder: Object,
    },
    data() {
      return {
        // wonder: this.wonder
      }
    },
    methods: {
      getWonder(wonderId, side) {
        console.error(`Wonder.getWonder(wonderId: ${wonderId}, side: ${side})`)

        let result = undefined
        wonders.forEach((wonder) => { 
          if(wonder.id == wonderId){
            result = wonder
          }
        })

        if(side == 'A'){
          return result.A
        } else {
          return result.B
        }  
      },
      getImageByWonder(wonderId, side) {
        console.error(`WonderAndName.getImageByWonder(wonderId: ${wonderId}, side: ${side})`)
        let wonder = this.getWonder(wonderId, side)
        return new URL(`../../../assets/${wonder.img}`, import.meta.url)
      },
      selectWonder(emblaApi) {
        this.$emit('onWonderSelected', getAvailableWonders(this.availableWonderIds)[emblaApi.selectedScrollSnap()].id)
      },
      handleChangeSide() {
        this.$emit('onSideChanged', this.wonder.side == 'A' ? 'B': 'A')
      },
      onChecked(event) {
        console.error(`onChecked(${event})`)
        let id = parseInt(event.srcElement.id)
        let selectedStage = 0
        if(event.srcElement.checked){
          selectedStage = id
        } else {
          selectedStage = id - 1
        }
        this.$emit("onStageBuilt", selectedStage)
      },
      calcWonderPoints(){
        let result = 0
        let pointsByStage = this.getWonder(this.wonder.id, this.wonder.side).pointsByStages
        for (let idx = 0; idx < pointsByStage.length; idx++) {
          if(idx < this.wonder.stageBuilt) {
            result += pointsByStage[idx];
          }
        }
        return result
      }
    }
  }
</script>

<template>
  <div class="container"> 
    <img class="img" v-bind:src="getImageByWonder(wonder.id, wonder.side)"/>
    <button class="btn" @click="handleChangeSide"> {{wonder.side}} </button>
    <div class="horizontal">
      <div v-for="pointsByStage, stageIdx in getWonder(wonder.id, wonder.side).pointsByStages">
        <p> {{ pointsByStage }} </p>
        <input type="checkbox" :checked="stageIdx < wonder.stageBuilt" :id="stageIdx + 1" @change="onChecked($event)"/>
      </div>
    </div>
    <p> {{ wonder.name }} </p>
  </div>
</template>

<style>
  .container {
    justify-self: center;
    width: 160mm;
  }
  .img {
    width: 160mm;
  }
  .btn {
    height:
  }
  .horizontal { 
    display: flex;
    justify-content: center;
    flex-direction: row;
  }
</style>