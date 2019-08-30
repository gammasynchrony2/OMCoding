const request = require('request');



playerIDArray = [592662, 668942, 582494, 642073, 649963, 642496, 545121, 572233, 622065]


// GET A PLAYER'S STATS
for(i = 0; i < playerIDArray.length; i++){
    player_id = playerIDArray[i]
    var urlThree = `http://lookup-service-prod.mlb.com/json/named.sport_hitting_tm.bam?league_list_id='mlb'&game_type='R'&season='2018'&player_id=${player_id}`;
    request(urlThree, function (err, response, body) {
        if(err) {
            console.log(err);
        } else {
            let thePlayer = JSON.parse(body);
            console.log(thePlayer.sport_hitting_tm.queryResults);
        }
    })
}
