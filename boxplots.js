//d3.csv("https://gist.githubusercontent.com/Niwando/7a832f2ed5a0cbcd35ff252a1e22c7d7/raw/73e70f49b8e2de4c89573360716eea6d359a84b0/raw_amazon_stock_data");
document.addEventListener('DOMContentLoaded', function(e) {
    var data_microsoft = "https://gist.githubusercontent.com/Niwando/f0836044aaeb0cb1fa51594a7237aed5/raw/5f2276355872912ae5a7f0770221ccc58e6894f5/microsoft_data_stock_analysis"
    var data_apple = "https://gist.githubusercontent.com/Niwando/d3cc533cb712b0491cd64a7fb27b0407/raw/f0027104f50bee7c0654c2fa839a7feb857f4181/apple_data_stock_analysis"
    var data_amazon = "https://gist.githubusercontent.com/Niwando/897aecd723c994d6873632454f23c460/raw/5ab923084c88bd4f025d0250393484695e3c6629/amazon_data_stock_analysis"
    var data_link = data_amazon

    // Wenn eine andere Aktie ausgewählt wird, setztz sich der slider zurück
    function resetSlider() {
        var sliderLeft = document.getElementById('input-left')
        var sliderRight = document.getElementById('input-right')
        var thumbLeft = document.querySelector(".slider > .thumb.left");
        var thumbRight = document.querySelector(".slider > .thumb.right");
        var range = document.querySelector(".slider > .range");
        sliderLeft.value = "0"
        sliderRight.value = "24"

        var _thisLeft = sliderLeft,
            min = parseInt(_thisLeft.min),
            max = parseInt(_thisLeft.max);
        _thisLeft.value = Math.min(parseInt(_thisLeft.value), parseInt(sliderRight.value) - 1);
        var percentLeft = ((_thisLeft.value - min) / (max - min)) * 100;
        thumbLeft.style.left = percentLeft + "%";
        range.style.left = percentLeft + "%";

        var _thisRight = sliderRight,
            min = parseInt(_thisRight.min),
            max = parseInt(_thisRight.max);
        _thisRight.value = Math.max(parseInt(_thisRight.value), parseInt(sliderLeft.value) + 1);
        var percentRight = ((_thisRight.value - min) / (max - min)) * 100;
        thumbRight.style.right = (100 - percentRight) + "%";
        range.style.right = (100 - percentRight) + "%";

        d3.select("#sliderDisplayLeftValue")
            .text("2000")
        d3.select("#sliderDisplayRightValue")
            .text("2024")
    }

    // Aktionen, wenn die einzelnen Aktien ausgewählt werden
    d3.select("#button_microsoft").on("click", function() {
        resetSlider()
        d3.select("#button_apple")
            .style("background-color", "#a9b0b8")
            .style("color", "#33383e")
        d3.select("#button_amazon")
            .style("background-color", "#a9b0b8")
            .style("color", "#33383e")
        d3.select("#button_microsoft")
            .style("background-color", "#e7880d")
            .style("color", "#33383e")
        d3.select("#stockName")
            .text("Microsoft Corp.")
        d3.select("#stockSymbol")
            .text("MSF")
        d3.select("#stockISIN")
            .text("US5949181045")
        d3.select("#stockWKN")
            .text("870747")
        data_link = data_microsoft
        d3.select("#mainSvgBoxplots").remove()
        d3.select("#mainSvgBarchart").remove()
        d3.select("#mainSvgGauge").remove()
        drawBoxplots()
    })
    d3.select("#button_apple").on("click", function() {
        resetSlider()
        d3.select("#button_amazon")
            .style("background-color", "#a9b0b8")
            .style("color", "#33383e")
        d3.select("#button_microsoft")
            .style("background-color", "#a9b0b8")
            .style("color", "#33383e")
        d3.select("#button_apple")
            .style("background-color", "#e7880d")
            .style("color", "#33383e")
        d3.select("#stockName")
            .text("Apple Inc.")
        d3.select("#stockSymbol")
            .text("APC")
        d3.select("#stockISIN")
            .text("US0378331005")
        d3.select("#stockWKN")
            .text("865985")
        data_link = data_apple
        d3.select("#mainSvgBoxplots").remove()
        d3.select("#mainSvgBarchart").remove()
        d3.select("#mainSvgGauge").remove()
        drawBoxplots()
    })
    d3.select("#button_amazon").on("click", function() {
        resetSlider()
        d3.select("#button_apple")
            .style("background-color", "#a9b0b8")
            .style("color", "#33383e")
        d3.select("#button_microsoft")
            .style("background-color", "#a9b0b8")
            .style("color", "#33383e")
        d3.select("#button_amazon")
            .style("background-color", "#e7880d")
            .style("color", "#33383e")
        d3.select("#stockName")
            .text("Amazon.com Inc.")
        d3.select("#stockSymbol")
            .text("AMZ")
        d3.select("#stockISIN")
            .text("US0231351067")
        d3.select("#stockWKN")
            .text("906866")
        data_link = data_amazon
        d3.select("#mainSvgBoxplots").remove()
        d3.select("#mainSvgBarchart").remove()
        d3.select("#mainSvgGauge").remove()
        drawBoxplots()
    })

    // Funktion um die Graphen zu zeichnen
    drawBoxplots()
    function drawBoxplots() {
    // Daten werden eingelesen
    d3.csv(data_link, function(data) {

    // ====================== CANDLECHART ========================
    
    // Größe des Graphen (CANDLECHART)
    var margin = {top: 10, right: 30, bottom: 30, left: 40},
    width = 1400 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;
    // Erstellung eines SVG Elements (CANDLECHART)
    var svg = d3.select("#candlestickchart")
    .append("svg")
        .attr("id", "mainSvgBoxplots")
        .attr("viewBox", "0 0 "+ (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom))
        .attr("preserveAspectRatio", "xMidYMid meet")
    .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");


    // Größe des Graphen (BARCHART)
    var margin_barchart = {top: 10, right: 30, bottom: 30, left: 40},
    width_barchart = 1400 - margin_barchart.left - margin_barchart.right,
    height_barchart = 184 - margin_barchart.top - margin_barchart.bottom;
    // Erstellung eines SVG Elements (BARCHART)
    var svg_barchart = d3.select("#barchart")
    .append("svg")
        .attr("id", "mainSvgBarchart")
        .attr("viewBox", "0 0 "+ (width_barchart + margin_barchart.left + margin_barchart.right) + " " + (height_barchart + margin_barchart.top + margin_barchart.bottom))
        .attr("preserveAspectRatio", "xMidYMid meet")
    .append("g")
        .attr("transform",
            "translate(" + margin_barchart.left + "," + margin_barchart.top + ")");


    // Den Datensatz in eine Variable abspeichern
    var sumstat = d3.nest()
        .key(function(d) {return d.year_month;})
        .rollup(function(d) {
        if (parseFloat((d.map(function(g) {return g.open;}))[0]) > parseFloat((d.map(function(g) {return g.close;}))[0])) {
            q1 = d.map(function(g) {return g.close;});
            q3 = d.map(function(g) {return g.open;});
        } else {
            q3 = d.map(function(g) {return g.close;});
            q1 = d.map(function(g) {return g.open;});
        }
        min = parseFloat(d.map(function(g) {return g.min;}));
        max = parseFloat(d.map(function(g) {return g.max;}));
        color = d.map(function(g) {return g.color;});
        volume = d.map(function(g) {return g.volume;});
        return({q1: q1, q3: q3, min: min, max: max, color: color, volume: volume})
        })
        .entries(data)

    var xAxisValues = [
        '2000-01', '2000-02', '2000-03', '2000-04', '2000-05', '2000-06', '2000-07',
        '2000-08', '2000-09', '2000-10', '2000-11', '2000-12', '2001-01', '2001-02',
        '2001-03', '2001-04', '2001-05', '2001-06', '2001-07', '2001-08', '2001-09',
        '2001-10', '2001-11', '2001-12', '2002-01', '2002-02', '2002-03', '2002-04',
        '2002-05', '2002-06', '2002-07', '2002-08', '2002-09', '2002-10', '2002-11',
        '2002-12', '2003-01', '2003-02', '2003-03', '2003-04', '2003-05', '2003-06',
        '2003-07', '2003-08', '2003-09', '2003-10', '2003-11', '2003-12', '2004-01',
        '2004-02', '2004-03', '2004-04', '2004-05', '2004-06', '2004-07', '2004-08',
        '2004-09', '2004-10', '2004-11', '2004-12', '2005-01', '2005-02', '2005-03',
        '2005-04', '2005-05', '2005-06', '2005-07', '2005-08', '2005-09', '2005-10',
        '2005-11', '2005-12', '2006-01', '2006-02', '2006-03', '2006-04', '2006-05',
        '2006-06', '2006-07', '2006-08', '2006-09', '2006-10', '2006-11', '2006-12',
        '2007-01', '2007-02', '2007-03', '2007-04', '2007-05', '2007-06', '2007-07',
        '2007-08', '2007-09', '2007-10', '2007-11', '2007-12', '2008-01', '2008-02',
        '2008-03', '2008-04', '2008-05', '2008-06', '2008-07', '2008-08', '2008-09',
        '2008-10', '2008-11', '2008-12', '2009-01', '2009-02', '2009-03', '2009-04',
        '2009-05', '2009-06', '2009-07', '2009-08', '2009-09', '2009-10', '2009-11',
        '2009-12', '2010-01', '2010-02', '2010-03', '2010-04', '2010-05', '2010-06',
        '2010-07', '2010-08', '2010-09', '2010-10', '2010-11', '2010-12', '2011-01',
        '2011-02', '2011-03', '2011-04', '2011-05', '2011-06', '2011-07', '2011-08',
        '2011-09', '2011-10', '2011-11', '2011-12', '2012-01', '2012-02', '2012-03',
        '2012-04', '2012-05', '2012-06', '2012-07', '2012-08', '2012-09', '2012-10',
        '2012-11', '2012-12',
        '2013-01', '2013-02', '2013-03', '2013-04', '2013-05', '2013-06', '2013-07',
        '2013-08', '2013-09', '2013-10', '2013-11', '2013-12', '2014-01', '2014-02',
        '2014-03', '2014-04', '2014-05', '2014-06', '2014-07', '2014-08', '2014-09',
        '2014-10', '2014-11', '2014-12', '2015-01', '2015-02', '2015-03', '2015-04',
        '2015-05', '2015-06', '2015-07', '2015-08', '2015-09', '2015-10', '2015-11',
        '2015-12', '2016-01', '2016-02', '2016-03', '2016-04', '2016-05', '2016-06',
        '2016-07', '2016-08', '2016-09', '2016-10', '2016-11', '2016-12', '2017-01',
        '2017-02', '2017-03', '2017-04', '2017-05', '2017-06', '2017-07', '2017-08',
        '2017-09', '2017-10', '2017-11', '2017-12', '2018-01', '2018-02', '2018-03',
        '2018-04', '2018-05', '2018-06', '2018-07', '2018-08', '2018-09', '2018-10',
        '2018-11', '2018-12', '2019-01', '2019-02', '2019-03', '2019-04', '2019-05',
        '2019-06', '2019-07', '2019-08', '2019-09', '2019-10', '2019-11', '2019-12',
        '2020-01', '2020-02', '2020-03', '2020-04', '2020-05', '2020-06', '2020-07',
        '2020-08', '2020-09', '2020-10', '2020-11', '2020-12', '2021-01', '2021-02',
        '2021-03', '2021-04', '2021-05', '2021-06', '2021-07', '2021-08', '2021-09',
        '2021-10', '2021-11', '2021-12', '2022-01', '2022-02', '2022-03', '2022-04',
        '2022-05', '2022-06', '2022-07', '2022-08', '2022-09', '2022-10', '2022-11',
        '2022-12', '2023-01', '2023-02', '2023-03'
    ]

    var xAxisValuesCurrent = [
        '2000-01', '2000-02', '2000-03', '2000-04', '2000-05', '2000-06', '2000-07',
        '2000-08', '2000-09', '2000-10', '2000-11', '2000-12', '2001-01', '2001-02',
        '2001-03', '2001-04', '2001-05', '2001-06', '2001-07', '2001-08', '2001-09',
        '2001-10', '2001-11', '2001-12', '2002-01', '2002-02', '2002-03', '2002-04',
        '2002-05', '2002-06', '2002-07', '2002-08', '2002-09', '2002-10', '2002-11',
        '2002-12', '2003-01', '2003-02', '2003-03', '2003-04', '2003-05', '2003-06',
        '2003-07', '2003-08', '2003-09', '2003-10', '2003-11', '2003-12', '2004-01',
        '2004-02', '2004-03', '2004-04', '2004-05', '2004-06', '2004-07', '2004-08',
        '2004-09', '2004-10', '2004-11', '2004-12', '2005-01', '2005-02', '2005-03',
        '2005-04', '2005-05', '2005-06', '2005-07', '2005-08', '2005-09', '2005-10',
        '2005-11', '2005-12', '2006-01', '2006-02', '2006-03', '2006-04', '2006-05',
        '2006-06', '2006-07', '2006-08', '2006-09', '2006-10', '2006-11', '2006-12',
        '2007-01', '2007-02', '2007-03', '2007-04', '2007-05', '2007-06', '2007-07',
        '2007-08', '2007-09', '2007-10', '2007-11', '2007-12', '2008-01', '2008-02',
        '2008-03', '2008-04', '2008-05', '2008-06', '2008-07', '2008-08', '2008-09',
        '2008-10', '2008-11', '2008-12', '2009-01', '2009-02', '2009-03', '2009-04',
        '2009-05', '2009-06', '2009-07', '2009-08', '2009-09', '2009-10', '2009-11',
        '2009-12', '2010-01', '2010-02', '2010-03', '2010-04', '2010-05', '2010-06',
        '2010-07', '2010-08', '2010-09', '2010-10', '2010-11', '2010-12', '2011-01',
        '2011-02', '2011-03', '2011-04', '2011-05', '2011-06', '2011-07', '2011-08',
        '2011-09', '2011-10', '2011-11', '2011-12', '2012-01', '2012-02', '2012-03',
        '2012-04', '2012-05', '2012-06', '2012-07', '2012-08', '2012-09', '2012-10',
        '2012-11', '2012-12',
        '2013-01', '2013-02', '2013-03', '2013-04', '2013-05', '2013-06', '2013-07',
        '2013-08', '2013-09', '2013-10', '2013-11', '2013-12', '2014-01', '2014-02',
        '2014-03', '2014-04', '2014-05', '2014-06', '2014-07', '2014-08', '2014-09',
        '2014-10', '2014-11', '2014-12', '2015-01', '2015-02', '2015-03', '2015-04',
        '2015-05', '2015-06', '2015-07', '2015-08', '2015-09', '2015-10', '2015-11',
        '2015-12', '2016-01', '2016-02', '2016-03', '2016-04', '2016-05', '2016-06',
        '2016-07', '2016-08', '2016-09', '2016-10', '2016-11', '2016-12', '2017-01',
        '2017-02', '2017-03', '2017-04', '2017-05', '2017-06', '2017-07', '2017-08',
        '2017-09', '2017-10', '2017-11', '2017-12', '2018-01', '2018-02', '2018-03',
        '2018-04', '2018-05', '2018-06', '2018-07', '2018-08', '2018-09', '2018-10',
        '2018-11', '2018-12', '2019-01', '2019-02', '2019-03', '2019-04', '2019-05',
        '2019-06', '2019-07', '2019-08', '2019-09', '2019-10', '2019-11', '2019-12',
        '2020-01', '2020-02', '2020-03', '2020-04', '2020-05', '2020-06', '2020-07',
        '2020-08', '2020-09', '2020-10', '2020-11', '2020-12', '2021-01', '2021-02',
        '2021-03', '2021-04', '2021-05', '2021-06', '2021-07', '2021-08', '2021-09',
        '2021-10', '2021-11', '2021-12', '2022-01', '2022-02', '2022-03', '2022-04',
        '2022-05', '2022-06', '2022-07', '2022-08', '2022-09', '2022-10', '2022-11',
        '2022-12', '2023-01', '2023-02', '2023-03'
    ]

    var xAxisTickValues = [
        '2000-01', '2001-01', '2002-01', '2003-01', '2004-01', '2005-01', '2006-01', '2007-01',
        '2008-01', '2009-01', '2010-01', '2011-01', '2012-01', '2013-01', '2014-01', '2015-01',
        '2016-01', '2017-01', '2018-01', '2019-01', '2020-01', '2021-01', '2022-01', '2023-01',
    ]

    var xAxisTickValuesCurrent = [
        '2000-01', '2001-01', '2002-01', '2003-01', '2004-01', '2005-01', '2006-01', '2007-01',
        '2008-01', '2009-01', '2010-01', '2011-01', '2012-01', '2013-01', '2014-01', '2015-01',
        '2016-01', '2017-01', '2018-01', '2019-01', '2020-01', '2021-01', '2022-01', '2023-01',
    ]

    // X Achse (CANDLECHART)
    var x = d3.scaleBand()
        .range([ 0, width ])
        .domain(xAxisValues)
        .paddingInner(1)
        .paddingOuter(1)
    
    var xaxis = d3.axisBottom(x)
        .tickValues([
            '2000-01', '2001-01', '2002-01', '2003-01', '2004-01', '2005-01', '2006-01', '2007-01',
            '2008-01', '2009-01', '2010-01', '2011-01', '2012-01', '2013-01', '2014-01', '2015-01',
            '2016-01', '2017-01', '2018-01', '2019-01', '2020-01', '2021-01', '2022-01', '2023-01',
        ])
        .tickFormat(function(d) { return d.substring(0, 4); })
        .tickSizeOuter(0)

    var xAxis = svg.append("g").attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xaxis)

    var yAxisMaxStart = 0
    var yAxisMinStart = 1000000000
    xAxisValues.forEach(value => {
        if (sumstat[xAxisValues.indexOf(value)].value.max > yAxisMaxStart) { yAxisMaxStart = sumstat[xAxisValues.indexOf(value)].value.max}
        if (sumstat[xAxisValues.indexOf(value)].value.min < yAxisMinStart) { yAxisMinStart = sumstat[xAxisValues.indexOf(value)].value.min}
    }) 

    // Y Achse (CANDLECHART)
    var y = d3.scaleLinear()
        .domain([0,yAxisMaxStart])
        .range([height, 0])
    var yaxis = d3.axisLeft(y)
        .tickSizeOuter(0)
    var yAxis = svg.append("g").attr("class", "axis").call(yaxis)


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

    // ================ BARCHART =======================
    // X Axis (BARCHART)
    var x_barchart = d3.scaleBand()
        .range([ 0, width_barchart ])
        .domain(xAxisValues)
        .paddingInner(1)
        .paddingOuter(1)
    
    var xaxis_barchart = d3.axisBottom(x_barchart)
        .tickValues([
            '2000-01', '2001-01', '2002-01', '2003-01', '2004-01', '2005-01', '2006-01', '2007-01',
            '2008-01', '2009-01', '2010-01', '2011-01', '2012-01', '2013-01', '2014-01', '2015-01',
            '2016-01', '2017-01', '2018-01', '2019-01', '2020-01', '2021-01', '2022-01', '2023-01',
        ])
        .tickFormat(function(d) { return d.substring(0, 4); })
        .tickSizeOuter(0)

    var xAxis_barchart = svg_barchart.append("g").attr("class", "axis")
        .attr("transform", "translate(0," + height_barchart + ")")
        .call(xaxis_barchart)

    var yAxisMaxStart_barchart = 0
    xAxisValues.forEach(value => {
        if (sumstat[xAxisValues.indexOf(value)].value.volume/1000000 > yAxisMaxStart_barchart) { yAxisMaxStart_barchart = sumstat[xAxisValues.indexOf(value)].value.volume/1000000}
    })   

    // Y Achse (BARCHART)
    var y_barchart = d3.scaleLinear()
        .domain([0,yAxisMaxStart_barchart+(yAxisMaxStart_barchart*0.05)])
        .range([height_barchart, 0])
    var yaxis_barchart = d3.axisLeft(y_barchart)
        .tickSizeOuter(0)
    var yAxis_barchart = svg_barchart.append("g").attr("class", "axis").call(yaxis_barchart)
    d3.selectAll(".axis line").style("stroke", "#a9b0b8")
    d3.selectAll(".axis path").style("stroke", "#a9b0b8")
    d3.selectAll(".axis text").style("stroke", "#a9b0b8")

    var yAxisTicks_barchart = yaxis_barchart.scale().ticks()
    var greyLines_barchart = svg_barchart.append('g')
    yAxisTicks_barchart.forEach(tick => {
        tickID = tick.toString().includes(".") ? tick.toString().replace(".", "") : tick
        tickID = tickID.toString().includes(",") ? tickID.toString().replace(",", "") : tickID
        greyLines_barchart
            .append("line")
            .attr("id", "line_barchart"+tick)
            .attr("x1", 0)
            .attr("x2", width_barchart)
            .attr("y1", y_barchart(tick)+0.5)
            .attr("y2", y_barchart(tick)+0.5)
            .attr("stroke", "#a9b0b8")
            .style("opacity", 0.1)
    })


    // ================================== CANDLECHART =================================
    // Erstellt ein g element für die Boxen und Linien vom Candlechart
    var boxplots = svg.append('g')

    // die Boxen des Candlecharts
    var boxWidth = 2.5
    boxplots
        .selectAll("boxes")
        .data(sumstat)
        .enter()
        .append("rect")
            .attr("id", (d,i)=>{return "boxes" + d.key})
            .attr("x", function(d){return(x(d.key)-(boxWidth/2)+0.5)})
            .attr("y", function(d){return(y(d.value.q3))})
            .attr("height", 0)
            .attr("width", boxWidth)
            .style("fill", function(d){return(d.value.color)})
            .attr("rx", 2)
        .on('mouseover', function (d, i) {
            d3.select(this)
                .style("fill", "#e7880d")
            d3.select("#verticalLines"+d.key)
                .attr("stroke", "#e7880d")
                .attr("y1", 0)
                .attr("y2", height)
            d3.select("#bars"+d.key)
                .style("fill", "#e7880d")
                d3.select("#hoverLine")
                .attr("x1", x_barchart(d.key)+0.5)
                .attr("x2", x_barchart(d.key)+0.5)
                .attr("y1", 0)
                .attr("y2", height_barchart)
                .attr("stroke-width", lineStrokeWidth)
            d3.select("#stockPeriod")
                .text(((d.key).substring(5,7) == "01" ? "January" : ((d.key).substring(5,7) == "02" ? "February" : ((d.key).substring(5,7) == "03" ? "March" : ((d.key).substring(5,7) == "04" ? "April" : ((d.key).substring(5,7) == "05" ? "May" : ((d.key).substring(5,7) == "06" ? "June" : ((d.key).substring(5,7) == "07" ? "July" : ((d.key).substring(5,7) == "08" ? "August" : ((d.key).substring(5,7) == "09" ? "September" : ((d.key).substring(5,7) == "10" ? "October" : ((d.key).substring(5,7) == "11" ? "November" : "December"))))))))))) + " " + (d.key).substring(0,4))
            d3.select("#stockHighest")
                .text(Math.round(d.value.max*100)/100+"$")
            d3.select("#stockLowest")
                .text(Math.round(d.value.min*100)/100+"$")
            d3.select("#stockOpen")
                .text(d.value.color == "#b42525" ? Math.round(d.value.q3*100)/100+"$" : Math.round(d.value.q1*100)/100+"$")
            d3.select("#stockClose")
                .text(d.value.color == "#b42525" ? Math.round(d.value.q1*100)/100+"$" : Math.round(d.value.q3*100)/100+"$")
            d3.select("#stockVolume")
                .text(Math.round(d.value.volume/1000000)+" m.")
        })
        .on('mouseleave', function (d, i) {
            d3.select(this)
                .style("fill", function(d){return(d.value.color)});
            d3.select("#verticalLines"+d.key)
                .attr("stroke", function(d){return(d.value.color)})
                .attr("y1", function(d){return(y(d.value.min))})
                .attr("y2", function(d){return(y(d.value.max))})
            d3.select("#bars"+d.key)
                .style("fill", function(d){return(d.value.color)});
            d3.select("#hoverLine")
                .attr("y2", 0)
            d3.select("#stockPeriod")
                .text(stockPeriod)
            d3.select("#stockHighest")
                .text(stockHighest)
            d3.select("#stockLowest")
                .text(stockLowest)
            d3.select("#stockOpen")
                .text(stockOpen)
            d3.select("#stockClose")
                .text(stockClose)
            d3.select("#stockVolume")
                .text(stockVolume)
        })

    // die vertikalen Linien des Candlecharts
    boxplots
        .selectAll("vertLines")
        .data(sumstat)
        .enter()
        .append("line")
        .attr("id", (d,i)=>{return "verticalLines"+d.key})
        .attr("x1", function(d){return(x(d.key)+0.5)})
        .attr("x2", function(d){return(x(d.key)+0.5)})
        .attr("y1", function(d){return(y(d.value.max))})
        .attr("y2", function(d){return(y(d.value.max))})
        .attr("stroke", function(d){return(d.value.color)})
        .style("width", 40)
        .on('mouseover', function (d, i) {
            d3.select(this)
                .attr("stroke", "#e7880d")
                .attr("y1", 0)
                .attr("y2", height);
            d3.select("#boxes"+d.key)
                .style("fill", "#e7880d");
            d3.select("#bars"+d.key)
                .style("fill", "#e7880d");
                d3.select("#hoverLine")
                .attr("x1", x_barchart(d.key)+0.5)
                .attr("x2", x_barchart(d.key)+0.5)
                .attr("y1", 0)
                .attr("y2", height_barchart)
                .attr("stroke-width", lineStrokeWidth)
            d3.select("#stockPeriod")
                .text(((d.key).substring(5,7) == "01" ? "January" : ((d.key).substring(5,7) == "02" ? "February" : ((d.key).substring(5,7) == "03" ? "March" : ((d.key).substring(5,7) == "04" ? "April" : ((d.key).substring(5,7) == "05" ? "May" : ((d.key).substring(5,7) == "06" ? "June" : ((d.key).substring(5,7) == "07" ? "July" : ((d.key).substring(5,7) == "08" ? "August" : ((d.key).substring(5,7) == "09" ? "September" : ((d.key).substring(5,7) == "10" ? "October" : ((d.key).substring(5,7) == "11" ? "November" : "December"))))))))))) + " " + (d.key).substring(0,4))
            d3.select("#stockHighest")
                .text(Math.round(d.value.max*100)/100+"$")
            d3.select("#stockLowest")
                .text(Math.round(d.value.min*100)/100+"$")
            d3.select("#stockOpen")
                .text(d.value.color == "#b42525" ? Math.round(d.value.q3*100)/100+"$" : Math.round(d.value.q1*100)/100+"$")
            d3.select("#stockClose")
                .text(d.value.color == "#b42525" ? Math.round(d.value.q1*100)/100+"$" : Math.round(d.value.q3*100)/100+"$")
            d3.select("#stockVolume")
                .text(Math.round(d.value.volume/1000000)+" m.")
        })
        .on('mouseleave', function (d, i) {
            d3.select(this)
                .attr("stroke", function(d){return(d.value.color)})
                .attr("y1", function(d){return(y(d.value.min))})
                .attr("y2", function(d){return(y(d.value.max))})
            d3.select("#boxes"+d.key)
                .style("fill", function(d){return(d.value.color)});
            d3.select("#bars"+d.key)
                .style("fill", function(d){return(d.value.color)});
            d3.select("#hoverLine")
                .attr("y2", 0)
            d3.select("#stockPeriod")
                .text(stockPeriod)
            d3.select("#stockHighest")
                .text(stockHighest)
            d3.select("#stockLowest")
                .text(stockLowest)
            d3.select("#stockOpen")
                .text(stockOpen)
            d3.select("#stockClose")
                .text(stockClose)
            d3.select("#stockVolume")
                .text(stockVolume)
        })

        // ==================================== BARCHART ====================================
        // g Element für den Barchart
        var barchart = svg_barchart.append('g')

        // hover Linie
        barchart
            .selectAll("hoverLine")
            .data(sumstat)
            .enter()
            .append("line")
                .attr("id", "hoverLine")
                .attr("x1", x_barchart("2000-01")+0.5)
                .attr("x2", x_barchart("2000-01")+0.5)
                .attr("y1", 0)
                .attr("y2", 0)
                .attr("stroke", "#e7880d")


        // die Rechtecke des Barcharts
        var boxWidth = 2.5
        barchart
            .selectAll("bars")
            .data(sumstat)
            .enter()
            .append("rect")
                .attr("id", (d,i)=>{return "bars" + d.key})
                .attr("x", function(d){return(x_barchart(d.key)-(boxWidth/2)+0.5)})
                .attr("y", 0)
                .attr("height", 0)
                .attr("width", boxWidth)
                .style("fill", function(d){return(d.value.color)})
                .attr("rx", 2)
                .on('mouseover', function (d, i) {
                    d3.select("#verticalLines"+d.key)
                        .attr("stroke", "#e7880d")
                        .attr("y1", 0)
                        .attr("y2", height);
                    d3.select("#boxes"+d.key)
                        .style("fill", "#e7880d");
                    d3.select("#bars"+d.key)
                        .style("fill", "#e7880d");
                    d3.select("#hoverLine")
                        .attr("x1", x_barchart(d.key)+0.5)
                        .attr("x2", x_barchart(d.key)+0.5)
                        .attr("y1", 0)
                        .attr("y2", height_barchart)
                        .attr("stroke-width", lineStrokeWidth)
                    d3.select("#stockPeriod")
                        .text(((d.key).substring(5,7) == "01" ? "January" : ((d.key).substring(5,7) == "02" ? "February" : ((d.key).substring(5,7) == "03" ? "March" : ((d.key).substring(5,7) == "04" ? "April" : ((d.key).substring(5,7) == "05" ? "May" : ((d.key).substring(5,7) == "06" ? "June" : ((d.key).substring(5,7) == "07" ? "July" : ((d.key).substring(5,7) == "08" ? "August" : ((d.key).substring(5,7) == "09" ? "September" : ((d.key).substring(5,7) == "10" ? "October" : ((d.key).substring(5,7) == "11" ? "November" : "December"))))))))))) + " " + (d.key).substring(0,4))
                    d3.select("#stockHighest")
                        .text(Math.round(d.value.max*100)/100+"$")
                    d3.select("#stockLowest")
                        .text(Math.round(d.value.min*100)/100+"$")
                    d3.select("#stockOpen")
                        .text(d.value.color == "#b42525" ? Math.round(d.value.q3*100)/100+"$" : Math.round(d.value.q1*100)/100+"$")
                    d3.select("#stockClose")
                        .text(d.value.color == "#b42525" ? Math.round(d.value.q1*100)/100+"$" : Math.round(d.value.q3*100)/100+"$")
                    d3.select("#stockVolume")
                        .text(Math.round(d.value.volume/1000000)+" m.")
                })
                .on('mouseleave', function (d, i) {
                    d3.select("#verticalLines"+d.key)
                        .attr("stroke", function(d){return(d.value.color)})
                        .attr("y1", function(d){return(y(d.value.min))})
                        .attr("y2", function(d){return(y(d.value.max))})
                    d3.select("#boxes"+d.key)
                        .style("fill", function(d){return(d.value.color)});
                    d3.select("#bars"+d.key)
                        .style("fill", function(d){return(d.value.color)});
                    d3.select("#hoverLine")
                        .attr("y2", 0)
                    d3.select("#stockPeriod")
                        .text(stockPeriod)
                    d3.select("#stockHighest")
                        .text(stockHighest)
                    d3.select("#stockLowest")
                        .text(stockLowest)
                    d3.select("#stockOpen")
                        .text(stockOpen)
                    d3.select("#stockClose")
                        .text(stockClose)
                    d3.select("#stockVolume")
                        .text(stockVolume)
                })
        
        // ============================= GAUGE ===============================
        var width_gauge = 450
        var height_gauge = 450

        // Berechnung des Radius
        var radius = Math.min(width_gauge, height_gauge) / 2
        // svg für Gauge
        var svg_gauge = d3.select("#piechart")
            .append("svg")
            .attr("id", "mainSvgGauge")
            .attr("viewBox", "0 0 "+ width_gauge + " " + 280)
            .attr("preserveAspectRatio", "xMidYMid meet")
        var g_circle = svg_gauge
            .append("g")
            .attr("transform", "translate(" + width_gauge / 2 + "," + height_gauge / 2 + ")");
        
        var prozent = 0.35
        var winkel = Math.PI * prozent
        var ankathete = Math.cos(winkel) * (radius - ((radius-180)/2))
        var gegenkathete = Math.sin(winkel) * (radius - ((radius-180)/2))

        // Erstellung der Daten für den halben Farbkreis
        var data_anzeige = {a: 25, b: 25, c:25, d:25}
        var zeiger_circle = {e: 100}

        // die Farbskala für den halben Farbkreis
        var color = d3.scaleOrdinal()
        .domain(data_anzeige)
        .range(["#2fb425", "#ccd614", "#e7880d", "#b42525"])

        var color_circle = d3.scaleOrdinal()
        .domain(zeiger_circle)
        .range(["#0c1016"])

        // Erstellung des Kreises und seine Unterteilung und Anfang- und Endwert
        var pie = d3.pie()
        .startAngle(-Math.PI/2)
        .endAngle(Math.PI/2)
        .value(function(d) {return d.value; })
        var data_ready = pie(d3.entries(data_anzeige))

        // Kreis des Zeigers
        var pie_zeiger_circle = d3.pie()
        .value(function(d) {return d.value; })
        var data_circle_ready = pie_zeiger_circle(d3.entries(zeiger_circle))

        // Zeichnen des Halbkreises
        g_circle
            .selectAll('anzeige')
            .data(data_ready)
            .enter()
            .append('path')
            .attr('d', d3.arc()
                .innerRadius(180)
                .outerRadius(radius)
            )
            .attr('fill', function(d){ return(color(d.data.key)) })
            .attr("stroke", "#0c1016")
            .style("stroke-width", "1px")
            .style("opacity", 0.7)

        g_circle 
            .selectAll('circle')
            .data(data_circle_ready)
            .enter()
            .append('path')
            .attr('d', d3.arc()
                .innerRadius(0)
                .outerRadius(radius-200)
            )
            .attr('fill', function(d){ return(color_circle(d.data.key)) })
        
        // Funktion um die Nadel zu zeichnen
        function drawNeedle(prozent) {
            var winkel = Math.PI * prozent
            var ankathete = Math.cos(winkel) * (radius - ((radius-180)/2))
            var gegenkathete = Math.sin(winkel) * (radius - ((radius-180)/2))
            var g_needle = svg_gauge
                .append("g")
                .attr("id", "gNeedle")
                .attr("transform", "translate(" + ((width_gauge/2)-ankathete) + "," + ((height_gauge/2)-gegenkathete) + ")");

            // Zeigernadel
            var pie_zeiger = d3.pie()
            .startAngle(winkel+(Math.PI/2)-0.07)
            .endAngle(winkel+(Math.PI/2)+0.07)
            .value(function(d) {return d.value; })
            var data_zeiger_ready = pie_zeiger(d3.entries(zeiger_circle))
            
            g_needle
                .selectAll('circle')
                .data(data_zeiger_ready)
                .enter()
                .append('path')
                .attr('d', d3.arc()
                    .innerRadius(0)
                    .outerRadius(radius+30)
                )
                .attr('fill', function(d){ return(color_circle(d.data.key)) })
        }

        // Für die Animation der Nadel
        function drawNeedleAnimation(prozentEingabeStart, prozentEingabeEnde, geschwindigkeit) {
            var tausendstelProzentDifference = (prozentEingabeEnde-prozentEingabeStart) / 10000
            drawNeedle(prozentEingabeStart)
            for (let i=1; i<10001; i++) {
                // 1 second delay
                setTimeout(function(){
                    d3.select("#gNeedle").remove()
                    var prozent = prozentEingabeStart + (tausendstelProzentDifference*i)
                    var winkel = Math.PI * prozent
                    var ankathete = Math.cos(winkel) * (radius - ((radius-180)/2))
                    var gegenkathete = Math.sin(winkel) * (radius - ((radius-180)/2))
                    g_needle = svg_gauge
                        .append("g")
                        .attr("id", "gNeedle")
                        .attr("transform", "translate(" + ((width_gauge/2)-ankathete) + "," + ((height_gauge/2)-gegenkathete) + ")");
        
                    // Zeigernadel
                    var pie_zeiger = d3.pie()
                    .startAngle(winkel+(Math.PI/2)-0.07)
                    .endAngle(winkel+(Math.PI/2)+0.07)
                    .value(function(d) {return d.value; })
                    var data_zeiger_ready = pie_zeiger(d3.entries(zeiger_circle))
                    
                    g_needle
                        .selectAll('circle')
                        .data(data_zeiger_ready)
                        .enter()
                        .append('path')
                        .attr('d', d3.arc()
                            .innerRadius(0)
                            .outerRadius(radius+30)
                        )
                        .attr('fill', function(d){ return(color_circle(d.data.key)) })
                }, (geschwindigkeit*i));
            }
        }
        var percentage = (((sumstat[xAxisValues.length-1].value.color=="#b42525" ? sumstat[xAxisValues.length-1].value.q1 : sumstat[xAxisValues.length-1].value.q3) - (sumstat[0].value.color=="#b42525" ? sumstat[0].value.q3 : sumstat[0].value.q1)) / (sumstat[0].value.color=="#b42525" ? sumstat[0].value.q3 : sumstat[0].value.q1)) / 24
        if (percentage > 0.2) {percentage = 0.2}
        var endWert = Math.abs(((percentage/0.2)*0.5)-0.5)
        var geschwindigkeitAnfang = endWert>=0.2 ? 0.2 : 0.1
        drawNeedleAnimation(0.5, endWert+0.05, geschwindigkeitAnfang)
        setTimeout(function(){drawNeedleAnimation(endWert+0.05, endWert-0.05, 0.1)}, 10000*geschwindigkeitAnfang)
        setTimeout(function(){drawNeedleAnimation(endWert-0.05, endWert+0.02, 0.08)}, 10000*geschwindigkeitAnfang + 1000)
        setTimeout(function(){drawNeedleAnimation(endWert+0.02, endWert-0.01, 0.05)}, 10000*geschwindigkeitAnfang + 1800)
        setTimeout(function(){drawNeedleAnimation(endWert-0.01, endWert, 0.05)}, 10000*geschwindigkeitAnfang + 2300)
        var startWert = 0

        // Tooltip
        var volumeSum = 0
        xAxisValues.forEach(value => {
            volumeSum += sumstat[xAxisValues.indexOf(value)].value.volume/1000000000
        })
        var stockPeriod = "2000 - 2024"
        var stockHighest = ((Math.round(yAxisMaxStart*100))/100).toFixed(2)+"$"
        var stockLowest = ((Math.round(yAxisMinStart*100))/100).toFixed(2)+"$"
        var stockOpen = ((Math.round((sumstat[0].value.color=="#b42525" ? sumstat[0].value.q3 : sumstat[0].value.q1)*100))/100).toFixed(2)+"$"
        var stockClose = ((Math.round((sumstat[xAxisValues.length-1].value.color=="#b42525" ? sumstat[xAxisValues.length-1].value.q1 : sumstat[xAxisValues.length-1].value.q3)*100))/100).toFixed(2)+"$"
        var stockVolume = Math.round(volumeSum*100)/100+" bn."
        d3.select("#stockHighest")
            .text(stockHighest)
        d3.select("#stockLowest")
            .text(stockLowest)
        d3.select("#stockOpen")
            .text(stockOpen)
        d3.select("#stockClose")
            .text(stockClose)
        d3.select("#stockVolume")
            .text(stockVolume)



        // ================================ ANIMATIONEN =============================================
        transitionDurationGesamt = 0

        xAxisValues.forEach(value => {

            // ============================ CANDLECHART ==============================
            transitionDuration = xAxisValues.indexOf(value) < 87 ? 25 : (xAxisValues.indexOf(value) < 180 ? 40 : (xAxisValues.indexOf(value) < 216 ? 70 : (xAxisValues.indexOf(value) < 243 ? 120 : (xAxisValues.indexOf(value) < 268 ? 200 : 300))))
            if (sumstat[xAxisValues.indexOf(value)].value.color == "#b42525") {
                d3.select("#verticalLines"+ value)
                    .transition()
                    .duration(transitionDuration * (sumstat[xAxisValues.indexOf(value)].value.max - sumstat[xAxisValues.indexOf(value)].value.q3)/(sumstat[xAxisValues.indexOf(value)].value.max - sumstat[xAxisValues.indexOf(value)].value.min))
                    .attr("y1", y(sumstat[xAxisValues.indexOf(value)].value.q3))
                    .ease(d3.easeLinear)
                    .delay(transitionDurationGesamt)
                    .transition()
                    .duration(transitionDuration * (sumstat[xAxisValues.indexOf(value)].value.q3 - sumstat[xAxisValues.indexOf(value)].value.q1)/(sumstat[xAxisValues.indexOf(value)].value.max - sumstat[xAxisValues.indexOf(value)].value.min))
                    .attr("y1", y(sumstat[xAxisValues.indexOf(value)].value.q1))
                    .ease(d3.easeLinear)
                    .transition()
                    .duration(transitionDuration * (sumstat[xAxisValues.indexOf(value)].value.q1 - sumstat[xAxisValues.indexOf(value)].value.min)/(sumstat[xAxisValues.indexOf(value)].value.max - sumstat[xAxisValues.indexOf(value)].value.min))
                    .attr("y1", y(sumstat[xAxisValues.indexOf(value)].value.min))
                    .ease(d3.easeLinear)

                d3.select("#boxes"+value)
                    .transition()
                    .duration(transitionDuration * (sumstat[xAxisValues.indexOf(value)].value.q3 - sumstat[xAxisValues.indexOf(value)].value.q1)/(sumstat[xAxisValues.indexOf(value)].value.max - sumstat[xAxisValues.indexOf(value)].value.min))
                    .attr("height", y(sumstat[xAxisValues.indexOf(value)].value.q1)-y(sumstat[xAxisValues.indexOf(value)].value.q3))
                    .ease(d3.easeLinear)
                    .delay((transitionDuration * (sumstat[xAxisValues.indexOf(value)].value.max - sumstat[xAxisValues.indexOf(value)].value.q3)/(sumstat[xAxisValues.indexOf(value)].value.max - sumstat[xAxisValues.indexOf(value)].value.min)) + (transitionDurationGesamt))
            } else {
                d3.select("#verticalLines"+ value)
                    .attr("y1", y(sumstat[xAxisValues.indexOf(value)].value.min))
                    .attr("y2", y(sumstat[xAxisValues.indexOf(value)].value.min))
                d3.select("#verticalLines"+ value)
                    .transition()
                    .duration(transitionDuration * (sumstat[xAxisValues.indexOf(value)].value.q1 - sumstat[xAxisValues.indexOf(value)].value.min)/(sumstat[xAxisValues.indexOf(value)].value.max - sumstat[xAxisValues.indexOf(value)].value.min))
                    .attr("y2", y(sumstat[xAxisValues.indexOf(value)].value.q1))
                    .ease(d3.easeLinear)
                    .delay(transitionDurationGesamt)
                    .transition()
                    .duration(transitionDuration * (sumstat[xAxisValues.indexOf(value)].value.q3 - sumstat[xAxisValues.indexOf(value)].value.q1)/(sumstat[xAxisValues.indexOf(value)].value.max - sumstat[xAxisValues.indexOf(value)].value.min))
                    .attr("y2", y(sumstat[xAxisValues.indexOf(value)].value.q3))
                    .ease(d3.easeLinear)
                    .transition()
                    .duration(transitionDuration * (sumstat[xAxisValues.indexOf(value)].value.max - sumstat[xAxisValues.indexOf(value)].value.q3)/(sumstat[xAxisValues.indexOf(value)].value.max - sumstat[xAxisValues.indexOf(value)].value.min))
                    .attr("y2", y(sumstat[xAxisValues.indexOf(value)].value.max))
                    .ease(d3.easeLinear)
                
                d3.select("#boxes"+value)
                    .attr("y", y(sumstat[xAxisValues.indexOf(value)].value.q1))
                d3.select("#boxes"+value)
                    .transition()
                    .duration(transitionDuration * (sumstat[xAxisValues.indexOf(value)].value.q3 - sumstat[xAxisValues.indexOf(value)].value.q1)/(sumstat[xAxisValues.indexOf(value)].value.max - sumstat[xAxisValues.indexOf(value)].value.min))
                    .attr("y", y(sumstat[xAxisValues.indexOf(value)].value.q3))
                    .attr("height", y(sumstat[xAxisValues.indexOf(value)].value.q1)-y(sumstat[xAxisValues.indexOf(value)].value.q3))
                    .ease(d3.easeLinear)
                    .delay((transitionDuration * (sumstat[xAxisValues.indexOf(value)].value.q1 - sumstat[xAxisValues.indexOf(value)].value.min)/(sumstat[xAxisValues.indexOf(value)].value.max - sumstat[xAxisValues.indexOf(value)].value.min)) + (transitionDurationGesamt))
            }

            // ==================== BARCHART =========================
            d3.select("#bars"+value)
                .attr("y", y_barchart(0))
            d3.select("#bars"+value)
                .transition()
                .duration(transitionDuration * (sumstat[xAxisValues.indexOf(value)].value.q3 - sumstat[xAxisValues.indexOf(value)].value.q1)/(sumstat[xAxisValues.indexOf(value)].value.max - sumstat[xAxisValues.indexOf(value)].value.min))
                .attr("y", y_barchart(sumstat[xAxisValues.indexOf(value)].value.volume/1000000))
                .attr("height", height_barchart - y_barchart(sumstat[xAxisValues.indexOf(value)].value.volume/1000000))
                .ease(d3.easeLinear)
                .delay((transitionDuration * (sumstat[xAxisValues.indexOf(value)].value.q1 - sumstat[xAxisValues.indexOf(value)].value.min)/(sumstat[xAxisValues.indexOf(value)].value.max - sumstat[xAxisValues.indexOf(value)].value.min)) + (transitionDurationGesamt))
            transitionDurationGesamt += transitionDuration
        })


        // ============================ BEI VERÄNDERUND DES SLIDERS ===================================
        var sliderLeftValue = 2000;
        var sliderRightValue = 2024;
        var lineStrokeWidth = 1;

        d3.select("#input-left").on("change", function(d){
            selectedValue = this.value == 0 ? "2000" : (this.value == 1 ? "2001" : (this.value == 2 ? "2002" : (this.value == 3 ? "2003" : (this.value == 4 ? "2004" : (this.value == 5 ? "2005" : (this.value == 6 ? "2006" : (this.value == 7 ? "2007" : (this.value == 8 ? "2008" : (this.value == 9 ? "2009" : (this.value == 10 ? "2010" : (this.value == 11 ? "2011" : (this.value == 12 ? "2012" : (this.value == 13 ? "2013" : (this.value == 14 ? "2014" : (this.value == 15 ? "2015" : (this.value == 16 ? "2016" : (this.value == 17 ? "2017" : (this.value == 18 ? "2018" : (this.value == 19 ? "2019" : (this.value == 20 ? "2020" : (this.value == 21 ? "2021" : (this.value == 22 ? "2022" : (this.value == 23 ? "2023" : "2024")))))))))))))))))))))))
            sliderLeftValue = parseInt(selectedValue)

            d3.select("#sliderDisplayLeftValue")
                .text(selectedValue)

            // ===================== CANDLECHART =======================
            xAxisValuesCurrent = xAxisValues.filter(date => parseInt(date.slice(0,5)) >= parseInt(selectedValue))
            xAxisValuesCurrent = xAxisValuesCurrent.filter(date => parseInt(date.slice(0,5)) < sliderRightValue)
            xAxisTickValuesCurrent = xAxisTickValues.filter(date => parseInt(date.slice(0,5)) >= parseInt(selectedValue))
            xAxisTickValuesCurrent = xAxisTickValuesCurrent.filter(date => parseInt(date.slice(0,5)) < sliderRightValue)
            newX = d3.scaleBand()
                .range([ 0, width ])
                .domain(xAxisValuesCurrent)
                .paddingInner(1)
                .paddingOuter(1)
            newXAxis = d3.axisBottom(newX)
                .tickValues(xAxisTickValuesCurrent)
                .tickFormat(function(d) { return d.substring(0, 4); })
                .tickSizeOuter(0)

            // update x Achse (CANDLECHART)
            xAxis.call(newXAxis)

            var areaMinValue = 190.0;
            var areaMaxValue = 0.0;

            var sliderAbstand = sliderRightValue - sliderLeftValue;
            boxWidth = sliderAbstand > 13 ? 2.5 : (sliderAbstand > 10 ? 3.5 : (sliderAbstand > 7 ? 5 : (sliderAbstand > 5 ? 8 : (sliderAbstand > 3 ? 11 : (sliderAbstand > 2 ? 17 : (sliderAbstand > 1 ? 28 : 60))))))
            boxRX = sliderAbstand > 13 ? 1.25 : (sliderAbstand > 10 ? 1.75 : (sliderAbstand > 7 ? 2.5 : (sliderAbstand > 5 ? 4 : (sliderAbstand > 3 ? 5.5 : (sliderAbstand > 2 ? 8.5 : (sliderAbstand > 1 ? 14 : 30))))))

            lineStrokeWidth = sliderAbstand > 15 ? 1 : (sliderAbstand > 10 ? 1.25 : (sliderAbstand > 7 ? 1.5 : (sliderAbstand > 5 ? 1.75 : (sliderAbstand > 3 ? 2 : (sliderAbstand > 2 ? 2.25 : (sliderAbstand > 1 ? 2.75 : 3.5))))))
            
            // update Position der Boxen beim Candlechart
            xAxisValues.forEach(value => {
                if (xAxisValuesCurrent.includes(value)) {
                    d3.select("#boxes"+value)
                        .attr("x", newX(value)-boxWidth/2+0.5)
                        .attr("width", boxWidth)
                        .attr("rx", boxRX)
                        .style("visibility", "visible")
                    d3.select("#verticalLines"+value)
                        .attr("x1",  newX(value)+0.5)
                        .attr("x2",  newX(value)+0.5)
                        .attr("stroke-width", lineStrokeWidth)
                        .style("visibility", "visible")
                    if (sumstat[xAxisValues.indexOf(value)].value.max > areaMaxValue) { areaMaxValue = sumstat[xAxisValues.indexOf(value)].value.max}
                    if (sumstat[xAxisValues.indexOf(value)].value.min < areaMinValue) { areaMinValue = sumstat[xAxisValues.indexOf(value)].value.min}
                } else {
                    d3.select("#boxes"+value).style("visibility", "hidden")
                    d3.select("#verticalLines"+value).style("visibility", "hidden")
                }
            })
            
            var areaMinValueTooltip = areaMinValue
            var areaMaxValueTooltip = areaMaxValue
            areaMinValue = areaMinValue-1 < 0 ? 0.0 : areaMinValue-1
            areaMaxValue = areaMaxValue + 1 

            // update y Achse (Candlechart)
            var newY = d3.scaleLinear()
                .domain([areaMinValue,areaMaxValue])
                .range([height, 0])
            y = newY
            yaxis = d3.axisLeft(newY)
                .tickSizeOuter(0)
            yAxis.call(yaxis)

            yAxisTicks.forEach(tick => {
                tickID = tick.toString().includes(".") ? tick.toString().replace(".", "") : tick
                d3.select("#line"+tickID).remove()
            })
            yAxisTicks = yaxis.scale().ticks()
            yAxisTicks.forEach(tick => {
                tickID = tick.toString().includes(".") ? tick.toString().replace(".", "") : tick
                greyLines
                    .append("line")
                    .attr("id", "line"+tickID)
                    .attr("x1", 0)
                    .attr("x2", width)
                    .attr("y1", newY(tick)+0.5)
                    .attr("y2", newY(tick)+0.5)
                    .attr("stroke", "#a9b0b8")
                    .style("opacity", 0.1)
            })

            xAxisValuesCurrent.forEach(value => {
                d3.select("#boxes"+value)
                    .attr("y", newY(sumstat[xAxisValues.indexOf(value)].value.q3))
                    .attr("height", newY(sumstat[xAxisValues.indexOf(value)].value.q1) - newY(sumstat[xAxisValues.indexOf(value)].value.q3))
                d3.select("#verticalLines"+value)
                    .attr("y1",  newY(sumstat[xAxisValues.indexOf(value)].value.min))
                    .attr("y2",  newY(sumstat[xAxisValues.indexOf(value)].value.max))
            })

            // ===================== BARCHART ====================
            newX_barchart = d3.scaleBand()
                .range([ 0, width_barchart ])
                .domain(xAxisValuesCurrent)
                .paddingInner(1)
                .paddingOuter(1)
            x_barchart = newX_barchart
            newXAxis_barchart = d3.axisBottom(newX_barchart)
                .tickValues(xAxisTickValuesCurrent)
                .tickFormat(function(d) { return d.substring(0, 4); })
                .tickSizeOuter(0)

            // update x Achse (BARCHART)
            xAxis_barchart.call(newXAxis_barchart)

            var areaMaxValue_barchart = 0;

            var sliderAbstand = sliderRightValue - sliderLeftValue;
            boxWidth = sliderAbstand > 13 ? 2.5 : (sliderAbstand > 10 ? 3.5 : (sliderAbstand > 7 ? 5 : (sliderAbstand > 5 ? 8 : (sliderAbstand > 3 ? 11 : (sliderAbstand > 2 ? 17 : (sliderAbstand > 1 ? 28 : 60))))))
            boxRX = sliderAbstand > 13 ? 1.25 : (sliderAbstand > 10 ? 1.75 : (sliderAbstand > 7 ? 2.5 : (sliderAbstand > 5 ? 4 : (sliderAbstand > 3 ? 5.5 : (sliderAbstand > 2 ? 8.5 : (sliderAbstand > 1 ? 14 : 30))))))
            
            // update die Position der Rechtecke (BARCHART)
            xAxisValues.forEach(value => {
                if (xAxisValuesCurrent.includes(value)) {
                    d3.select("#bars"+value)
                        .attr("x", newX_barchart(value)-boxWidth/2+0.5)
                        .attr("width", boxWidth)
                        .attr("rx", boxRX)
                        .style("visibility", "visible")
                    if (sumstat[xAxisValues.indexOf(value)].value.volume/1000000 > areaMaxValue_barchart) { areaMaxValue_barchart = sumstat[xAxisValues.indexOf(value)].value.volume/1000000}
                } else {
                    d3.select("#bars"+value).style("visibility", "hidden")
                }
            })
            areaMaxValue_barchart = areaMaxValue_barchart + (areaMaxValue_barchart*0.05)
            // update y Achse (BARCHART)
            var newY_barchart = d3.scaleLinear()
                .domain([0,areaMaxValue_barchart])
                .range([height_barchart, 0])

            yaxis_barchart = d3.axisLeft(newY_barchart)
                .tickSizeOuter(0)
            yAxis_barchart.call(yaxis_barchart)

            yAxisTicks_barchart.forEach(tick => {
                tickID = tick.toString().includes(".") ? tick.toString().replace(".", "") : tick
                tickID = tickID.toString().includes(",") ? tickID.toString().replace(",", "") : tickID
                d3.select("#line_barchart"+tickID).remove()
            })
            yAxisTicks_barchart = yaxis_barchart.scale().ticks()
            yAxisTicks_barchart.forEach(tick => {
                tickID = tick.toString().includes(".") ? tick.toString().replace(".", "") : tick
                tickID = tickID.toString().includes(",") ? tickID.toString().replace(",", "") : tickID
                greyLines_barchart
                    .append("line")
                    .attr("id", "line_barchart"+tickID)
                    .attr("x1", 0)
                    .attr("x2", width_barchart)
                    .attr("y1", newY_barchart(tick)+0.5)
                    .attr("y2", newY_barchart(tick)+0.5)
                    .attr("stroke", "#a9b0b8")
                    .style("opacity", 0.1)
            })

            xAxisValuesCurrent.forEach(value => {
                d3.select("#bars"+value)
                    .attr("y", newY_barchart(sumstat[xAxisValues.indexOf(value)].value.volume/1000000))
                    .attr("height", height_barchart - newY_barchart(sumstat[xAxisValues.indexOf(value)].value.volume/1000000))
            })
            d3.selectAll(".axis line").style("stroke", "#a9b0b8")
            d3.selectAll(".axis path").style("stroke", "#a9b0b8")
            d3.selectAll(".axis text").style("stroke", "#a9b0b8")

            // ========================= GAUGE ==============================
            percentage = (((sumstat[xAxisValues.indexOf(xAxisValuesCurrent[xAxisValuesCurrent.length-1])].value.color=="#b42525" ? sumstat[xAxisValues.indexOf(xAxisValuesCurrent[xAxisValuesCurrent.length-1])].value.q1 : sumstat[xAxisValues.indexOf(xAxisValuesCurrent[xAxisValuesCurrent.length-1])].value.q3) - (sumstat[xAxisValues.indexOf(xAxisValuesCurrent[0])].value.color=="#b42525" ? sumstat[xAxisValues.indexOf(xAxisValuesCurrent[0])].value.q3 : sumstat[xAxisValues.indexOf(xAxisValuesCurrent[0])].value.q1)) / (sumstat[xAxisValues.indexOf(xAxisValuesCurrent[0])].value.color=="#b42525" ? sumstat[xAxisValues.indexOf(xAxisValuesCurrent[0])].value.q3 : sumstat[xAxisValues.indexOf(xAxisValuesCurrent[0])].value.q1)) / sliderAbstand
            percentageAbs = Math.abs(percentage)
            if (percentageAbs > 0.2) {percentageAbs = 0.2}
            if (percentage > 0) {
                endWert = Math.abs(((percentageAbs/0.2)*0.5)-0.5)
            } else {
                endWert = Math.abs(((percentageAbs/0.2)*0.5)+0.5)
            }
            geschwindigkeitAnfang = 0.2
            drawNeedleAnimation(startWert, endWert, geschwindigkeitAnfang)
            startWert = endWert

            // =========== TOOLTIP =============
            volumeSum = 0
            xAxisValuesCurrent.forEach(value => {
                volumeSum += sumstat[xAxisValues.indexOf(value)].value.volume/1000000000
            })
            stockPeriod = sliderLeftValue + " - " + sliderRightValue
            stockHighest = ((Math.round(areaMaxValueTooltip*100))/100).toFixed(2)+"$"
            stockLowest = ((Math.round(areaMinValueTooltip*100))/100).toFixed(2)+"$"
            stockOpen = ((Math.round((sumstat[xAxisValues.indexOf(xAxisValuesCurrent[0])].value.color=="#b42525" ? sumstat[xAxisValues.indexOf(xAxisValuesCurrent[0])].value.q3 : sumstat[xAxisValues.indexOf(xAxisValuesCurrent[0])].value.q1)*100))/100).toFixed(2)+"$"
            stockClose = ((Math.round((sumstat[xAxisValues.indexOf(xAxisValuesCurrent[xAxisValuesCurrent.length-1])].value.color=="#b42525" ? sumstat[xAxisValues.indexOf(xAxisValuesCurrent[xAxisValuesCurrent.length-1])].value.q1 : sumstat[xAxisValues.indexOf(xAxisValuesCurrent[xAxisValuesCurrent.length-1])].value.q3)*100))/100).toFixed(2)+"$"
            stockVolume = Math.round(volumeSum*100)/100+" bn."
            d3.select("#stockPeriod")
                .text(stockPeriod)
            d3.select("#stockHighest")
                .text(stockHighest)
            d3.select("#stockLowest")
                .text(stockLowest)
            d3.select("#stockOpen")
                .text(stockOpen)
            d3.select("#stockClose")
                .text(stockClose)
            d3.select("#stockVolume")
                .text(stockVolume)
        })

        d3.select("#input-right").on("change", function(d, i){
            selectedValue = this.value == 0 ? "2000" : (this.value == 1 ? "2001" : (this.value == 2 ? "2002" : (this.value == 3 ? "2003" : (this.value == 4 ? "2004" : (this.value == 5 ? "2005" : (this.value == 6 ? "2006" : (this.value == 7 ? "2007" : (this.value == 8 ? "2008" : (this.value == 9 ? "2009" : (this.value == 10 ? "2010" : (this.value == 11 ? "2011" : (this.value == 12 ? "2012" : (this.value == 13 ? "2013" : (this.value == 14 ? "2014" : (this.value == 15 ? "2015" : (this.value == 16 ? "2016" : (this.value == 17 ? "2017" : (this.value == 18 ? "2018" : (this.value == 19 ? "2019" : (this.value == 20 ? "2020" : (this.value == 21 ? "2021" : (this.value == 22 ? "2022" : (this.value == 23 ? "2023" : "2024")))))))))))))))))))))))
            sliderRightValue = parseInt(selectedValue)

            d3.select("#sliderDisplayRightValue")
                .text(selectedValue)

            // =================== CANDELCHART ==================
            xAxisValuesCurrent = xAxisValues.filter(date => parseInt(date.slice(0,5)) < parseInt(selectedValue))
            xAxisValuesCurrent = xAxisValuesCurrent.filter(date => parseInt(date.slice(0,5)) >= sliderLeftValue)
            xAxisTickValuesCurrent = xAxisTickValues.filter(date => parseInt(date.slice(0,5)) < parseInt(selectedValue))
            xAxisTickValuesCurrent = xAxisTickValuesCurrent.filter(date => parseInt(date.slice(0,5)) >= sliderLeftValue)
            newX = d3.scaleBand()
                .range([ 0, width ])
                .domain(xAxisValuesCurrent)
                .paddingInner(1)
                .paddingOuter(1)
            newXAxis = d3.axisBottom(newX)
                .tickValues(xAxisTickValuesCurrent)
                .tickFormat(function(d) { return d.substring(0, 4); })
                .tickSizeOuter(0)

            // update x Achse (CANDELCHART)
            xAxis.call(newXAxis)

            var areaMinValue = 190.0;
            var areaMaxValue = 0.0;

            var sliderAbstand = sliderRightValue - sliderLeftValue;
            boxWidth = sliderAbstand > 15 ? 2.5 : (sliderAbstand > 10 ? 3.5 : (sliderAbstand > 7 ? 5 : (sliderAbstand > 5 ? 8 : (sliderAbstand > 3 ? 11 : (sliderAbstand > 2 ? 17 : (sliderAbstand > 1 ? 28 : 60))))))
            boxRX = sliderAbstand > 15 ? 1.25 : (sliderAbstand > 10 ? 1.75 : (sliderAbstand > 7 ? 2.5 : (sliderAbstand > 5 ? 4 : (sliderAbstand > 3 ? 5.5 : (sliderAbstand > 2 ? 8.5 : (sliderAbstand > 1 ? 14 : 30))))))
            lineStrokeWidth = sliderAbstand > 15 ? 1 : (sliderAbstand > 10 ? 1.25 : (sliderAbstand > 7 ? 1.5 : (sliderAbstand > 5 ? 1.75 : (sliderAbstand > 3 ? 2 : (sliderAbstand > 2 ? 2.25 : (sliderAbstand > 1 ? 2.75 : 3.5))))))
            
            // update Position der Boxen beim Candlechart
            xAxisValues.forEach(value => {
                if (xAxisValuesCurrent.includes(value)) {
                    d3.select("#boxes"+value)
                        .attr("x", newX(value)-boxWidth/2+0.5)
                        .attr("width", boxWidth)
                        .attr("rx", boxRX)
                        .style("visibility", "visible")
                    d3.select("#verticalLines"+value)
                        .attr("x1",  newX(value)+0.5)
                        .attr("x2",  newX(value)+0.5)
                        .attr("stroke-width", lineStrokeWidth)
                        .style("visibility", "visible")
                    if (sumstat[xAxisValues.indexOf(value)].value.max > areaMaxValue) { areaMaxValue = sumstat[xAxisValues.indexOf(value)].value.max}
                    if (sumstat[xAxisValues.indexOf(value)].value.min < areaMinValue) { areaMinValue = sumstat[xAxisValues.indexOf(value)].value.min}
                } else {
                    d3.select("#boxes"+value).style("visibility", "hidden")
                    d3.select("#verticalLines"+value).style("visibility", "hidden")
                }
            })

            areaMinValueTooltip = areaMinValue
            areaMaxValueTooltip = areaMaxValue
            areaMinValue = areaMinValue-1 < 0 ? 0.0 : areaMinValue-1
            areaMaxValue = areaMaxValue + 1 
            // update y Achse (Candlechart)
            var newY = d3.scaleLinear()
                .domain([areaMinValue,areaMaxValue])
                .range([height, 0])
            y = newY
            yaxis = d3.axisLeft(newY)
                .tickSizeOuter(0)
            yAxis.call(yaxis)

            yAxisTicks.forEach(tick => {
                tickID = tick.toString().includes(".") ? tick.toString().replace(".", "") : tick
                d3.select("#line"+tickID).remove()
            })

            yAxisTicks = yaxis.scale().ticks()

            yAxisTicks.forEach(tick => {
                tickID = tick.toString().includes(".") ? tick.toString().replace(".", "") : tick
                greyLines
                    .append("line")
                    .attr("id", "line"+tickID)
                    .attr("x1", 0)
                    .attr("x2", width)
                    .attr("y1", newY(tick)+0.5)
                    .attr("y2", newY(tick)+0.5)
                    .attr("stroke", "#a9b0b8")
                    .style("opacity", 0.1)
            })

            xAxisValuesCurrent.forEach(value => {
                d3.select("#boxes"+value)
                    .attr("y", newY(sumstat[xAxisValues.indexOf(value)].value.q3))
                    .attr("height", newY(sumstat[xAxisValues.indexOf(value)].value.q1) - newY(sumstat[xAxisValues.indexOf(value)].value.q3))
                d3.select("#verticalLines"+value)
                    .attr("y1",  newY(sumstat[xAxisValues.indexOf(value)].value.min))
                    .attr("y2",  newY(sumstat[xAxisValues.indexOf(value)].value.max))
            })
            
            // =========================== BARCHART =================================
            newX_barchart = d3.scaleBand()
                .range([ 0, width_barchart ])
                .domain(xAxisValuesCurrent)
                .paddingInner(1)
                .paddingOuter(1)
            x_barchart = newX_barchart
            newXAxis_barchart = d3.axisBottom(newX_barchart)
                .tickValues(xAxisTickValuesCurrent)
                .tickFormat(function(d) { return d.substring(0, 4); })
                .tickSizeOuter(0)

            // update x Achse (BARCHART)
            xAxis_barchart.call(newXAxis_barchart)

            var areaMaxValue_barchart = 0;

            var sliderAbstand = sliderRightValue - sliderLeftValue;
            boxWidth = sliderAbstand > 13 ? 2.5 : (sliderAbstand > 10 ? 3.5 : (sliderAbstand > 7 ? 5 : (sliderAbstand > 5 ? 8 : (sliderAbstand > 3 ? 11 : (sliderAbstand > 2 ? 17 : (sliderAbstand > 1 ? 28 : 60))))))
            boxRX = sliderAbstand > 13 ? 1.25 : (sliderAbstand > 10 ? 1.75 : (sliderAbstand > 7 ? 2.5 : (sliderAbstand > 5 ? 4 : (sliderAbstand > 3 ? 5.5 : (sliderAbstand > 2 ? 8.5 : (sliderAbstand > 1 ? 14 : 30))))))
            
            // update Position der Rechtecke (BARCHART)
            xAxisValues.forEach(value => {
                if (xAxisValuesCurrent.includes(value)) {
                    d3.select("#bars"+value)
                        .attr("x", newX_barchart(value)-boxWidth/2+0.5)
                        .attr("width", boxWidth)
                        .attr("rx", boxRX)
                        .style("visibility", "visible")
                    if (sumstat[xAxisValues.indexOf(value)].value.volume/1000000 > areaMaxValue_barchart) { areaMaxValue_barchart = sumstat[xAxisValues.indexOf(value)].value.volume/1000000}
                } else {
                    d3.select("#bars"+value).style("visibility", "hidden")
                }
            })
            areaMaxValue_barchart = areaMaxValue_barchart + (areaMaxValue_barchart*0.05)
            // update y Achse (BARCHART)
            var newY_barchart = d3.scaleLinear()
                .domain([0,areaMaxValue_barchart])
                .range([height_barchart, 0])

            yaxis_barchart = d3.axisLeft(newY_barchart)
                .tickSizeOuter(0)
            yAxis_barchart.call(yaxis_barchart)

            yAxisTicks_barchart.forEach(tick => {
                tickID = tick.toString().includes(".") ? tick.toString().replace(".", "") : tick
                tickID = tickID.toString().includes(",") ? tickID.toString().replace(",", "") : tickID
                d3.select("#line_barchart"+tickID).remove()
            })
            yAxisTicks_barchart = yaxis_barchart.scale().ticks()
            yAxisTicks_barchart.forEach(tick => {
                tickID = tick.toString().includes(".") ? tick.toString().replace(".", "") : tick
                tickID = tickID.toString().includes(",") ? tickID.toString().replace(",", "") : tickID
                greyLines_barchart
                    .append("line")
                    .attr("id", "line_barchart"+tickID)
                    .attr("x1", 0)
                    .attr("x2", width_barchart)
                    .attr("y1", newY_barchart(tick)+0.5)
                    .attr("y2", newY_barchart(tick)+0.5)
                    .attr("stroke", "#a9b0b8")
                    .style("opacity", 0.1)
            })

            xAxisValuesCurrent.forEach(value => {
                d3.select("#bars"+value)
                    .attr("y", newY_barchart(sumstat[xAxisValues.indexOf(value)].value.volume/1000000))
                    .attr("height", height_barchart - newY_barchart(sumstat[xAxisValues.indexOf(value)].value.volume/1000000))
            })
            d3.selectAll(".axis line").style("stroke", "#a9b0b8")
            d3.selectAll(".axis path").style("stroke", "#a9b0b8")
            d3.selectAll(".axis text").style("stroke", "#a9b0b8")

            // ======================= GAUGE ==============================
            percentage = (((sumstat[xAxisValues.indexOf(xAxisValuesCurrent[xAxisValuesCurrent.length-1])].value.color=="#b42525" ? sumstat[xAxisValues.indexOf(xAxisValuesCurrent[xAxisValuesCurrent.length-1])].value.q1 : sumstat[xAxisValues.indexOf(xAxisValuesCurrent[xAxisValuesCurrent.length-1])].value.q3) - (sumstat[xAxisValues.indexOf(xAxisValuesCurrent[0])].value.color=="#b42525" ? sumstat[xAxisValues.indexOf(xAxisValuesCurrent[0])].value.q3 : sumstat[xAxisValues.indexOf(xAxisValuesCurrent[0])].value.q1)) / (sumstat[xAxisValues.indexOf(xAxisValuesCurrent[0])].value.color=="#b42525" ? sumstat[xAxisValues.indexOf(xAxisValuesCurrent[0])].value.q3 : sumstat[xAxisValues.indexOf(xAxisValuesCurrent[0])].value.q1)) / sliderAbstand
            percentageAbs = Math.abs(percentage)
            if (percentageAbs > 0.2) {percentageAbs = 0.2}
            if (percentage > 0) {
                endWert = Math.abs(((percentageAbs/0.2)*0.5)-0.5)
            } else {
                endWert = Math.abs(((percentageAbs/0.2)*0.5)+0.5)
            }
            geschwindigkeitAnfang = 0.2
            drawNeedleAnimation(startWert, endWert, geschwindigkeitAnfang)
            startWert = endWert

            // ===================== TOOLTIP ===================
            volumeSum = 0
            xAxisValuesCurrent.forEach(value => {
                volumeSum += sumstat[xAxisValues.indexOf(value)].value.volume/1000000000
            })
            stockPeriod = sliderLeftValue + " - " + sliderRightValue
            stockHighest = ((Math.round(areaMaxValueTooltip*100))/100).toFixed(2)+"$"
            stockLowest = ((Math.round(areaMinValueTooltip*100))/100).toFixed(2)+"$"
            stockOpen = ((Math.round((sumstat[xAxisValues.indexOf(xAxisValuesCurrent[0])].value.color=="#b42525" ? sumstat[xAxisValues.indexOf(xAxisValuesCurrent[0])].value.q3 : sumstat[xAxisValues.indexOf(xAxisValuesCurrent[0])].value.q1)*100))/100).toFixed(2)+"$"
            stockClose = ((Math.round((sumstat[xAxisValues.indexOf(xAxisValuesCurrent[xAxisValuesCurrent.length-1])].value.color=="#b42525" ? sumstat[xAxisValues.indexOf(xAxisValuesCurrent[xAxisValuesCurrent.length-1])].value.q1 : sumstat[xAxisValues.indexOf(xAxisValuesCurrent[xAxisValuesCurrent.length-1])].value.q3)*100))/100).toFixed(2)+"$"
            stockVolume = Math.round(volumeSum*100)/100+" bn."
            d3.select("#stockPeriod")
                .text(stockPeriod)
            d3.select("#stockHighest")
                .text(stockHighest)
            d3.select("#stockLowest")
                .text(stockLowest)
            d3.select("#stockOpen")
                .text(stockOpen)
            d3.select("#stockClose")
                .text(stockClose)
            d3.select("#stockVolume")
                .text(stockVolume)
        })

        // ================= INFO-BUTTON =======================
        svg.append("g")
            .append("circle")
            .attr("id", "info_button_candlechart")
            .attr("cx", width-15)
            .attr("cy", 15)
            .attr('r', 10)
            .attr('fill', '#a9b0b8')
            .style("opacity", 0.4)
            .on('mouseover', function (d, i) {
                d3.select("#info_button_candlechart")
                    .attr("fill", "#e7880d")
                    .style("opacity", 1)
                d3.select("#tooltip")
                    .style("display", "none")
                d3.select("#candlechart_explanation")
                    .style("display", "block")
            })
            .on('mouseleave', function (d, i) {
                d3.select("#info_button_candlechart")
                    .attr("fill", "#a9b0b8")
                    .style("opacity", 0.4)
                d3.select("#tooltip")
                    .style("display", "block")
                d3.select("#candlechart_explanation")
                    .style("display", "none")
            })
        
        svg.append("g")
            .append("text")
            .text("i")
            .attr("x", width-17.5)
            .attr("y", 20.5)
            .style("font-size", "1em")
            .style("font-weight", "bold")
            .attr('fill', '#33383e')
            .on('mouseover', function (d, i) {
                d3.select("#info_button_candlechart")
                    .attr("fill", "#e7880d")
                    .style("opacity", 1)
                d3.select("#tooltip")
                    .style("display", "none")
                d3.select("#candlechart_explanation")
                    .style("display", "block")
            })
            .on('mouseleave', function (d, i) {
                d3.select("#info_button_candlechart")
                    .attr("fill", "#a9b0b8")
                    .style("opacity", 0.4)
                d3.select("#tooltip")
                    .style("display", "block")
                d3.select("#candlechart_explanation")
                    .style("display", "none")
            })
        
        // Info-Button
        svg_barchart.append("g")
            .append("circle")
            .attr("id", "info_button_barchart")
            .attr("cx", width_barchart-15)
            .attr("cy", 15)
            .attr('r', 10)
            .attr('fill', '#a9b0b8')
            .style("opacity", 0.4)
            .on('mouseover', function (d, i) {
                d3.select("#info_button_barchart")
                    .attr("fill", "#e7880d")
                    .style("opacity", 1)
                d3.select("#tooltip")
                    .style("display", "none")
                d3.select("#barchart_explanation")
                    .style("display", "block")
            })
            .on('mouseleave', function (d, i) {
                d3.select("#info_button_barchart")
                    .attr("fill", "#a9b0b8")
                    .style("opacity", 0.4)
                d3.select("#tooltip")
                    .style("display", "block")
                d3.select("#barchart_explanation")
                    .style("display", "none")
            })
        
        svg_barchart.append("g")
            .append("text")
            .text("i")
            .attr("x", width_barchart-17.5)
            .attr("y", 20.5)
            .style("font-size", "1em")
            .style("font-weight", "bold")
            .attr('fill', '#33383e')
            .on('mouseover', function (d, i) {
                d3.select("#info_button_barchart")
                    .attr("fill", "#e7880d")
                    .style("opacity", 1)
                d3.select("#tooltip")
                    .style("display", "none")
                d3.select("#barchart_explanation")
                    .style("display", "block")
            })
            .on('mouseleave', function (d, i) {
                d3.select("#info_button_barchart")
                    .attr("fill", "#a9b0b8")
                    .style("opacity", 0.4)
                d3.select("#tooltip")
                    .style("display", "block")
                d3.select("#barchart_explanation")
                    .style("display", "none")
            })

        svg_gauge.append("g")
            .append("circle")
            .attr("id", "info_button_piechart")
            .attr("cx", width_gauge-16)
            .attr("cy", 16)
            .attr('r', 16)
            .attr('fill', '#a9b0b8')
            .style("opacity", 0.4)
            .on('mouseover', function (d, i) {
                d3.select("#info_button_piechart")
                    .attr("fill", "#e7880d")
                    .style("opacity", 1)
                d3.select("#tooltip")
                    .style("display", "none")
                d3.select("#gauge_explanation")
                    .style("display", "block")
            })
            .on('mouseleave', function (d, i) {
                d3.select("#info_button_piechart")
                    .attr("fill", "#a9b0b8")
                    .style("opacity", 0.4)
                d3.select("#tooltip")
                    .style("display", "block")
                d3.select("#gauge_explanation")
                    .style("display", "none")
            })
    
        svg_gauge.append("g")
            .append("text")
            .text("i")
            .attr("x", width_gauge-19.5)
            .attr("y", 24.5)
            .style("font-size", "1.6em")
            .style("font-weight", "bold")
            .attr('fill', '#33383e')
            .on('mouseover', function (d, i) {
                d3.select("#info_button_piechart")
                    .attr("fill", "#e7880d")
                    .style("opacity", 1)
                d3.select("#tooltip")
                    .style("display", "none")
                d3.select("#gauge_explanation")
                    .style("display", "block")
            })
            .on('mouseleave', function (d, i) {
                d3.select("#info_button_piechart")
                    .attr("fill", "#a9b0b8")
                    .style("opacity", 0.4)
                d3.select("#tooltip")
                    .style("display", "block")
                d3.select("#gauge_explanation")
                    .style("display", "none")
            })

    })}

});