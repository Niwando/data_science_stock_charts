document.addEventListener('DOMContentLoaded', function(e) {

    // Treemap

    // Größe des Graphen
    var margin = {top: 0, right: 0, bottom: 32, left: 17},
    width = 1270 - margin.left - margin.right,
    height = 845 - margin.top - margin.bottom;

    // Erstellt ein SVG Element für die Treemap
    var svg = d3.select("#treemap")
    .append("svg")
        .attr("viewBox", "0 0 "+ (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom))
        .attr("preserveAspectRatio", "xMidYMid meet")
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    // Liest die Daten ein
    d3.json("https://gist.githubusercontent.com/Niwando/c921751f151a8afcbd393d83773eb106/raw/4777e2f81044bd74702732b57f6f5c7d55d17925/data_treemap", function(data) {

    // Übergabe der Daten an dieses Cluster-Layout
    var root = d3.hierarchy(data).sum(function(d){ return d.value})

    // d3.treemap berechnet jede Position und Größe jedes Elementes
    d3.treemap()
    .size([width, height])
    .paddingTop(28)
    .paddingRight(7)
    .paddingInner(3)
    (root)

    // Farbskala
    var color = d3.scaleOrdinal()
    .domain(["-3%", "-2%", "-1%", "0%", "1%", "2%", "3%"])
    .range([ "#7a1313", "#561010", "#300f0f", "#16100c", "#11300f","#145610","#187a13"])

    // Die Rechtecke werden hinzugefügt
    svg
    .selectAll("rectParents")
    .data(root.leaves())
    .enter()
    .append("rect")
        .attr('x', function (d) { return d.x0; })
        .attr('y', function (d) { return d.y0; })
        .attr('width', function (d) { return d.x1 - d.x0; })
        .attr('height', function (d) { return d.y1 - d.y0; })
        .style("stroke", "black")
        .style("fill", function(d){ return color(d.data.group)} )

    // Die Labels werden inzugefügt
    svg
    .selectAll("text")
    .data(root.leaves())
    .enter()
    .append("text")
        .attr("x", function(d){ return d.x0+2})   
        .attr("y", function(d){ return d.y0+9})   
        .text(function(d){ return d.data.name.replace('mister_','') })
        .attr("font-size", "10px")
        .attr("fill", "#a9b0b8")

    // Fügt jeder Gruppe einen Titel hinzu
    svg
    .selectAll("titles")
    .data(root.descendants().filter(function(d){return d.depth==1}))
    .enter()
    .append("text")
        .attr("x", function(d){ return d.x0})
        .attr("y", function(d){ return d.y0+21})
        .text(function(d){ return d.data.name })
        .attr("font-size", "19px")
        .attr("fill",  "#a9b0b8")
    })
})