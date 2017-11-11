class MatchLocation {


    constructor (seasonData,playerData,teamData,playerMatchData) {

        //the data
        this.seasonData = seasonData;
        this.playerData = playerData;
        this.teamData = teamData;
        this.playerMatchData = playerMatchData;



        // console.log(seasonData);
        // console.log(playerData);
        // console.log(teamData);
        // console.log(playerMatchData);

    };




    update () {

       // d3.select("#season").text(this.seasonData.);
        //d3.select("#winner").text(oneWorldCup.host);
        //d3.select("#loser").text(oneWorldCup.winner);
        //d3.select("#final_qs").text(oneWorldCup.runner_up);

        //Create a list item for each participating team
        //let team_text = d3.select("#teams").selectAll(".team_label")
           // .data(oneWorldCup.teams_names);

       /* team_text
            .enter().append("li")
            .text(function (d) {
                return d
            })
            .classed("team_label", true)*/

    };

};