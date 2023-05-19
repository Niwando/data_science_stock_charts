document.addEventListener('DOMContentLoaded', function(e) {

    // Daten einlesen
    d3.csv("https://gist.githubusercontent.com/Niwando/f19b773e68878c25744c4a66f1e995fa/raw/3346bc61e444b4652c36b516f1d035a209b6d54f/market_data", 
    
    function(d) {
        return { date : d3.timeParse("%Y-%m-%d")(d.Date), close : d.Close , stock : d.Stock}
    },
    
    function(data) {

    // Größe des Graphen
    var margin = {top: 10, right: 30, bottom: 30, left: 50},
    width = 1225 - margin.left - margin.right,
    height = 747 - margin.top - margin.bottom;

    // Erstellen eines SVG Elements für den Linechart
    var svg = d3.select("#linechart_stocks")
    .append("svg")
    .attr("viewBox", "0 0 "+ (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom))
    .attr("preserveAspectRatio", "xMidYMid meet")
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
    
    // Erstellen einer x Achse
    var x = d3.scaleTime()
    .domain(d3.extent(data, function(d) { return d.date; }))
    .range([ 0, width ]);
    svg.append("g").attr("class", "axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).ticks(24).tickSizeOuter(0));

    // Erstellen einer y Achse
    var y = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return +d.close; })])
    .range([ height, 0 ]);
    var yaxis = d3.axisLeft(y)
        .tickSizeOuter(0)
    svg.append("g").attr("class", "axis")
        .call(yaxis);

    // Färbt die Achsen in hellgrau ein
    d3.selectAll(".axis line").style("stroke", "#a9b0b8")
    d3.selectAll(".axis path").style("stroke", "#a9b0b8")
    d3.selectAll(".axis text").style("stroke", "#a9b0b8")

    var yAxisTicks = yaxis.scale().ticks()
    var greyLines = svg.append('g')
    yAxisTicks.forEach(tick => {
        greyLines
            .append("line")
            .attr("id", "line"+tick)
            .attr("x1", 0)
            .attr("x2", width)
            .attr("y1", y(tick)+0.5)
            .attr("y2", y(tick)+0.5)
            .attr("stroke", "#a9b0b8")
            .style("opacity", 0.1)
    })

    // Fügt die Fläche unter dem Graphen hinzu
    svg.append("path")
    .datum(data.filter(function(d){return d.stock=="netflix"}))
    .attr("id", "netflix_area")
    .attr("fill", "rgb(204,80,62)")
    .attr("fill-opacity", .15)
    .attr("visibility", "hidden")
    .attr("stroke", "none")
    .attr("d", d3.area()
        .x(function(d) { return x(d.date) })
        .y0( height )
        .y1(function(d) { return y(d.close) })
        )

    // Fügt die Fläche unter dem Graphen hinzu
    svg.append("path")
    .datum(data.filter(function(d){return d.stock=="microsoft"}))
    .attr("id", "microsoft_area")
    .attr("fill", "rgb(225,124,5)")
    .attr("fill-opacity", .15)
    .attr("visibility", "hidden")
    .attr("stroke", "none")
    .attr("d", d3.area()
        .x(function(d) { return x(d.date) })
        .y0( height )
        .y1(function(d) { return y(d.close) })
        )
    
    // Fügt die Fläche unter dem Graphen hinzu
    svg.append("path")
    .datum(data.filter(function(d){return d.stock=="amazon"}))
    .attr("id", "amazon_area")
    .attr("fill", "rgb(237,173,8)")
    .attr("fill-opacity", .15)
    .attr("visibility", "hidden")
    .attr("stroke", "none")
    .attr("d", d3.area()
        .x(function(d) { return x(d.date) })
        .y0( height )
        .y1(function(d) { return y(d.close) })
        )

    // Fügt die Fläche unter dem Graphen hinzu
    svg.append("path")
    .datum(data.filter(function(d){return d.stock=="apple"}))
    .attr("id", "apple_area")
    .attr("fill", "rgb(115,175,72)")
    .attr("fill-opacity", .15)
    .attr("visibility", "hidden")
    .attr("stroke", "none")
    .attr("d", d3.area()
        .x(function(d) { return x(d.date) })
        .y0( height )
        .y1(function(d) { return y(d.close) })
        )
    
    // Fügt die Fläche unter dem Graphen hinzu
    svg.append("path")
    .datum(data.filter(function(d){return d.stock=="google"}))
    .attr("id", "google_area")
    .attr("fill", "rgb(56,166,165)")
    .attr("fill-opacity", .15)
    .attr("visibility", "hidden")
    .attr("stroke", "none")
    .attr("d", d3.area()
        .x(function(d) { return x(d.date) })
        .y0( height )
        .y1(function(d) { return y(d.close) })
        )

    // Fügt die Fläche unter dem Graphen hinzu
    svg.append("path")
    .datum(data.filter(function(d){return d.stock=="netflix"}))
    .attr("id", "netflix_line")
    .attr("fill", "none")
    .attr("stroke", "rgb(204,80,62)")
    .attr("stroke-width", 0.6)
    .attr("d", d3.line()
        .x(function(d) { return x(d.date) })
        .y(function(d) { return y(d.close) })
        )

    // Fügt die Fläche unter dem Graphen hinzu
    svg.append("path")
    .datum(data.filter(function(d){return d.stock=="amazon"}))
    .attr("id", "amazon_line")
    .attr("fill", "none")
    .attr("stroke", "rgb(237,173,8)")
    .attr("stroke-width", 0.6)
    .attr("d", d3.line()
        .x(function(d) { return x(d.date) })
        .y(function(d) { return y(d.close) })
        )

    // Fügt die Fläche unter dem Graphen hinzu
    svg.append("path")
    .datum(data.filter(function(d){return d.stock=="apple"}))
    .attr("id", "apple_line")
    .attr("fill", "none")
    .attr("stroke", "rgb(115,175,72)")
    .attr("stroke-width", 0.6)
    .attr("d", d3.line()
        .x(function(d) { return x(d.date) })
        .y(function(d) { return y(d.close) })
        )

    // Fügt die Fläche unter dem Graphen hinzu
    svg.append("path")
    .datum(data.filter(function(d){return d.stock=="google"}))
    .attr("id", "google_line")
    .attr("fill", "none")
    .attr("stroke", "rgb(56,166,165)")
    .attr("stroke-width", 0.6)
    .attr("d", d3.line()
        .x(function(d) { return x(d.date) })
        .y(function(d) { return y(d.close) })
        )

    // Fügt die Fläche unter dem Graphen hinzu
    svg.append("path")
    .datum(data.filter(function(d){return d.stock=="microsoft"}))
    .attr("id", "microsoft_line")
    .attr("fill", "none")
    .attr("stroke", "rgb(225,124,5)")
    .attr("stroke-width", 0.6)
    .attr("d", d3.line()
        .x(function(d) { return x(d.date) })
        .y(function(d) { return y(d.close) })
        )

    var area_checkbox = false
    var line_checkbox = true


    // Macht die Flächen unter den Graphen entweder sichtbar oder unsichtbar
    function checkboxArea() {
        if (d3.select("#checkbox_area").property("checked")==true) {
            area_checkbox = true
            if (d3.select("#netflix_button").style("background-color")=="rgb(204, 80, 62)") {
                d3.select("#netflix_area").attr("visibility", "visible")
            }
            if (d3.select("#microsoft_button").style("background-color")=="rgb(225, 124, 5)") {
                d3.select("#microsoft_area").attr("visibility", "visible")
            }
            if (d3.select("#amazon_button").style("background-color")=="rgb(237, 173, 8)") {
                d3.select("#amazon_area").attr("visibility", "visible")
            }
            if (d3.select("#apple_button").style("background-color")=="rgb(115, 175, 72)") {
                d3.select("#apple_area").attr("visibility", "visible")
            }
            if (d3.select("#google_button").style("background-color")=="rgb(56, 166, 165)") {
                d3.select("#google_area").attr("visibility", "visible")
            }
        } else if (d3.select("#checkbox_area").property("checked")==false) {
            d3.select("#checkbox_line").property("checked", true)
            checkboxLine()
            area_checkbox = false
            d3.select("#netflix_area").attr("visibility", "hidden")
            d3.select("#microsoft_area").attr("visibility", "hidden")
            d3.select("#amazon_area").attr("visibility", "hidden")
            d3.select("#apple_area").attr("visibility", "hidden")
            d3.select("#google_area").attr("visibility", "hidden")
        }
    }

    d3.select("#checkbox_area").on("click", function() { checkboxArea() })

    // Macht die Kurven entweder sichtbar oder unsichtbar
    function checkboxLine() {
        if (d3.select("#checkbox_line").property("checked")==true) {
            line_checkbox = true
            if (d3.select("#netflix_button").style("background-color")=="rgb(204, 80, 62)") {
                d3.select("#netflix_line").attr("visibility", "visible")
            }
            if (d3.select("#microsoft_button").style("background-color")=="rgb(225, 124, 5)") {
                d3.select("#microsoft_line").attr("visibility", "visible")
            }
            if (d3.select("#amazon_button").style("background-color")=="rgb(237, 173, 8)") {
                d3.select("#amazon_line").attr("visibility", "visible")
            }
            if (d3.select("#apple_button").style("background-color")=="rgb(115, 175, 72)") {
                d3.select("#apple_line").attr("visibility", "visible")
            }
            if (d3.select("#google_button").style("background-color")=="rgb(56, 166, 165)") {
                d3.select("#google_line").attr("visibility", "visible")
            }
        } else if (d3.select("#checkbox_line").property("checked")==false) {
            d3.select("#checkbox_area").property("checked", true)
            checkboxArea()
            line_checkbox = false
            d3.select("#netflix_line").attr("visibility", "hidden")
            d3.select("#microsoft_line").attr("visibility", "hidden")
            d3.select("#amazon_line").attr("visibility", "hidden")
            d3.select("#apple_line").attr("visibility", "hidden")
            d3.select("#google_line").attr("visibility", "hidden")
        }
    }

    d3.select("#checkbox_line").on("click", function() { checkboxLine() })


    // ======================== Macht die einzelnen Aktien sichtbar oder unsichtbar =========================================
    d3.select("#netflix_button").on("click", function() {
        if (d3.select("#netflix_button").style("background-color")=="rgb(204, 80, 62)") {
            if (((d3.select("#netflix_button").style("background-color")=="rgb(204, 80, 62)")+(d3.select("#amazon_button").style("background-color")=="rgb(237, 173, 8)")+(d3.select("#microsoft_button").style("background-color")=="rgb(225, 124, 5)")+(d3.select("#apple_button").style("background-color")=="rgb(115, 175, 72)")+(d3.select("#google_button").style("background-color")=="rgb(56, 166, 165)")) != 1) {
                d3.select("#netflix_button").style("background-color", "#a9b0b8")
                d3.select("#netflix_line").attr("visibility", "hidden")
                d3.select("#netflix_area").attr("visibility", "hidden")
            }
        } else if (d3.select("#netflix_button").style("background-color")=="rgb(169, 176, 184)") {
            d3.select("#netflix_button").style("background-color", "rgb(204,80,62)")
            if (line_checkbox==true) {
                d3.select("#netflix_line").attr("visibility", "visible")
            }
            if (area_checkbox==true) {
                d3.select("#netflix_area").attr("visibility", "visible")
            }
        } 
    })

    d3.select("#amazon_button").on("click", function() {
        if (d3.select("#amazon_button").style("background-color")=="rgb(237, 173, 8)") {
            if (((d3.select("#netflix_button").style("background-color")=="rgb(204, 80, 62)")+(d3.select("#amazon_button").style("background-color")=="rgb(237, 173, 8)")+(d3.select("#microsoft_button").style("background-color")=="rgb(225, 124, 5)")+(d3.select("#apple_button").style("background-color")=="rgb(115, 175, 72)")+(d3.select("#google_button").style("background-color")=="rgb(56, 166, 165)")) != 1) {
                d3.select("#amazon_button").style("background-color", "#a9b0b8")
                d3.select("#amazon_line").attr("visibility", "hidden")
                d3.select("#amazon_area").attr("visibility", "hidden")
            }
        } else if (d3.select("#amazon_button").style("background-color")=="rgb(169, 176, 184)") {
            d3.select("#amazon_button").style("background-color", "rgb(237,173,8)")
            if (line_checkbox==true) {
                d3.select("#amazon_line").attr("visibility", "visible")
            }
            if (area_checkbox==true) {
                d3.select("#amazon_area").attr("visibility", "visible")
            }
        } 
    })

    d3.select("#microsoft_button").on("click", function() {
        if (d3.select("#microsoft_button").style("background-color")=="rgb(225, 124, 5)") {
            if (((d3.select("#netflix_button").style("background-color")=="rgb(204, 80, 62)")+(d3.select("#amazon_button").style("background-color")=="rgb(237, 173, 8)")+(d3.select("#microsoft_button").style("background-color")=="rgb(225, 124, 5)")+(d3.select("#apple_button").style("background-color")=="rgb(115, 175, 72)")+(d3.select("#google_button").style("background-color")=="rgb(56, 166, 165)")) != 1) {
                d3.select("#microsoft_button").style("background-color", "#a9b0b8")
                d3.select("#microsoft_line").attr("visibility", "hidden")
                d3.select("#microsoft_area").attr("visibility", "hidden")
            }
        } else if (d3.select("#microsoft_button").style("background-color")=="rgb(169, 176, 184)") {
            d3.select("#microsoft_button").style("background-color", "rgb(225,124,5)")
            if (line_checkbox==true) {
                d3.select("#microsoft_line").attr("visibility", "visible")
            }
            if (area_checkbox==true) {
                d3.select("#microsoft_area").attr("visibility", "visible")
            }
        } 
    })

    d3.select("#apple_button").on("click", function() {
        if (d3.select("#apple_button").style("background-color")=="rgb(115, 175, 72)") {
            if (((d3.select("#netflix_button").style("background-color")=="rgb(204, 80, 62)")+(d3.select("#amazon_button").style("background-color")=="rgb(237, 173, 8)")+(d3.select("#microsoft_button").style("background-color")=="rgb(225, 124, 5)")+(d3.select("#apple_button").style("background-color")=="rgb(115, 175, 72)")+(d3.select("#google_button").style("background-color")=="rgb(56, 166, 165)")) != 1) {
                d3.select("#apple_button").style("background-color", "#a9b0b8")
                d3.select("#apple_line").attr("visibility", "hidden")
                d3.select("#apple_area").attr("visibility", "hidden")
            }
        } else if (d3.select("#apple_button").style("background-color")=="rgb(169, 176, 184)") {
            d3.select("#apple_button").style("background-color", "rgb(115, 175, 72)")
            if (line_checkbox==true) {
                d3.select("#apple_line").attr("visibility", "visible")
            }
            if (area_checkbox==true) {
                d3.select("#apple_area").attr("visibility", "visible")
            }
        } 
    })

    d3.select("#google_button").on("click", function() {
        if (d3.select("#google_button").style("background-color")=="rgb(56, 166, 165)") {
            if (((d3.select("#netflix_button").style("background-color")=="rgb(204, 80, 62)")+(d3.select("#amazon_button").style("background-color")=="rgb(237, 173, 8)")+(d3.select("#microsoft_button").style("background-color")=="rgb(225, 124, 5)")+(d3.select("#apple_button").style("background-color")=="rgb(115, 175, 72)")+(d3.select("#google_button").style("background-color")=="rgb(56, 166, 165)")) != 1) {
                d3.select("#google_button").style("background-color", "#a9b0b8")
                d3.select("#google_line").attr("visibility", "hidden")
                d3.select("#google_area").attr("visibility", "hidden")
            }
        } else if (d3.select("#google_button").style("background-color")=="rgb(169, 176, 184)") {
            d3.select("#google_button").style("background-color", "rgb(56,166,165)")
            if (line_checkbox==true) {
                d3.select("#google_line").attr("visibility", "visible")
            }
            if (area_checkbox==true) {
                d3.select("#google_area").attr("visibility", "visible")
            }
        } 
    })


    // Schaltet den Fokus an oder aus
    var focus_active = false
    d3.select("#checkbox_focus").on("click", function() {
        if (d3.select("#checkbox_focus").property("checked")==true) {
            focus_active = true
        } else {
            focus_active = false
        }
    })

    // ========================= Focus =======================================

    // Findet den nächsten x Wert zur Position der Maus
    var bisect = d3.bisector(function(d) { return d.date; }).left;

    // Erstellt den Kreis, der den Wert fokussiert
    var focus = svg
        .append('g')
        .append('circle')
        .style("fill", "none")
        .attr("stroke", "#a9b0b8")
        .attr("stroke-width", 3)
        .attr('r', 8.5)
        .style("opacity", 0)

    // Erstellt die horizontale Linie zum Kreis
    var focus_horizontal_line = svg
        .append('g')
        .append("line")
        .style("stroke-dasharray","5,5")
        .style("stroke", "#a9b0b8")
        .style("opacity", 0)

    // Erstellt die vertikale Linie zum Kreis
    var focus_vertical_line = svg
        .append('g')
        .append("line")
        .style("stroke-dasharray","5,5")
        .style("stroke", "#a9b0b8")
        .style("opacity", 0)

    var rect_width_vertical = 80  
    var rect_height_vertical = 15  
    // Erstellt ein Rechteck mit dem passenden x Wert
    var focus_vertical_rect = svg
        .append('g')
        .append("rect")
            .attr("height", rect_height_vertical)
            .attr("width", rect_width_vertical)
            .attr("rx", 7)
            .style("opacity", 0)

    var focus_vertical_text = svg
        .append('g')
        .append("text")
            .attr("dx", ".6em")
            .attr("dy", ".9em")
            .style("font-size", ".8em")
            .style("font-weight", "bold")
            .style("fill", "#33383e")
            .style("opacity", 0)
    
    var rect_width_horizontal = 40  
    var rect_height_horizontal = 15 
    // Erstellt ein Rechteck mit dem passenden y Wert
    var focus_horizontal_rect = svg
        .append('g')
        .append("rect")
            .attr("height", rect_height_horizontal)
            .attr("width", rect_width_horizontal)
            .attr("rx", 7)
            .style("opacity", 0)

    var focus_horizontal_text = svg
        .append('g')
        .append("text")
            .attr("dy", ".9em")
            .style("font-size", ".8em")
            .style("font-weight", "bold")
            .style("fill", "#33383e")
            .style("opacity", 0)

    // Das SVG Element nimmt alle Events von der Maus auf
    svg
    .append('rect')
    .style("fill", "none")
    .style("pointer-events", "all")
    .attr('width', width)
    .attr('height', height)
    .on('mouseover', mouseover)
    .on('mousemove', mousemove)
    .on('mouseout', mouseout)

    // Verändert die Position der zum Fokus gehörenden Element und ihre Sichtbarkeit
    function mouseover() {
        var select_button = "#"+d3.select("#focusStockSelection").property("value")+"_button"
        if (focus_active && !(d3.select("#focusStockSelection").property("value")=="noSelection") && !(d3.select(select_button).style("background-color")=="rgb(169, 176, 184)")) {
            focus.style("opacity", 1)
            focus_horizontal_line.style("opacity", 1)
            focus_vertical_line.style("opacity", 1)
            focus_vertical_rect.style("opacity", 1)
            focus_vertical_text.style("opacity", 1)
            focus_horizontal_rect.style("opacity", 1)
            focus_horizontal_text.style("opacity", 1)
        }
    }

    function mousemove() {
        var focusStockOption = d3.select("#focusStockSelection").property("value")
        var select_button = "#"+focusStockOption+"_button"
        if (focus_active && !(focusStockOption=="noSelection") && !(d3.select(select_button).style("background-color")=="rgb(169, 176, 184)")) {
            // Die passende Koordinate wird erstellt
            var x0 = x.invert(d3.mouse(this)[0]);
            var i = bisect(data.filter(function(d){return d.stock==focusStockOption}), x0, 1);
            selectedData = data.filter(function(d){return d.stock==focusStockOption})[i]
            focus
                .attr("cx", x(selectedData.date))
                .attr("cy", y(selectedData.close))
            focus_horizontal_line
                .attr("x1", 0)
                .attr("x2", x(selectedData.date)-8.5)
                .attr("y1", y(selectedData.close))
                .attr("y2", y(selectedData.close))
            focus_vertical_line
                .attr("x1", x(selectedData.date))
                .attr("x2", x(selectedData.date))
                .attr("y1", y(0))
                .attr("y2", y(selectedData.close)+8.5)
            rect_color = focusStockOption=="google" ? "rgb(56,166,165)" : (focusStockOption=="apple" ? "rgb(115,175,72)" : (focusStockOption=="amazon" ? "rgb(237,173,8)" : (focusStockOption=="microsoft" ? "rgb(225,124,5)" : "rgb(204,80,62)")))
            focus_vertical_rect
                .attr("x", x(selectedData.date) - rect_width_vertical/2)
                .attr("y", y(0)+5)
                .style("fill", rect_color)
            focus_vertical_text
                .text(d3.timeFormat("%Y-%m-%d")(selectedData.date))
                .attr("x", x(selectedData.date) - rect_width_vertical/2)
                .attr("y", y(0)+5)
            focus_horizontal_rect
                .attr("x", -(rect_width_horizontal+5))
                .attr("y", y(selectedData.close) - (rect_height_horizontal/2))
                .style("fill", rect_color)
            text_close = ((Math.round(selectedData.close*10)/10).toString()).includes(".") ? (Math.round(selectedData.close*10)/10).toString() : ((Math.round(selectedData.close*10)/10).toString()) + ".0"
            dx = text_close.length == 1 ? "1.3em" : (text_close.length == 2 ? "1em" : (text_close.length == 3 ? ".85em" : (text_close.length == 4 ? ".58em" : ".28em")))
            focus_horizontal_text
                .text(text_close)
                .attr("dx", dx)
                .attr("x", -(rect_width_horizontal+5))
                .attr("y", y(selectedData.close) - (rect_height_horizontal/2))
        }
    }
    function mouseout() {
        var select_button = "#"+d3.select("#focusStockSelection").property("value")+"_button"
        if (focus_active && !(d3.select("#focusStockSelection").property("value")=="noSelection") && !(d3.select(select_button).style("background-color")=="rgb(169, 176, 184)")) {
            focus.style("opacity", 0)
            focus_horizontal_line.style("opacity", 0)
            focus_vertical_line.style("opacity", 0)
            focus_vertical_rect.style("opacity", 0)
            focus_vertical_text.style("opacity", 0)
            focus_horizontal_rect.style("opacity", 0)
            focus_horizontal_text.style("opacity", 0)
        }
    }

    })
})