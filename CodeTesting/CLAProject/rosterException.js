const request = require('request');



let playerIDArray = [
    '605113', '542882', '488671', '605151',
    '605177', '664199', '592233', '605196',
    '641541', '502481', '500871', '527038',
    '668678', '656464', '673633', '430945',
    '543376', '608348', '518876', '571875',
    '502190', '642736', '641796', '661255',
    '606466', '656686', '519008', '606303',
    '444482', '592662', '668942', '582494',
    '642073', '649963', '642496', '545121',
    '572233', '622065'
  ]


// GET A PLAYER'S STATS
const recordArray = []
for (let i = 0; i < playerIDArray.length; i++) {
    let player_id = playerIDArray[i]
    let urlThree = `http://lookup-service-prod.mlb.com/json/named.sport_hitting_tm.bam?league_list_id='mlb'&game_type='R'&season='2019'&player_id=${player_id}`;
    request(urlThree, function (err, response, body) {
        if (err) {
            console.log(err);
        } else {
            let thePlayer = JSON.parse(body);
            if(thePlayer.sport_hitting_tm.queryResults.totalSize == 1) {
                recordArray.push([i,player_id, thePlayer.sport_hitting_tm.queryResults.row.obp]);
            } else if(thePlayer.sport_hitting_tm.queryResults.totalSize > 1) {
                recordArray.push([i, player_id, thePlayer.sport_hitting_tm.queryResults.row[0].obp])
            } else {
                recordArray.push([i, player_id,thePlayer.sport_hitting_tm.queryResults.totalSize])
            }
            
            // console.log(recordArray)
        }
    })
}
let recordArrayOrganized = [];
setTimeout(() => {
    console.log(recordArray);
    for( let i = 0; i < recordArray.length; i++) {
        if (recordArray[i][0] == 0) {recordArray[i][0] = 'aa'}
        else if(recordArray[i][0] == 1) {recordArray[i][0] = 'ab'}
        else if(recordArray[i][0] == 2) {recordArray[i][0] = 'ac'}
        else if(recordArray[i][0] == 3) {recordArray[i][0] = 'ad'}
        else if(recordArray[i][0] == 4) {recordArray[i][0] = 'ae'}
        else if(recordArray[i][0] == 5) {recordArray[i][0] = 'af'}
        else if(recordArray[i][0] == 6) {recordArray[i][0] = 'ag'}
        else if(recordArray[i][0] == 7) {recordArray[i][0] = 'ah'}
        else if(recordArray[i][0] == 8) {recordArray[i][0] = 'ai'}
        else if(recordArray[i][0] == 9) {recordArray[i][0] = 'aj'}
        else if(recordArray[i][0] == 10) {recordArray[i][0] = 'ak'}
        else if(recordArray[i][0] == 11) {recordArray[i][0] = 'al'}        
        else if(recordArray[i][0] == 12) {recordArray[i][0] = 'am'}
        else if(recordArray[i][0] == 13) {recordArray[i][0] = 'an'}
        else if(recordArray[i][0] == 14) {recordArray[i][0] = 'ao'}
        else if(recordArray[i][0] == 15) {recordArray[i][0] = 'ap'}
        else if(recordArray[i][0] == 16) {recordArray[i][0] = 'aq'}
        else if(recordArray[i][0] == 17) {recordArray[i][0] = 'ar'}
        else if(recordArray[i][0] == 18) {recordArray[i][0] = 'as'}
        else if(recordArray[i][0] == 19) {recordArray[i][0] = 'at'}
        else if(recordArray[i][0] == 20) {recordArray[i][0] = 'au'}
        else if(recordArray[i][0] == 21) {recordArray[i][0] = 'av'}
        else if(recordArray[i][0] == 22) {recordArray[i][0] = 'aw'}
        else if(recordArray[i][0] == 23) {recordArray[i][0] = 'ax'}
        else if(recordArray[i][0] == 24) {recordArray[i][0] = 'ay'}
        else if(recordArray[i][0] == 25) {recordArray[i][0] = 'az'}
        else if(recordArray[i][0] == 26) {recordArray[i][0] = 'ba'}
        else if(recordArray[i][0] == 27) {recordArray[i][0] = 'bb'}
        else if(recordArray[i][0] == 28) {recordArray[i][0] = 'bc'}
        else if(recordArray[i][0] == 29) {recordArray[i][0] = 'bd'}
        else if(recordArray[i][0] == 30) {recordArray[i][0] = 'be'}
        else if(recordArray[i][0] == 31) {recordArray[i][0] = 'bf'}
        else if(recordArray[i][0] == 32) {recordArray[i][0] = 'bg'}
        else if(recordArray[i][0] == 33) {recordArray[i][0] = 'bh'}
        else if(recordArray[i][0] == 34) {recordArray[i][0] = 'bi'}
        else if(recordArray[i][0] == 35) {recordArray[i][0] = 'bj'}
        else if(recordArray[i][0] == 36) {recordArray[i][0] = 'bk'}
        else if(recordArray[i][0] == 37) {recordArray[i][0] = 'bl'}
        else if(recordArray[i][0] == 38) {recordArray[i][0] = 'bm'}
        else if(recordArray[i][0] == 39) {recordArray[i][0] = 'bn'}
    }
    recordArrayOrganized = recordArray.sort()
    let OBPArray = [];
    for( let i = 0; i < recordArrayOrganized.length; i++) {
        OBPArray.push(recordArrayOrganized[i][2]);
    }
    console.log(OBPArray)
},1500)

// Create OBP array


