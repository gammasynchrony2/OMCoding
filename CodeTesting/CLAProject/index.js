const request = require('request');
const inquirer = require("inquirer");
const urlTwo = "http://lookup-service-prod.mlb.com/json/named.team_all_season.bam?sport_code='mlb'&all_star_sw='N'&sort_order=name_asc&season='2018'";

function getTeams() {
    let allTheTeams = new Promise((resolve, reject) => {
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
                let teamNameArray = natsOnly.map(function(team) {
                    return team.name_display_long;
                })
                let teamIDArray = natsOnly.map(function(team) {
                    return team.team_id;
                })
                let outputArray = [teamNameArray, teamIDArray]
                resolve(outputArray);
            }
        });
    })
    // Takes the array of NL team names and prompts the user to select one
    .then(thisArray => {
        let teamNameArray = thisArray[0]
        let teamIDArray = thisArray[1];
        inquirer.prompt([
            {
                type: "checkbox",
                name: "getFirstTeam",
                choices: teamNameArray,
                validate: function(input) {
                    return true;
                }
            }
        ])
        .then(answers => {
            let firstTeamSelected = answers.getFirstTeam.toString();
            console.log("First Team Selected: " + firstTeamSelected);
            outputArray = [firstTeamSelected,teamNameArray, teamIDArray]
            return outputArray;
        })
        .then(testArray => {
            let firstTeamResult = testArray[0];
            let teamNameArray = testArray[1];
            let teamIDArray = testArray[2];
            inquirer.prompt([
                {
                    type: "checkbox",
                    name: "getSecondTeam",
                    choices: teamNameArray,
                    validate(input) {
                        if(input[0] == firstTeamResult) {
                            return "You can't trade two players from the same team. Please select again!"
                        } else {
                            return true;
                        }
                    }
                }
            ])
            .then(answers => {
                let secondTeamSelected = answers.getSecondTeam.toString();
                console.log("First Team Selected: "+ firstTeamResult);
                console.log("Second Team Selected: " + secondTeamSelected);
                outputArray = [firstTeamResult, secondTeamSelected, teamNameArray, teamIDArray]
                return outputArray;
            })
            .then(arrays => {
                // Get the team ID for Team 1
                let teamIDArray = arrays[3];
                let teamNameArray = arrays[2];
                let teamOneName = arrays[0];
                let teamOneIDLocation = teamNameArray.indexOf(teamOneName);
                let teamOneID = teamIDArray[teamOneIDLocation];
                // team_id = teamOneID;
                function getTeamOneRoster() {
                    let urlThree = `http://lookup-service-prod.mlb.com/json/named.roster_40.bam?team_id=${teamOneID}`
                    let allTeamOne = new Promise((resolve, reject) => {
                        request(urlThree, function (err, response, body) {
                            if(err) {
                                console.log(err);
                            } else {
                                let teamOneObject = JSON.parse(body);
                                // create an array of player objects
                                let teamOneArray = teamOneObject.roster_40.queryResults.row;
                                // for each of the player objects, get the player's name
                                let teamOneNameArray = teamOneArray.map(function(player) {
                                    return player.name_display_first_last;
                                })
                                let teamOnePlayerIDArray = teamOneArray.map(function(player) {
                                    console.log(player.player_id);
                                })
                            console.log(teamOneNameArray);
                            }
                        })
                    })
                }
                getTeamOneRoster();
                // Get the team ID for Team 2
                let teamTwoName = arrays[1];
                let teamTwoIDLocation = teamNameArray.indexOf(teamTwoName);
                let teamTwoID = teamIDArray[teamTwoIDLocation];
                
            })
        })
    })
}

getTeams();
