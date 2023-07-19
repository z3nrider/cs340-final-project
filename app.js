// Citation: https://github.com/osu-cs340-ecampus/nodejs-starter-app


// App.js

/*
    SETUP
*/
const { Router } = require('express');
var express = require('express');   // We are using the express library for the web server
var app = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'));
PORT = 42086;                 // Set a port number at the top so it's easy to change in the future
// Database
var db = require('./Database/db-connector')
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
var helpers = require('handlebars-helpers')();    // Helper to format date
app.engine('.hbs', engine({ extname: ".hbs" }));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.
app.set('views', 'views')

/*
    ROUTES
*/

app.get('/', function (req, res) {
    res.render('home', {});
});

app.get('/stocks', function (req, res) {
    let query1 = "SELECT * FROM Stocks;";
    let query2 = "SELECT * FROM MarketSectors;";
    let query3 = "SELECT * FROM MarketIndexes;";


    db.pool.query(query1, function (error, rows, fields) {
        let stocks = rows;

        db.pool.query(query2, function (error, rows, fields) {
            let sectors = rows;

            db.pool.query(query3, function (error, rows, fields) {
                let indexes = rows;
                return res.render('stocks', { data: stocks, sectors: sectors, indexes: indexes });
            })
        })
    }) 
});

app.get('/subs', function (req, res) {
    // Declare Query 1
    let query1 = "SELECT * FROM Subscribers;";

    // Query 2 is the same in both cases
    let query2 = "SELECT * FROM Analysts;";

    // Run the 1st query
    db.pool.query(query1, function (error, rows, fields) {

        // Save the people
        let subscribers = rows;

        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {

            // Save the planets
            let analysts = rows;
            return res.render('subs', { data: subscribers, analysts: analysts });
        })
    })
});

app.get('/analysts', function (req, res) {
    let query1 = "SELECT * FROM Analysts;";
    db.pool.query(query1, function (error, rows, fields) {
        res.render('analysts', { data: rows });
    })
});

app.get('/stocks_has_sectors', function (req, res) {
    // Declare Query 1
    let query1 = "SELECT * FROM Stocks;";

    // Query 2 is the same in both cases
    let query2 = "SELECT * FROM MarketSectors;";

    let query3 = "SELECT * FROM Stocks_has_MarketSectors;";

    // Run the 1st query
    db.pool.query(query1, function (error, rows, fields) {

        // Save the people
        let stocks = rows;

        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {

            // Save the planets
            let sectors = rows;

            db.pool.query(query3, (error, rows, fields) => {
                return res.render('stocks_has_sectors', { data: rows, stocks: stocks, sectors: sectors });
            })
        })
    })
});

app.get('/stocks_has_analysts', function (req, res) {
    // res.render('stocks_has_analysts', {});
    // Declare Query 1
    let query1 = "SELECT * FROM Stocks;";

    // Query 2 is the same in both cases
    let query2 = "SELECT * FROM Analysts;";

    let query3 = "SELECT * FROM Stocks_has_Analysts;";

    // Run the 1st query
    db.pool.query(query1, function (error, rows, fields) {

        // Save the people
        let stocks = rows;

        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {

            // Save the planets
            let analysts = rows;

            db.pool.query(query3, (error, rows, fields) => {
                return res.render('stocks_has_analysts', { data: rows, stocks: stocks, analysts: analysts });
            })
        })
    })
});


app.get('/indexes', function (req, res) {
    // res.render('indexes', {});
    let query1 = "SELECT * FROM MarketIndexes;";
    db.pool.query(query1, function (error, rows, fields) {
        res.render('indexes', { data: rows });
    })
});

app.get('/sectors', function (req, res) {
    let query1 = "SELECT * FROM MarketSectors;";
    db.pool.query(query1, function (error, rows, fields) {
        res.render('sectors', { data: rows });
    })
});

// app.js - ROUTES section

app.post('/add-stock-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    if (data.sectorID === 0) {
        data.sectorID = 'NULL'
    }
    // Create the query and run it on the database
    query1 = `INSERT INTO Stocks (stockName, stockSymbol, currentPrice, highPrice, lowPrice, sectorID, MarketIndexes_indexID) VALUES ('${data.stockName}', '${data.stockSymbol}', '${data.currentPrice}', '${data.highPrice}', '${data.lowPrice}', '${data.sectorID}', '${data.indexID}')`;
    let updateNull = `UPDATE Stocks SET sectorID = NULL WHERE sectorID = 0`;
    query2 = `SELECT * FROM Stocks;`;

    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        {
            // If there was no error, perform a SELECT * on Stocks
            db.pool.query(updateNull, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    db.pool.query(query2, function (error, rows, fields) {
                    
                        if (error) {

                            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                            console.log(error);
                            res.sendStatus(400);
                        } else {
                            res.send(rows);

                        }
                    })
                }
            })
        }

    })
});

app.post('/add-analyst-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Analysts (analystName) VALUES ('${data.analystName}')`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        {
            // If there was no error, perform a SELECT * on Stocks
            query2 = `SELECT * FROM Analysts;`;
            db.pool.query(query2, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }

    })
});

app.post('/add-index-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO MarketIndexes (indexName) VALUES ('${data.indexName}')`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        {
            // If there was no error, perform a SELECT * on Stocks
            query2 = `SELECT * FROM MarketIndexes;`;
            db.pool.query(query2, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }

    })
});

app.delete('/delete-stock-ajax/', function (req, res, next) {
    let data = req.body;
    let stockID = parseInt(data.id);
    let deleteStocks_has_MarketSectors = `DELETE FROM Stocks_has_MarketSectors WHERE Stocks_stockID = ?`;
    let deleteStock = `DELETE FROM Stocks WHERE stockID = ?`;


    // Run the 1st query
    db.pool.query(deleteStocks_has_MarketSectors, [stockID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        else {
            // Run the second query
            db.pool.query(deleteStock, [stockID], function (error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.sendStatus(204);
                }
            })
        }
    })
});

