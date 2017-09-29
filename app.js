console.log("It works !! ");

var CONFIG = require("./config.json");
process.env.CONFIG = JSON.stringify(CONFIG);

var express = require("express");
var http = require("http");
var path = require("path");
var fs = require("fs");

var defaultRoute = require("./app/routes/default.route.js");




//init server
var app = express();
var server = http.createServer(app);
server.listen(CONFIG.port, function() {
	var host = this.address().address;
	var port = this.address().port;

	console.log("Example app listening at http://%s:%s", host , port);

});





//Q_9.3
// #2
app.get("/", function(request, response) {
	response.send("It works !");
});
// #3
/*app.use(function(request, response, cb) {
	response.send("It works !");
	cb();
});
*/


app.use("/index", express.static(path.join(__dirname, "/public")));


app.get("/loadPres", function(request, response) {

	var returnData = new Object();

	fs.readdir(CONFIG.presentationDirectory, function(err, files){
		
		if (!!err){
			console.error(err);
			return;
		}

		var extFile = "json";
		// TODO verifier extension

	
		var compteur=0;

		files.forEach(function(fileName){

			fs.readFile(path.join(CONFIG.presentationDirectory, fileName), function (err, file){

				compteur++;

				var jsonData = JSON.parse(file);
				var id = jsonData.id;

				returnData[id] = jsonData;


				if (files.length == compteur)
				{
					response.send(returnData);
				}

			});
		});
	});
});




