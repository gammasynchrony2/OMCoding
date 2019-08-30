const request = require('request');
const inquirer = require("inquirer");
const urlTwo = "http://lookup-service-prod.mlb.com/json/named.team_all_season.bam?sport_code='mlb'&all_star_sw='N'&sort_order=name_asc&season='2019'";
let recordResultOne = 0;

const returnObject = {
    leagueName: "NL",
    teamNames: [],
    teamIDs: [],
    teamOne: {
        name: "",
        ID: 0,
        nameRoster: [],
        IDRoster: [],
        OBPRoster: [],
        tradeNom: "",
        tradeNomOBP: "",
        tradeNomIndex: 0,
        teamAverageOBP: 0
    },
    teamTwo: {
        name: "",
        ID: 0,
        nameRoster: [],
        IDRoster: [],
        OBPRoster: [],
        tradeNom: "",
        tradeNomOBP: "",
        tradeNomIndex: 0,
        teamAverageOBP:0
    }
};

function getTeams() {
    let allTheTeams = new Promise((resolve, reject) => {
        request(urlTwo, function (err, response, body) {
            if (err) {
                console.log(err);
            } else {
                let theObject = JSON.parse(body);
                let teamArray = theObject.team_all_season.queryResults.row;
                // filter for national league teams
                let natsOnly = teamArray.filter(function (team) {
                    return team.league_id == 104;
                })
                // return a list of team names:
                let teamNameArray = natsOnly.map(function (team) {
                    return team.name_display_long;
                })
                let teamIDArray = natsOnly.map(function (team) {
                    return team.team_id;
                })
                let outputObject = returnObject;
                outputObject.teamNames = teamNameArray;
                outputObject.teamIDs = teamIDArray;
                // let outputArray = [teamNameArray, teamIDArray]
                resolve(outputObject);
            }
        });
    })
        // Takes the array of NL team names and prompts the user to select one
        .then(thisObject => {
            let teamNameArray = thisObject.teamNames;
            console.clear();
            inquirer.prompt([
                {
                    type: "checkbox",
                    name: "getFirstTeam",
                    message: "Please select the team of the First Player you'd like to trade: \n\n",
                    choices: teamNameArray,
                    validate: function (input) {
                        return true;
                    }
                }
            ])
                .then(answers => {
                    let firstTeamSelected = answers.getFirstTeam.toString();
                    console.clear();
                    console.log("First Team Selected: " + firstTeamSelected + "\n");
                    outputObject = thisObject;
                    outputObject.teamOne.name = firstTeamSelected;
                    return outputObject;
                })
                .then(thisObject => {
                    let firstTeamResult = thisObject.teamOne.name;
                    let teamNameArray = thisObject.teamNames;
                    let teamIDArray = thisObject.teamIDs;
                    inquirer.prompt([
                        {
                            type: "checkbox",
                            name: "getSecondTeam",
                            message: "Please select the team of the Second Player you'd like to trade: \n",
                            choices: teamNameArray,
                            validate(input) {
                                if (input[0] == firstTeamResult) {
                                    return "You can't trade two players from the same team. Please select again!"
                                } else {
                                    return true;
                                }
                            }
                        }
                    ])
                        .then(answers => {
                            let secondTeamSelected = answers.getSecondTeam.toString();
                            console.clear();
                            console.log("First Team Selected: " + firstTeamResult);
                            console.log("Second Team Selected: " + secondTeamSelected + "\n");
                            let outputObject = thisObject;
                            outputObject.teamTwo.name = secondTeamSelected;
                            return outputObject;
                        })
                        .then(thisObject => {
                            // Get the team IDs for Team 1
                            let teamIDArray = thisObject.teamIDs;
                            let teamNameArray = thisObject.teamNames;
                            let teamOneName = thisObject.teamOne.name;
                            let teamOneIDLocation = teamNameArray.indexOf(teamOneName);
                            let teamOneID = teamIDArray[teamOneIDLocation];
                            thisObject.teamOne.ID = teamOneID;
                            function getTeamOneRoster() {
                                let urlThree = `http://lookup-service-prod.mlb.com/json/named.roster_40.bam?team_id=${teamOneID}`
                                return new Promise((resolve, reject) => {
                                    request(urlThree, function (err, response, body) {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            let teamOneObject = JSON.parse(body);
                                            // create an array of player objects
                                            let teamOneArray = teamOneObject.roster_40.queryResults.row;
                                            // for each of the player objects, get the player's name
                                            let teamOneNameArray = teamOneArray.map(function (player) {
                                                return player.name_display_first_last;
                                            })
                                            let teamOnePlayerIDArray = teamOneArray.map(function (player) {
                                                return player.player_id;
                                            })
                                            let outputObject = thisObject;
                                            outputObject.teamOne.nameRoster = teamOneNameArray;
                                            outputObject.teamOne.IDRoster = teamOnePlayerIDArray;
                                            // console.log(outputObject);
                                            resolve(outputObject);
                                        }
                                    })
                                })
                            }
                            getTeamOneRoster().then((thisObject) => {
                                let passOutArray = [];
                                const recordArray = [];
                                const baseForRepeat = 'a';
                                let playerIDArray = thisObject.teamOne.IDRoster;
                                
                                let statOnePromise = new Promise(function (resolve, reject) {
                                
                                    for (let i = 0; i < playerIDArray.length; i++) {
                                        let player_id = playerIDArray[i]
                                        let urlThree = `http://lookup-service-prod.mlb.com/json/named.sport_hitting_tm.bam?league_list_id='mlb'&game_type='R'&season='2019'&player_id=${player_id}`;
                                        request(urlThree, function (err, response, body) {
                                            if (err) {
                                                // console.log(err);
                                            } else {
                                                let thePlayer = JSON.parse(body);
                                                if(thePlayer.sport_hitting_tm.queryResults.totalSize == 1) {
                                                    recordArray.push([(baseForRepeat.repeat(i + 1)),player_id, thePlayer.sport_hitting_tm.queryResults.row.obp]);
                                                } else if(thePlayer.sport_hitting_tm.queryResults.totalSize > 1) {
                                                    recordArray.push([(baseForRepeat.repeat(i + 1)), player_id, thePlayer.sport_hitting_tm.queryResults.row[0].obp])
                                                } else {
                                                    recordArray.push([(baseForRepeat.repeat(i + 1)), player_id,'.---'])
                                                }
                                                if(recordArray.length == playerIDArray.length) {
                                                    passOutArray = [thisObject, recordArray];
                                                    resolve(passOutArray);
                                                };
                                            }
                                        })
                                    }
                                })
                                // Sort the OBP Array back into original order and add it to the record object
                                statOnePromise.then((thisArray) => {
                                    thisObject = thisArray[0];
                                    sortedT1StatArray = thisArray[1].sort();

                                    let OBPStatOnly = [];
                                    for(let i = 0; i < sortedT1StatArray.length; i++) {
                                        OBPStatOnly.push(sortedT1StatArray[i][2]);
                                    }
                                    thisObject.teamOne.OBPRoster = OBPStatOnly;
                                    // Get User Selection for Team 1 Player
                                    inquirer.prompt([
                                        {
                                            type: "checkbox",
                                            name: "getFirstPlayer",
                                            message: `Please select the player from the ${thisObject.teamOne.name} that you'd like to trade \n`,
                                            choices: thisObject.teamOne.nameRoster,
                                            validate: function(input) {
                                                return true;
                                            }
                                        }
                                    ])
                                        .then(answers => {
                                            thisObject.teamOne.tradeNom = answers.getFirstPlayer.toString();
                                            console.clear();
                                            console.log("First Team Selected: " + thisObject.teamOne.name);
                                            console.log("Second Team Selected: " + thisObject.teamTwo.name + "\n");
                                            console.log("Trade Pick for the " + thisObject.teamOne.name + ": " + thisObject.teamOne.tradeNom + "\n");
                                            // Get tradeNom's OBP
                                            thisObject.teamOne.tradeNomIndex = thisObject.teamOne.nameRoster.indexOf(thisObject.teamOne.tradeNom);
                                            thisObject.teamOne.tradeNomOBP = thisObject.teamOne.OBPRoster[thisObject.teamOne.tradeNomIndex];
                                            // 
                                            let j = 0;
                                            let teamOneOBPCollector = 0;
                                            for(let i = 0; i < thisObject.teamOne.OBPRoster.length; i++ ) {
                                                if(thisObject.teamOne.OBPRoster[i] == '.---') {
                                                    // console.log("doesn't count");
                                                } else {
                                                    teamOneOBPCollector += (Number.parseFloat(thisObject.teamOne.OBPRoster[i]));
                                                    j++;
                                                }
                                            }
                                            thisObject.teamOne.teamAverageOBP = (teamOneOBPCollector / j);
                                            // Print out the Player OBP vs. Team OBP
                                            if(thisObject.teamOne.tradeNomOBP == '.---') {
                                                recordResultOne = 1;
                                                console.log(thisObject.teamOne.tradeNom + "'s OBP is not reported by MLB.com.")
                                                console.log("He therefore does not contribute to the " + thisObject.teamOne.name + "'s team-wide average OBP of " + thisObject.teamOne.teamAverageOBP + "\n");
                                            } else if(Number.parseFloat(thisObject.teamOne.tradeNomOBP) == thisObject.teamOne.teamAverageOBP) {
                                                recordResultOne = 2;
                                                console.log(thisObject.teamOne.tradeNom + "'s OBP of " + thisObject.teamOne.tradeNomOBP + " is identical to the " + thisObject.teamOne.name + "'s team-wide average OBP of " + thisObject.teamOne.teamAverageOBP + "\n");
                                            } else if(Number.parseFloat(thisObject.teamOne.tradeNomOBP) < thisObject.teamOne.teamAverageOBP) {
                                                recordResultOne = 3;
                                                console.log(thisObject.teamOne.tradeNom + "'s OBP of " + thisObject.teamOne.tradeNomOBP + " is lower than the " + thisObject.teamOne.name + "'s team-wide average OBP of " + thisObject.teamOne.teamAverageOBP + "\n");
                                            } else if(Number.parseFloat(thisObject.teamOne.tradeNomOBP) > thisObject.teamOne.teamAverageOBP) {
                                                recordResultOne = 4;
                                                console.log(thisObject.teamOne.tradeNom + "'s OBP of " + thisObject.teamOne.tradeNomOBP + " is greater than the " + thisObject.teamOne.name + "'s team-wide average OBP of " + thisObject.teamOne.teamAverageOBP + "\n");
                                            }

                                            // NOW START ON TEAM 2!!!!!

                                            // Get the roster
                                            let teamIDArray = thisObject.teamIDs;
                                            let teamNameArray = thisObject.teamNames;
                                            let teamTwoName = thisObject.teamTwo.name;
                                            let teamTwoIDLocation = teamNameArray.indexOf(teamTwoName);
                                            let teamTwoID = teamIDArray[teamTwoIDLocation];
                                            thisObject.teamTwo.ID = teamTwoID;
                                            // console.log(thisObject);
                                            function getTeamTwoRoster() {
                                                let urlFour = `http://lookup-service-prod.mlb.com/json/named.roster_40.bam?team_id=${teamTwoID}`
                                                return new Promise((resolve, reject) => {
                                                    request(urlFour, function (err, response, body) {
                                                        if (err) {
                                                            console.log(err);
                                                        } else {
                                                            let teamTwoObject = JSON.parse(body);
                                                            // create an array of player objects
                                                            let teamTwoArray = teamTwoObject.roster_40.queryResults.row;
                                                            // for each of the player objects, get the player's name
                                                            let teamTwoNameArray = teamTwoArray.map(function (player) {
                                                                return player.name_display_first_last;
                                                            })
                                                            let teamTwoPlayerIDArray = teamTwoArray.map(function (player) {
                                                                return player.player_id;
                                                            })
                                                            let outputObjectTwo = thisObject;
                                                            outputObjectTwo.teamTwo.nameRoster = teamTwoNameArray;
                                                            outputObjectTwo.teamTwo.IDRoster = teamTwoPlayerIDArray;
                                                            // console.log(outputObjectTwo);
                                                            resolve(outputObjectTwo);
                                                        }
                                                    })
                                                })
                                            }
                                            getTeamTwoRoster().then((thisObject) => {
                                                let passOutArray = [];
                                                let recordArray = [];
                                                let baseForRepeat = 'a';
                                                let playerIDArray = thisObject.teamTwo.IDRoster;

                                                let statTwoPromise = new Promise(function (resolve, reject) {
                                
                                                    for (let i = 0; i < playerIDArray.length; i++) {
                                                        let player_id3 = playerIDArray[i]
                                                        let urlFive = `http://lookup-service-prod.mlb.com/json/named.sport_hitting_tm.bam?league_list_id='mlb'&game_type='R'&season='2019'&player_id=${player_id3}`;
                                                        request(urlFive, function (err, response, body) {
                                                            if (err) {
                                                                // console.log(err);
                                                            } else {
                                                                let thePlayer = JSON.parse(body);
                                                                if(thePlayer.sport_hitting_tm.queryResults.totalSize == 1) {
                                                                    recordArray.push([(baseForRepeat.repeat(i + 1)),player_id3, thePlayer.sport_hitting_tm.queryResults.row.obp]);
                                                                } else if(thePlayer.sport_hitting_tm.queryResults.totalSize > 1) {
                                                                    recordArray.push([(baseForRepeat.repeat(i + 1)), player_id3, thePlayer.sport_hitting_tm.queryResults.row[0].obp])
                                                                } else {
                                                                    recordArray.push([(baseForRepeat.repeat(i + 1)), player_id3,'.---'])
                                                                }
                                                                if(recordArray.length == playerIDArray.length) {
                                                                    passOutArray = [thisObject, recordArray];
                                                                    resolve(passOutArray);
                                                                };
                                                            }
                                                        })
                                                    }
                                                })
                                                statTwoPromise.then((thisArray) => {
                                                    thisObject = thisArray[0];
                                                    sortedT2StatArray = thisArray[1].sort();
                                                    
                                                    let OBPStatOnly = [];
                                                    for(let i = 0; i < sortedT2StatArray.length; i++) {
                                                        OBPStatOnly.push(sortedT2StatArray[i][2]);
                                                    }
                                                    thisObject.teamTwo.OBPRoster = OBPStatOnly;
                                                    // Get User Selection for Team 2 Player
                                                    inquirer.prompt([
                                                        {
                                                            type: "checkbox",
                                                            name: "getSecondPlayer",
                                                            message: `Please select the player from the ${thisObject.teamTwo.name} that you'd like to trade \n`,
                                                            choices: thisObject.teamTwo.nameRoster,
                                                            validate: function(input) {
                                                                return true;
                                                            }
                                                        }
                                                    ])
                                                        .then(answers => {
                                                            thisObject.teamTwo.tradeNom = answers.getSecondPlayer.toString();
                                                            console.clear();
                                                            console.log("First Team Selected: " + thisObject.teamOne.name);
                                                            console.log("Second Team Selected: " + thisObject.teamTwo.name + "\n");
                                                            console.log("Trade Pick for the " + thisObject.teamOne.name + ": " + thisObject.teamOne.tradeNom + "\n");
                                                            if(recordResultOne == 1) {
                                                                console.log(thisObject.teamOne.tradeNom + "'s OBP is not reported by MLB.com.")
                                                                console.log("He therefore does not contribute to the " + thisObject.teamOne.name + "'s team-wide average OBP of " + thisObject.teamOne.teamAverageOBP + "\n");
                                                            } else if(recordResultOne == 2) {
                                                                console.log(thisObject.teamOne.tradeNom + "'s OBP of " + thisObject.teamOne.tradeNomOBP + " is identical to the " + thisObject.teamOne.name + "'s team-wide average OBP of " + thisObject.teamOne.teamAverageOBP + "\n");
                                                            } else if(recordResultOne == 3) {
                                                                console.log(thisObject.teamOne.tradeNom + "'s OBP of " + thisObject.teamOne.tradeNomOBP + " is lower than the " + thisObject.teamOne.name + "'s team-wide average OBP of " + thisObject.teamOne.teamAverageOBP + "\n");
                                                            } else if(recordResultOne == 4) {
                                                                console.log(thisObject.teamOne.tradeNom + "'s OBP of " + thisObject.teamOne.tradeNomOBP + " is greater than the " + thisObject.teamOne.name + "'s team-wide average OBP of " + thisObject.teamOne.teamAverageOBP + "\n");
                                                            }
                                                            console.log("Trade Pick for the " + thisObject.teamTwo.name + ": " + thisObject.teamTwo.tradeNom + "\n");
                                                            // Get tradeNom's OBP
                                                            thisObject.teamTwo.tradeNomIndex = thisObject.teamTwo.nameRoster.indexOf(thisObject.teamTwo.tradeNom);
                                                            thisObject.teamTwo.tradeNomOBP = thisObject.teamTwo.OBPRoster[thisObject.teamTwo.tradeNomIndex];
                                                            // 
                                                            let j = 0;
                                                            let teamTwoOBPCollector = 0;
                                                            for(let i = 0; i < thisObject.teamTwo.OBPRoster.length; i++ ) {
                                                                if(thisObject.teamTwo.OBPRoster[i] == '.---') {
                                                                    // console.log("doesn't count");
                                                                } else {
                                                                    teamTwoOBPCollector += (Number.parseFloat(thisObject.teamTwo.OBPRoster[i]));
                                                                    j++;
                                                                }
                                                            }
                                                            thisObject.teamTwo.teamAverageOBP = (teamTwoOBPCollector / j);
                                                            // Print out the Player OBP vs. Team OBP
                                                            if(thisObject.teamTwo.tradeNomOBP == '.---') {
                                                                console.log(thisObject.teamTwo.tradeNom + "'s OBP is not reported by MLB.com.")
                                                                console.log("He therefore does not contribute to the " + thisObject.teamTwo.name + "'s team-wide average OBP of " + thisObject.teamTwo.teamAverageOBP);
                                                            } else if(Number.parseFloat(thisObject.teamTwo.tradeNomOBP) == thisObject.teamTwo.teamAverageOBP) {
                                                                console.log(thisObject.teamTwo.tradeNom + "'s OBP of " + thisObject.teamTwo.tradeNomOBP + " is identical to the " + thisObject.teamTwo.name + "'s team-wide average OBP of " + thisObject.teamTwo.teamAverageOBP);
                                                            } else if(Number.parseFloat(thisObject.teamTwo.tradeNomOBP) < thisObject.teamTwo.teamAverageOBP) {
                                                                console.log(thisObject.teamTwo.tradeNom + "'s OBP of " + thisObject.teamTwo.tradeNomOBP + " is lower than the " + thisObject.teamTwo.name + "'s team-wide average OBP of " + thisObject.teamTwo.teamAverageOBP);
                                                            } else if(Number.parseFloat(thisObject.teamTwo.tradeNomOBP) > thisObject.teamTwo.teamAverageOBP) {
                                                                console.log(thisObject.teamTwo.tradeNom + "'s OBP of " + thisObject.teamTwo.tradeNomOBP + " is greater than the " + thisObject.teamTwo.name + "'s team-wide average OBP of " + thisObject.teamTwo.teamAverageOBP);
                                                            }



                                                        })



                                                })
                                            })
                                            
                                        })
                                });
                                
                            })


                        })
                })
        })
}

getTeams();