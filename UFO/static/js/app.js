var tableData = data;

var filterButton = d3.select("#filter-btn");

var citySelect = d3.select("#city-select")
var stateSelect = d3.select("#state-select")
var countrySelect = d3.select("#country-select")
var shapeSelect = d3.select("#shape-select")

var cities = tableData.map(observation => observation.city);
var states = tableData.map(observation => observation.state);
var countries = tableData.map(observation => observation.country);
var shapes = tableData.map(observation => observation.shape);


function buildTable (dataArray) {
    var tbody =  d3.select("tbody");
    tbody.html("");

    dataArray.forEach(observation => {
        var row = tbody.append("tr");
    
        Object.entries(observation).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
        });
    });
};

// creates options in select tag
function createOptions (sel, array) {
    var uniqueArr = Array.from(new Set(array));
    uniqueArr.sort();
    uniqueArr.unshift("---");

    var options = sel.selectAll("option")
     .data(uniqueArr)
     .enter()
     .append("option");
   
    options.text(function(d) {
       return d.toUpperCase();
    })
     .attr("value", function(d) {
       return d;
    });
};

function handleChange() {
    var dateValue = d3.select(".form-control").property("value");

    var cityValue = d3.select("#city-select").property("value");
    var stateValue = d3.select("#state-select").property("value");
    var countryValue = d3.select("#country-select").property("value");
    var shapeValue = d3.select("#shape-select").property("value");

    var dateFilter, cityFilter, stateFilter, countryFilter, shapeFilter;

    // filter data by date
    if (dateValue === "") {
        dateFilter = tableData;
    } else {
        dateFilter = tableData.filter(obs => obs.datetime === dateValue);
    };

    // filter data by city
    if (cityValue === "---") {
        cityFilter = dateFilter;
    } else {
        cityFilter = dateFilter.filter(obs => obs.city === cityValue);
    };

    // filter data by state
    if (stateValue === "---") {
        stateFilter = cityFilter;
    } else {
        stateFilter = cityFilter.filter(obs => obs.state === stateValue);
    };

    // filter data by country
    if (countryValue === "---") {
        countryFilter = stateFilter;
    } else {
        countryFilter = stateFilter.filter(obs => obs.country === countryValue);
    };

    // filter data by shape
    if (shapeValue === "---") {
        shapeFilter = countryFilter;
    } else {
        shapeFilter = countryFilter.filter(obs => obs.shape === shapeValue);
    };

    // remove and rebuild table
    buildTable(shapeFilter);
};


buildTable(tableData);

createOptions(citySelect, cities);
createOptions(stateSelect, states);
createOptions(countrySelect, countries);
createOptions(shapeSelect, shapes);

filterButton.on("click", handleChange);
