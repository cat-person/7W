<script>
import wonders from '@/assets/wonders.json'
import colors from '@/assets/colors.json'
import * as util from '@/utils/calc';

const url = 'https://vuejs.org/images/logo.png'

export default {
    props: {
        playerScore: Object
    },

    data() {
        console.error(`Player.data: ${JSON.stringify(this.playerScore)}`)
        return {
            wonders: wonders,
            playerScore: this.playerScore,
            colors: colors,
            pointsByCategory: {
                wonder: 32,//util.calcWonderPoints(playerScore.wonder.id, playerScore.wonder.side, playerScore.wonder.stageBuilt),
                gold: 12,
                military: 6,
            }
        }
    },
    methods: {
        getWonderById(wonderId) {
            console.error(`Player.getWonderById(wonderId: ${wonderId})`)

            let result = undefined
            this.wonders.forEach((wonder) => { 
            if(wonder.id == wonderId){
                result = wonder
            }
            })
            return result
        },
        
        getWonderByIdAndSide(wonderId, side) {
            console.error(`Player.getWonderById(wonderId: ${wonderId})`)

            let wonder = this.getWonderById(wonderId)
            if(side == 'A') {
                return wonder.A
            } else {
                return wonder.B
            }
            
        },  
        getImageByWonder(wonderId, side) {
            let wonder = this.getWonderByIdAndSide(wonderId, side)
            return new URL(`../../../assets/${wonder.img}`, import.meta.url)
        },
            
        getPointsByCategory(playerScore) {
            console.error(`Player.getPointsByCategory(playerScore: ${JSON.stringify(playerScore)})`)
            console.error(`Player.getPointsByCategory(playerScore.goldCount: ${JSON.stringify(playerScore.goldCount)})`)
            return [
                {
                    name: 'wonder',
                    color: colors.wonder,
                    points: util.calcWonderPoints(
                        this.getWonderById(playerScore.wonder.id),
                        playerScore.wonder.side,
                        playerScore.wonder.stageBuilt
                    )
                },
                {
                    name: 'gold',
                    color: colors.gold,
                    points: util.calcGoldPoints(playerScore.goldCount)
                },
                {
                    name: 'military',
                    color: colors.military,
                    points: util.calcMilitary(playerScore.battles)
                },
                {
                    name: 'culture',
                    color: colors.culture,
                    points: playerScore.culturePoints
                },
                {
                    name: 'trade',
                    color: colors.trade,
                    points: playerScore.tradePoints
                },
                {
                    name: 'science',
                    color: colors.science,
                    points: util.calcSciencePoints(
                        playerScore.science.clayCount, 
                        playerScore.science.measurerCount,
                        playerScore.science.cogCount
                    )
                },  
                {
                    name: 'guild',
                    color: colors.guild,
                    points: playerScore.guildPoints
                }
            ]
        },

        handleEditClicked(playerScore){
            this.$emit("editClicked", playerScore)
        }
    }
}
</script>

<template>
    <div class='img' :style="{ 
        'background-image': 'url(' + getImageByWonder(playerScore.wonder.id, playerScore.wonder.side) + ')', 
        'background-size': 'cover',
        'background-repeat': 'no-repeat'
        }" @click="handleEditClicked(playerScore)">
        <h2 class="wonder-lbl"  >{{getWonderById(playerScore.wonder.id).name}} ({{ playerScore.wonder.side }}): {{playerScore.name}}</h2>
        <tbody class="table">
            <td v-for="scoreItem in getPointsByCategory(playerScore)" :key="scoreItem.name">
                <div class="point-container" :style="{'background-color': scoreItem.color}">
                    <tr>{{ scoreItem.name }}</tr>
                    <tr>{{ scoreItem.points }}</tr>
                </div>
            </td>
        </tbody>
    </div>
</template>

<style scoped>
  .point-container {
    justify-content: center;
    justify-items: center;
    width: 20mm;
  }
  .img {
    width: 160mm;
    height: 50mm;
    justify-items: center;
  }
  .table {
    vertical-align: bottom;
    height: 35mm;
    padding: 2mm;
  }
  .wonder-lbl {
    color: white;
    text-shadow: 0px 0px 10px gray;
  }
</style>