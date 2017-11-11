class AwardStats {


    constructor (seasonData,playerData,teamData) {

        //the data
        this.seasonData = seasonData;
        this.playerData = playerData;
        this.teamData = teamData;

        // console.log(seasonData);
        // console.log(playerData);
        // console.log(teamData);

        // Initializes the svg elements required for this chart
        this.margin = {top: 10, right: 20, bottom: 30, left: 50};
        let divawardStats = d3.select("#awardstats-chart").classed("fullView", true);

        //fetch the svg bounds
        this.svgBounds = divawardStats.node().getBoundingClientRect();
        this.svgWidth = this.svgBounds.width - this.margin.left - this.margin.right;
        this.svgHeight = 500;

        //add the svg to the div
        // this.svg = divawardStats.append("svg")
        //     .attr("width", this.svgWidth)
        //     .attr("height", this.svgHeight)


    };



    update (seasonNo) {
        //seasonNo is season number
        // console.log(seasonNo)
        // console.log(this.seasonData);
        //create table
        let columns = ["Season_Id","Season_Year", "Man_of_the_Series_Id","Orange_Cap_Id","Purple_Cap_Id"];
        let table = d3.select("#tableStats").append("table");
        let tabulate = function (data,columns)
        {

            // console.log(data);
            let thead = table.append('thead');
            let tbody = table.append('tbody');
            let headers = ["Season Number","Year", "Man of the Series Id","Orange Cap Id","Purple Cap Id"];

            //data binding
            let headSel = thead.append('tr')
                .selectAll('th')
                .data(headers);

            //exit condition
            headSel.exit().remove();

            //entry  and merge condition
            headSel = headSel.enter().append("th").merge(headSel);

            //attribs
            headSel.text(function (d) { return d });

            //data binding
            let rows = tbody.selectAll('tr')
                .data(data);

            //exit condition
            rows.exit().remove();

            //entry and merge conditions
            rows = rows.enter().append('tr').merge(rows);

            //data binding
            let cells = rows.selectAll('td')
                .data(function(row)
                {
                    return columns.map(function (column)
                    {
                        return { column: column, value: row[column] }
                    })
                });

            //exit condition
            cells.exit().remove();

            //entry and update condition
            cells = cells.enter().append('td').merge(cells);

            //attribs
            cells.text(function (d) { return d.value });

            return table;
        };
        this.seasonData.map(function (d) {
            console.log(d)
        });
        tabulate(this.seasonData,columns)


    };

    chooseSeason() {

        // console.log(d3.select('#season-select').node().value);
        //call update function using season number
        this.update(d3.select('#season-select').node().value)

    }

};