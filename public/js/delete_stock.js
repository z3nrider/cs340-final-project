// Citation: https://github.com/osu-cs340-ecampus/nodejs-starter-app

function deleteStock(stockID) {
    let link = '/delete-stock-ajax/';
    let data = {
        id: stockID
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-stock-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Add the new data to the table
            deleteRow(stockID);
            window.location.reload(); // Reload the page
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}

function deleteRow(stockID) {
    let table = document.getElementById("stocks-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == stockID) {
            table.deleteRow(i);
            break;
        }
    }
}


function deleteDropDownMenu(stockID) {
    let selectMenu = document.getElementById("mySelect");
    for (let i = 0; i < selectMenu.length; i++) {
        if (Number(selectMenu.options[i].value) === Number(stockID)) {
            selectMenu[i].remove();
            break;
        }
    }
}