// Citation: https://github.com/osu-cs340-ecampus/nodejs-starter-app


// Get the objects we need to modify
let updateStockForm = document.getElementById('update-stock-form-ajax');

// Modify the objects we need
updateStockForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputStockID = document.getElementById("inputStockID");
    let inputCurrentPrice = document.getElementById("input-currentPrice-update");
    let inputHighPrice = document.getElementById("input-highPrice-update");
    let inputLowPrice = document.getElementById("input-lowPrice-update");
    let inputMarketSector = document.getElementById("updateSectorID");

    // Get the values from the form fields
    let updateStockID = inputStockID.value;
    let newCurrentPrice = inputCurrentPrice.value;
    let newHighPrice = inputHighPrice.value
    let newLowPrice = inputLowPrice.value
    let newMarketSector = inputMarketSector.value

    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being bassed NULL for homeworld    

    if (isNaN(updateStockID)) {
        return;
    }

    // Put our data we want to send in a javascript object
    let data = {
        stockID: updateStockID,
        currentPrice: newCurrentPrice,
        highPrice: newHighPrice,
        lowPrice: newLowPrice,
        marketSector: newMarketSector
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-stock-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, stockName);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, stockID) {
    let parsedData = JSON.parse(data);

    let table = document.getElementById("stocks-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == stockID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of homeworld value
            let td = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign homeworld to our value we updated to
            td.innerHTML = parsedData[0].name;
        }
    }

    window.location.reload(); // Reload the page

}
