// Citation: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let addStockForm = document.getElementById('addStockAjax');

// Modify the objects we need
addStockForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputStockName = document.getElementById("stockName");
    let inputStockSymbol = document.getElementById("stockSymbol");
    let inputCurrentPrice = document.getElementById("currentPrice");
    let inputHighPrice = document.getElementById("highPrice");
    let inputLowPrice = document.getElementById("lowPrice");
    let inputSectorID = document.getElementById("sectorID");
    let inputIndexID = document.getElementById("indexID");

    // Get the values from the form fields
    let stockNameValue = inputStockName.value;
    let stockSymbolValue = inputStockSymbol.value;
    let currentPriceValue = inputCurrentPrice.value;
    let highPriceValue = inputHighPrice.value;
    let lowPriceValue = inputLowPrice.value;
    let sectorIDValue = inputSectorID.value;
    let indexIDValue = inputIndexID.value;

    // Put our data we want to send in a javascript object
    let data = {
        stockName: stockNameValue,
        stockSymbol: stockSymbolValue,
        currentPrice: currentPriceValue,
        highPrice: highPriceValue,
        lowPrice: lowPriceValue,
        sectorID: sectorIDValue,
        indexID: indexIDValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-stock-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputStockName.value = '';
            inputStockSymbol.value = '';
            inputCurrentPrice.value = '';
            inputHighPrice.value = '';
            inputLowPrice.value = '';
            inputSectorID.value = '';
            inputIndexID.value = '';

            window.location.reload(); // Reload the page
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// bsg_people
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("stocks-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 8 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let stockNameCell = document.createElement("TD");
    let stockSymbolCell = document.createElement("TD");
    let currentPriceCell = document.createElement("TD");
    let highPriceCell = document.createElement("TD");
    let lowPriceCell = document.createElement("TD");
    let sectorIDCell = document.createElement("TD");
    let indexIDCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.id;
    stockNameCell.innerText = newRow.stockName;
    stockSymbolCell.innerText = newRow.stockSymbol;
    currentPriceCell.innerText = newRow.currentPrice;
    highPriceCell.innerText = newRow.highPrice;
    lowPriceCell.innerText = newRow.lowPrice;
    sectorIDCell.innerText = newRow.sectorID;
    indexIDCell.innerText = newRow.indexID;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function () {
        deleteStock(newRow.id);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(stockNameCell);
    row.appendChild(stockSymbolCell);
    row.appendChild(currentPriceCell);
    row.appendChild(highPriceCell);
    row.appendChild(lowPriceCell);
    row.appendChild(sectorIDCell);
    row.appendChild(indexIDCell);
    row.appendChild(deleteCell);

    // Add a custom row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.id);

    // Add the row to the table
    currentTable.appendChild(row);

    // Start of new Step 8 code for adding new data to the dropdown menu for updating people

    // Find drop down menu, create a new option, fill data in the option (full name, id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("inputStockID");
    let option = document.createElement("option");
    option.text = newRow.stockID;
    option.value = newRow.id;
    selectMenu.add(option);
    // End of new step 8 code.
}