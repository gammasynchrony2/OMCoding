const request = require('request');
var team_id = 101;
var player_id = "'493316'"
var game_type = "'R'"
var season = "'2018'"

var url = `http://lookup-service-prod.mlb.com/json/named.roster_40.bam?team_id=${team_id}`
var urlTwo = "http://lookup-service-prod.mlb.com/json/named.team_all_season.bam?sport_code='mlb'&all_star_sw='N'&sort_order=name_asc&season='2019'"
var urlThree = `http://lookup-service-prod.mlb.com/json/named.sport_hitting_tm.bam?league_list_id='mlb'&game_type=${game_type}&season=${season}&player_id=${player_id}`

var teamIDs;
var teamNameArray;

// GET A PLAYER'S STATS
request(urlThree, function (err, response, body) {
    if(err) {
        console.log(err);
    } else {
        let thePlayer = JSON.parse(body);
        console.log(thePlayer.sport_hitting_tm.queryResults);
    }
})

// GET A LIST OF THE MLB.COM TEAM ID NUMBERS FOR THE NATIONAL LEAGUE (sorted by team name)
request(urlTwo, function (err, response, body) {
    if(err) {
        console.log(err);
    } else {
        let theObject = JSON.parse(body);
        let teamArray = theObject.team_all_season.queryResults.row;
        // filter for national league teams
        let natsOnly = teamArray.filter(function(team) {
            return team.league_id == 104;
        })
        // return a list of team IDs:
        teamIDs = natsOnly.map(function(team) {
            return team.team_id;
        })
    }
});

// GET A LIST OF THE MLB.COM TEAM NAMES FOR THE NATIONAL LEAGUE (sorted by team name)
request(urlTwo, function (err, response, body) {
    if(err) {
        console.log(err);
    } else {
        let theObject = JSON.parse(body);
        let teamArray = theObject.team_all_season.queryResults.row;
        // filter for national league teams
        let natsOnly = teamArray.filter(function(team) {
            return team.league_id == 104;
        })
        // return a list of team names:
        teamNameArray = natsOnly.map(function(team) {
            return team.name_display_long;
        })
    }
});

// setTimeout(function() {
//     console.log(teamIDs);
//     console.log(teamNameArray);
// }, 3000);

// GET A LIST OF PLAYER NAMES FOR A TARGET TEAM
request(url, function (err, response, body) {
    if(err) {
        console.log(err);
    } else {
        let theObject = JSON.parse(body);
        // create an array of player objects
        let playerArray = theObject.roster_40.queryResults.row;
        // for each of the player objects, get the player's name
        let playerNameArray = playerArray.map(function(player) {
            return player.name_display_first_last;
        })
        console.log(playerNameArray);
    }
});

// GET A LIST OF THE PLAYER IDs FOR A TARGET TEAM
request(url, function (err, response, body) {
    if(err) {
        console.log(err);
    } else {
        let theObject = JSON.parse(body);
        // create an array of player objects
        let playerArray = theObject.roster_40.queryResults.row;
        // for each of the player objects, get the player's name
        let playerIDArray = playerArray.map(function(player) {
            return player.player_id;
        })
        console.log(playerIDArray);
    }
});