app.put('/put-stock-ajax', function (req, res, next) {
    let data = req.body;

    let stockID = data.stockID;
    let currentPrice = data.currentPrice;
    let highPrice = data.highPrice;
    let lowPrice = data.lowPrice;
    let sectorID = data.marketSector;

    if (sectorID === 0) {
        sectorID = 'NULL'
    }

    console.log(sectorID)

    let queryUpdatePrice = `UPDATE Stocks SET currentPrice = ?, highPrice = ?, lowPrice = ?, sectorID = ? WHERE Stocks.stockID = ?`;
    let selectStock = `SELECT * FROM Stocks WHERE stockID = ?`
    let updateNull = `UPDATE Stocks SET sectorID = NULL WHERE sectorID = 0`;

    // Run the 1st query
    db.pool.query(selectStock, [stockID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        // If there was no error, we run our second query and return that data so we can use it to update the people's
        // table on the front-end
        else {
            // Run the second set of queries
            db.pool.query(queryUpdatePrice, [currentPrice, highPrice, lowPrice, sectorID, stockID], function (error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    db.pool.query(updateNull, function (error, rows, fields) {
                        if (error) {
                            console.log(error);
                            res.sendStatus(400);
                        } else {
                                res.send(rows);
                            }
                    })
                }
            })
        }
    })
});

app.post('/add-subscriber-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let analystID = parseInt(data.analystID);
    if (isNaN(analystID)) {
        analystID = 'NULL'
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO Subscribers (firstName, lastName, subscribeDate, Analysts_analystID) VALUES ('${data.firstName}', '${data.lastName}', '${data.subscribeDate}', ${analystID})`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Subscribers;`;
            db.pool.query(query2, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }
    })
});

app.post('/add-stocks-has-sectors-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Stocks_has_MarketSectors (Stocks_stockID, MarketSectors_sectorID) VALUES ('${data.stockID}', '${data.sectorID}')`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Stocks_has_MarketSectors;`;
            db.pool.query(query2, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }
    })
});

app.post('/add-stocks-has-analysts-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Stocks_has_Analysts (Stocks_stockID, Stocks_MarketIndexes_indexID, Analysts_analystID, rocketRating) VALUES ('${data.stockID}', '${data.indexID}', '${data.analystID}','${data.rocketRating}')`;

    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Stocks_has_Analysts;`;
            db.pool.query(query2, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }
    })
});


app.post('/add-sector-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO MarketSectors (sectorName) VALUES ('${data.sectorName}')`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        {
            // If there was no error, perform a SELECT * on Stocks
            query2 = `SELECT * FROM MarketSectors;`;
            db.pool.query(query2, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }

    })
});

app.delete('/delete-sector-ajax/', function (req, res, next) {
    let data = req.body;
    let sectorID = parseInt(data.id);
    let deleteStocks_has_Analysts = `DELETE FROM Stocks_has_MarketSectors WHERE MarketSectors_sectorID = ?`;
    let deleteSector = `DELETE FROM MarketSectors WHERE sectorID = ?`;
    let updateStock = `UPDATE Stocks SET sectorID = NULL WHERE sectorID = ?`;


    // Run the 1st query
    db.pool.query(deleteStocks_has_Analysts, [sectorID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        else {
            // Run the second query
            db.pool.query(deleteSector, [sectorID], function (error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    db.pool.query(updateStock, [sectorID], function (error, rows, fields) {
                        if (error) {
                            console.log(error);
                            res.sendStatus(400); 
                        } else {
                            res.sendStatus(204);
                            
                        } 
                    })
                }
            })
        }
    })
});

app.put('/put-sub-ajax', function (req, res, next) {
    let data = req.body;

    let subID = data.subID;

    let analystID = parseInt(data.analystID);
    if (isNaN(analystID)) {
        analystID = 'NULL'
    }

    let fk_check_off = `SET FOREIGN_KEY_CHECKS = 0`;
    let queryUpdateAnalyst = `UPDATE Subscribers SET Analysts_analystID = ? WHERE Subscribers.subscriberID = ?`;
    let selectSub = `SELECT * FROM Subscribers WHERE subscriberID = ?`;
    let updateNull = `UPDATE Subscribers SET Analysts_analystID = NULL WHERE Subscribers.Analysts_analystID = 0`;
    let fk_check_on = `SET FOREIGN_KEY_CHECKS = 1`;

    // Run the 1st query -- turn off local FK checks
    db.pool.query(fk_check_off, function (error, rows, fields) {
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }
        else {
            // Select subscriber
            db.pool.query(selectSub, [subID], function (error, rows, fields) {
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }

                // If there was no error, we run our second query and return that data so we can use it to update the people's
                // table on the front-end
                else {
                    // Update analyst
                    db.pool.query(queryUpdateAnalyst, [analystID, subID], function (error, rows, fields) {

                        if (error) {
                            console.log(error);
                            res.sendStatus(400);
                        } else {
                            // Update any NULL values in table
                            db.pool.query(updateNull, function (error, rows, fields) {
                                if (error) {
                                    console.log(error);
                                    res.sendStatus(400);}
                                else{
                                    // Turn FK checks back on
                                    db.pool.query(fk_check_on, function (error, rows, fields) {
                                        if (error) {
                                            console.log(error);
                                            res.sendStatus(400);}
                                        else {
                                        
                                            res.send(rows);

                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
});
/*
    LISTENER
*/
app.listen(PORT, function () {            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});