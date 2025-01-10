import wonders from '@/assets/wonders.json'

function getWonder(wonderId, side) {
    console.error(`calc.getWonder (wonderId: ${wonderId}, side: ${side}`)
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
}

export function calcWonderPoints(wonderData) {
    console.error(`calc.calcWonderPoints(wonderData: ${JSON.stringify(wonderData)})`)
    let wonder = getWonder(wonderData.id, wonderData.side)

    let result = 0
    let pointsByStages = wonder.pointsByStages

    for (let idx = 0; idx < pointsByStages.length; idx++) {
        if(idx < wonderData.stageBuilt) {
            result += pointsByStages[idx];
        }
    }
    return result
}

export function calcCoinPoints(givenCoinCount) {
    console.error(`calcCoinPoints(${givenCoinCount})`)
    return Math.floor(givenCoinCount / 3)
}

export function calcMilitary(battles) {
    return calcBattlePoints('I', battles['bronze.left'])
        + calcBattlePoints('I', battles['bronze.right'])
        + calcBattlePoints('II', battles['silver.left'])
        + calcBattlePoints('II', battles['silver.right'])
        + calcBattlePoints('III', battles['golden.left'])
        + calcBattlePoints('III', battles['golden.right'])
}

export function calcBattlePoints(epoch, result) {
    switch(result) {
        case 'defeat': return -1
        case 'draw': return 0
        default: switch(epoch) {
            case 'III': return 5
            case 'II': return 3
            default: return 1
        }
    }
}


export function calcSciencePoints(clayCount, measurerCount, cogCount) {
    return clayCount * clayCount + measurerCount * measurerCount + cogCount * cogCount + 7 * (Math.min.apply(Math, [clayCount, measurerCount, cogCount]))
}

export function calcSum(playerScore) {
    console.error(`calcSum(playerScore: ${JSON.stringify(playerScore)})`)
    let wonderPoints = calcWonderPoints(playerScore.wonder) // err
    let coinPoints = calcCoinPoints(playerScore.coinCount)
    let militaryPoints = calcMilitary(playerScore.battles)
    let culturePoints = playerScore.culturePoints
    let tradePoints = playerScore.tradePoints
    let sciencePoints = calcSciencePoints(playerScore.science.clayCount, playerScore.science.measurerCount, playerScore.science.cogCount)
    let guildPoints = playerScore.guildPoints

    return wonderPoints 
        + coinPoints
        + militaryPoints
        + culturePoints
        + tradePoints
        + sciencePoints
        + guildPoints
}