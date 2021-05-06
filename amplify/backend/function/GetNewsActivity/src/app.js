/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
var request = require('request')
// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});


/**********************
 * Example get method *
 **********************/

 app.get("/news", function (req, res) {
  // Add your code here
  const newsQuery = req.query.newsQuery;
  const apikey = "e25942f77a1249899e321f5b6f813995";
  const requestURL =
    "https://newsapi.org/v2/everything?q=" + newsQuery + "&apiKey=" + apikey;
  console.log("genereaated url: ", requestURL);
  request(requestURL, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body);
    } else {
      res.status(404).json({errorMessage: "API Error"})
    }
  });
  });

app.get('/news/*', function(req, res) {

});
