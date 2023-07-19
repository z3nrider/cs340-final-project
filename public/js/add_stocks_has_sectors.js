// Citation: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let addStocksHasSectorsForm = document.getElementById('addStocksHasSectorsAjax');

// Modify the objects we need
addStocksHasSectorsForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputStockID = document.getElementById("inputStockID");
    let inputSectorID = document.getElementById("inputSectorID");


    // Get the values from the form fields
    let stockIDValue = inputStockID.value;
    let sectorIDValue = inputSectorID.value;

    // Put our data we want to send in a javascript object
    let data = {
        stockID: stockIDValue,
        sectorID: sectorIDValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-stocks-has-sectors-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputStockID.value = '';
            inputSectorID.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
    window.location.reload(); // Reload the page

})


// Creates a single row from an Object representing a single record from 
// bsg_people
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("stocks-has-sectors-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 8 cells
    let row = document.createElement("TR");
    let stockIDCell = document.createElement("TD");
    let sectorIDCell = document.createElement("TD");

    // Fill the cells with correct data
    stockIDCell.innerText = newRow.stockID;
    sectorIDCell.innerText = newRow.sectorID;

    // Add the cells to the row 
    row.appendChild(stockIDCell);
    row.appendChild(sectorIDCell);

    // Add a custom row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.id);

    // Add the row to the table
    currentTable.appendChild(row);

    // Start of new Step 8 code for adding new data to the dropdown menu for updating people

    // Find drop down menu, create a new option, fill data in the option (full name, id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    // let selectMenu = document.getElementById("inputAnalystID");
    // let option = document.createElement("option");
    // option.text = newRow.analystID;
    // option.value = newRow.id;
    // selectMenu.add(option);
    // End of new step 8 code.
}