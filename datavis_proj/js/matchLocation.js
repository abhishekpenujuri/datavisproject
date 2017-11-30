class MatchLocation {


    constructor (seasonData,playerData,teamData,playerMatchData, matchData) {

        //the data
        this.seasonData = seasonData;
        this.playerData = playerData;
        this.teamData = teamData;
        this.playerMatchData = playerMatchData;
        this.matchData = matchData;


        // console.log(seasonData);
        // console.log(playerData);
        // console.log(teamData);
        // console.log(playerMatchData);

    };




    update () {
        let season_filter_data = this.matchData.filter(function(d) {
            //            console.log(d);
            return d.Season_Id == 7;
        });

        console.log(season_filter_data);
        var MatchesHeldHashMap = {};
        d3.map(season_filter_data, function (d) {
            if (!MatchesHeldHashMap[d.City_Name]) {
                MatchesHeldHashMap[d.City_Name] = 0;
            }
            MatchesHeldHashMap[d.City_Name] = parseInt(MatchesHeldHashMap[d.City_Name]) + 1;
            //console.log(d.City_Name)

        });

        var city_names = [];
        var matches_played = [];
        for(var key in MatchesHeldHashMap) {
            //console.log(key);
            city_names.push(key);
            matches_played.push(parseInt(MatchesHeldHashMap[key]));
        }

        console.log("hello:" + city_names);
        console.log("hello:" + matches_played);

        google.charts.load('current', {
            'packages': ['geochart'],
            // Note: you will need to get a mapsApiKey for your project.
            // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
            'mapsApiKey': 'AIzaSyA6iexw7GgsN68JopjH9y4WTggb0tOhPpE'
        });
        google.charts.setOnLoadCallback(drawMarkersMap);

        function drawMarkersMap() {
            /*var data = google.visualization.arrayToDataTable([
                ['City',   'Matches'],
                ['Delhi',      30],
                ['Hyderabad',     20],
                ['Chennai',    5],
                ['Mumbai',     2],
                ['Calcutta',   1],
                ['Pune',     11],
                ['Amritsar', 18]
            ]);*/

            var data = new google.visualization.DataTable();
            data.addColumn('string', 'City');
            data.addColumn('number', 'Matches Played');
            var i = 0;
            var rows = [];
            for (var city in city_names) {
                var row_entry = [];
                //console.log(city_names[i]);
                row_entry.push(city_names[i]);
                row_entry.push(matches_played[i]);
                //console.log(row_entry);
                rows.push(row_entry);
                i++;
            }
            data.addRows(rows);
            console.log(data);
           // console.log(data);
            var options = {
                sizeAxis: { minValue: 0, maxValue: 100 },
                region: 'IN',
                displayMode: 'markers',
                colorAxis: {colors: ['green', 'blue']}
            };

            var chart = new google.visualization.GeoChart(document.getElementById('chart_div'));
            chart.draw(data, options);
        }
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