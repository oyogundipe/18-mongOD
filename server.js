/// Dependencies
var express = require("express");
var mongojs = require("mongojs");
// Require request and cheerio. This makes the scraping possible
var request = require("request");
var cheerio = require("cheerio");

// Initialize Express
var app = express();

// Database configuration
var databaseUrl = "scraper";
var collections = ["scrapedData"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);

db.on("error", function(error) {
  console.log("Database Error:", error);
});

// Main route (simple Hello World Message)
app.get("/", function(req, res) {
  res.send("Hello world");
});

// TODO: make two more routes

// Route 1
// =======
app.get('/Allpaths', function(req, res){
  db.scraper.insert({name: bee});
  console.log('are you working?')
})
//db.(DATABASENAME).insert

/* -/-/-/-/-/-/-/-/-/-/-/-/- */
app.get("/scrape", function (req, res) {
    console.log('plz scrape')
    request("https://www.theatlantic.com/", function(error, response, html ){
    //load the html
    var $ = cheerio.load(html);
    //for each element with a specific class
    $(".article").each(function(i, element){

    // save the text and also the href enclosed in current elelemnt
    var result = {};
    result.title = $(this).children("h2").text();
    result.link = $(this).children("h2").children("a").attr("href");
    })
     // create a model for the articles
    var entry = new Article(result);

    entry.save(function(err, doc) {
    if (err) {
        console.log(err);
    }
    else {
        console.log(doc);
    }
        });
    });
    res.send("scrape has completed");

    // getting the articles
    app.get("/articles", function(req,res){
        Article.find({}, function(error, doc){
            if (error) {
                console.log(error);
            }
        else {
            res.json(doc);
        }
        });
}); 
    // Listen on port
    app.listen(3000, function() {
    console.log("App running on port " + 3000);
    });
