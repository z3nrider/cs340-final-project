-- Team Meme Stock
-- TD Memetrade Data Manipulation Queries
-- Kevin Riemer and Brandon Koehler

-- get all Stock information for Stocks Page
SELECT * FROM Stocks;
SELECT * FROM MarketSectors;
SELECT * FROM MarketIndexes;

-- get all Analysts for Analysts Page
SELECT * FROM Analysts;

-- get all Sectors for Indexes Page
SELECT * FROM MarketIndexes;

-- get all Sectors for Sectors Page
SELECT * FROM MarketSectors;

-- get all Subscribers for Subscribers Page
SELECT * FROM Subscribers;
SELECT * FROM Analysts;

-- get all Stocks_Has_Sectors
SELECT * FROM Stocks;
SELECT * FROM MarketSectors;
SELECT * FROM Stocks_has_MarketSectors;

-- get all Stocks_Has_Analysts
SELECT * FROM Stocks;
SELECT * FROM Analysts;
SELECT * FROM Stocks_has_Analysts;

-- get a single stock's data for the Update Stock form
SELECT stockID, stockName, stockSymbol, currentPrice, highPrice, lowPrice, sectorID, MarketIndexes_indexID FROM Stocks WHERE stockID = :stock_ID_selected_from_browse_stocks_page;

-- get all analyst's to populate a dynamic dropdown for associating with a subscriber 
SELECT * FROM Subscribers;
-- save subscribers from rows
SELECT * FROM Analysts;
-- save subscribers from rows and implement into hbs file

-- get all stock's and sector's to populate a dynamic dropdown for adding to Stocks Has Market Sectors 
SELECT * FROM Stocks;
-- save stocks from rows
SELECT * FROM MarketSectors;
-- save sectors from rows and implement into hbs file
SELECT * FROM Stocks_has_MarketSectors;

-- add a new stock
INSERT INTO Stocks (stockName, stockSymbol, currentPrice, highPrice, lowPrice, sectorID, MarketIndexes_indexID) VALUES ('${data.stockName}', '${data.stockSymbol}', '${data.currentPrice}', '${data.highPrice}', '${data.lowPrice}', '${data.sectorID}', '${data.indexID}');
SELECT * FROM Stocks;

-- add a new subscriber
INSERT INTO Subscribers (firstName, lastName, subscribeDate, Analysts_analystID) VALUES ('${data.firstName}', '${data.lastName}', '${data.subscribeDate}', ${analystID});
SELECT * FROM Subscribers;

-- add a new analyst
INSERT INTO Analysts (analystName) VALUES ('${data.analystName}');
SELECT * FROM Analysts;

-- add a new market index
INSERT INTO MarketIndexes (indexName) VALUES ('${data.indexName}');
SELECT * FROM MarketIndexes;

-- add a new market sector
INSERT INTO MarketSectors (sectorName) VALUES ('${data.sectorName}');
SELECT * FROM MarketSectors;

-- add a stocks_has_analysts
INSERT INTO Stocks_has_Analysts (Stocks_stockID, Stocks_MarketIndexes_indexID, Analysts_analystID, rocketRating) VALUES ('${data.stockID}', '${data.indexID}', '${data.analystID}','${data.rocketRating}');
SELECT * FROM Stocks_has_Analysts;

-- add a stocks_has_sectors
INSERT INTO Stocks_has_MarketSectors (Stocks_stockID, MarketSectors_sectorID) VALUES ('${data.stockID}', '${data.sectorID}');
SELECT * FROM Stocks_has_MarketSectors;

-- NULLable relationship (1-to-M) Analysts to Subscribers / Update Subscriber
SET FOREIGN_KEY_CHECKS = 0;
UPDATE Subscribers SET Analysts_analystID = ? WHERE Subscribers.subscriberID = ?;
SELECT * FROM Subscribers WHERE subscriberID = ?;
UPDATE Subscribers SET Analysts_analystID = NULL WHERE Subscribers.Analysts_analystID = 0;
SET FOREIGN_KEY_CHECKS = 1;

-- delete a stock
DELETE FROM Stocks_has_MarketSectors WHERE Stocks_stockID = ?;
DELETE FROM Stocks WHERE stockID = ?;

-- delete a sector
DELETE FROM Stocks_has_MarketSectors WHERE MarketSectors_sectorID = ?;
DELETE FROM MarketSectors WHERE sectorID = ?;
UPDATE Stocks SET sectorID = NULL WHERE sectorID = ?

-- update a stock 
SELECT * FROM Stocks WHERE stockID = ?;
UPDATE Stocks SET currentPrice = ?, highPrice = ?, lowPrice = ?, sectorID = ? WHERE Stocks.stockID = ?;

-- dis-associate a stock from a market sector (M-to-M relationship deletion) -- uses on delete CASCADE
DELETE FROM Stocks_has_MarketSectors WHERE Stocks_stockID = ?;
DELETE FROM Stocks WHERE stockID = ?;
