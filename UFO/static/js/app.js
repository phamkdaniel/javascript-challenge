var tableData = data;

var tbody =  d3.select("tbody");
var filterButton = d3.select("#filter-btn");

function handleChange() {
    var inputValue = d3.select(".form-control").property("value");

    var cityValue = d3.select("#state-select");
    console.log(cityValue.text);

    var filteredData = tableData.filter(obs => obs.datetime === inputValue);

    tbody.html("")
    filteredData.forEach(observation => {
        var row = tbody.append("tr");
    
        Object.entries(observation).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
        });
    });

};

tableData.forEach(observation => {
    var row = tbody.append("tr");

    Object.entries(observation).forEach(([key, value]) => {
        var cell = row.append("td");
        cell.text(value);
    });
});

filterButton.on("click", handleChange);
