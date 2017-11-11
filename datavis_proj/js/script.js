//read all the datasets


//read seasons dataset
d3.csv("dataset/Season.csv", function (error, seasonData) {

    d3.csv("dataset/Player.csv", function (error, playerData){

        d3.csv("dataset/Team.csv", function (error, teamData){

            d3.csv("dataset/Player_Match.csv", function (error, playerMatchData){

                d3.csv("dataset/Ball_by_Ball.csv", function (error, ballData){

                    d3.csv("dataset/Match.csv", function (error, matchData) {

                        //for view 1: AwardStats
                        window.awardStats = new AwardStats(seasonData, playerData, teamData);

                        //populate table for the first time
                        awardStats.update(1);
                        //for view 2: MatchLocation
                        let matchLocation = new MatchLocation(seasonData, playerData, teamData, playerMatchData);
                        matchLocation.update();

                        //for view 3: PlayerChart
                        let playerChart = new PlayerChart(seasonData, playerData, teamData, playerMatchData, matchData);
                        playerChart.update();
                    });


                });


            });

        });

    });
});

function chooseSeason() {
    awardStats.chooseSeason();
}
