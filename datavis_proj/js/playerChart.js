class PlayerChart {


    constructor (seasonData,playerData,teamData,playerMatchData,matchData) {


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
        //console.log(matchData);


    };



    update () {
        //var data = [4, 8, 15, 16, 23, 10];
        let season_filter_data = this.matchData.filter(function(d) {
        //            console.log(d);
            return d.Season_Id == 1;
        });

        console.log(season_filter_data);
        let svgBounds = d3.select("#barChart").node().getBoundingClientRect(),
            xAxisWidth = 100,
            yAxisHeight = 70;

        // Create the x and y scales; make
        // sure to leave room for the axes

        // Create colorScale

        // Create the axes (hint: use #xAxis and #yAxis)

        // Create the bars (hint: use #bars)
        let xScale = d3.scaleBand()
            .domain(season_filter_data.map(function (d) {
                return d.Match_Id;
            })).range([svgBounds.width, yAxisHeight]).padding(.1);

        let maxValue = d3.max(season_filter_data, function (d) {
            return parseInt(d.Won_By);
        });

        let yScale = d3.scaleLinear()
            .domain([0, maxValue]).range([svgBounds.height - xAxisWidth, 0]);


        let t = d3.transition()
            .duration(1000);

        // Create colorScale
        let colorScale = d3.scaleLinear()
            .domain([0, maxValue])
            .range(['#097ecc', '#043352']);

        // Create the axes
        let simple_matchids = d3.scaleBand()
            .domain(season_filter_data.map(function (d,i) {
                return i;
            })).range([svgBounds.width, yAxisHeight]).padding(.1);
        let xAxis = d3.axisLeft()
            .scale(simple_matchids);

        d3.select("#xAxis")
            .attr("transform", "rotate(-90) translate(" + (xAxisWidth - svgBounds.height) + ",0)")
            .call(xAxis);

        let yAxis = d3.axisLeft()
            .scale(yScale);

        d3.select("#yAxis")
            .attr("transform", "translate(" + yAxisHeight + ",0)")
            .transition(t)
            .call(yAxis);

        // Create the bars
        let bars = d3.select("#bars").selectAll("rect").data(season_filter_data);
        bars = bars.enter()
            .append('rect')
            .attr('y', function (d) {
                return svgBounds.height - xAxisWidth;
            })
            .merge(bars);

        bars.exit().remove();
        bars
            .attr('x', function (d) {
                return xScale(d.Match_Id);
            })
            .attr('width', function (d) {
                return xScale.bandwidth();

            })
            .transition(t)
            .attr('y', function (d) {
                return yScale(d.Won_By);
            })
            .attr('height', function (d) {
                return svgBounds.height - xAxisWidth - yScale(d.Won_By);
            })
            .attr('fill', function (d) {
                return colorScale(d.Won_By);
            });

        //implementing Line Chart for Number of Matches Held in Cities
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

        console.log(city_names);
        console.log(matches_played);

        //
        // var x = d3.scaleLinear()
        //     .domain([0, d3.max(matches_played)])
        //     .range([0, 420]);
        //
        // d3.select(".chart")
        //     .selectAll("div")
        //     .data(matches_played)
        //     .enter().append("div")
        //     .style("width", function(d) { return x(d) + "px"; })
        //     .text(function(d) { return d; });

        var width = 500,
            height = 400;

        var y = d3.scaleLinear()
            .range([height, 0]);

        var chart = d3.select(".chart")
            .attr("width", width)
            .attr("height", height);

        d3.tsv("dataset/data.tsv", type, function(error, data) {
            y.domain([0, d3.max(data, function(d) { return d.value; })]);

            var barWidth = width / data.length /2;

            var bar = chart.selectAll("g")
                .data(data)
                .enter().append("g")
                .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; });

            bar.append("rect")
                .attr("y", function(d) { return y(d.value); })
                .attr("height", function(d) { return height - y(d.value); })
                .attr("width", barWidth - 1);

            bar.append("text")
                .attr("x", barWidth / 2)
                .attr("y", function(d) { return y(d.value) + 3; })
                .attr("dy", ".75em")
                .text(function(d) { return d.name; });
        });

        function type(d) {
            d.value = +d.value; // coerce to number
            return d;
        }
        //console.log(matches_played);


    };

};