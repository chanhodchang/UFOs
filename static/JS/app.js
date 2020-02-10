// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// Keep track of all filters
var filters = {};

// This function will replace your handleClick function
function updateFilters() {

  // Save the element, value, and id of the filter that was changed
  let changedElement = d3.select(this);
  let changedValue = changedElement.property("value");
  let changedId = changedElement.attr("id");

  // If a filter value was entered then add that filterId and value
  if (changedValue) {
      filters[changedId] = changedValue;
  }
  // to the filters list. Otherwise, clear that filter from the filters object
  else{
      delete filters[changedId];
  };
  // Call function to apply all filters and rebuild the table
  filterTable();
}

function filterTable() {
  // Set the filteredData to the tableData
  let filteredTable = tableData;
  
  // Loop through all of the filters and keep any data that
  // matches the filter values
  Object.entries(filters).forEach(([key, value]) => {
      filteredTable = filteredTable.filter(row => row[key] === value);
  });

  
  // Finally, rebuild the table using the filtered Data
  buildTable(filteredTable);
}

// Attach an event to listen for changes to each filter
// Hint: You'll need to select the event and what it is listening for within each set of parenthesis
d3.selectAll("input").on("change", updateFilters);
d3.selectAll("#filter-btn").on("click", updateFilters);

// Build the table when the page loads
buildTable(tableData)