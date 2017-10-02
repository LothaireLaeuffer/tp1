"use strict";


var fs= require('fs');
var CONFIG = require("../../configMac.json");




var ContentModel = function (model){

	model= check(model);

	//public
	this.type = model.type;
	this.id = model.id;
	this.title = model.title;
	this.src = model.src;
	this.fileName = model.fileName;

	//private
	var data = model.data;


	this.getData = function(){
		return this.data;
	}

	this.setData = function(data){
		this.data = data;
	}


	function check(model){
		if(typeof model === "undefined")
		{
			model={type: null, id: null, title: null, filename: null, data: null};
		}
		return model;
	}

}


ContentModel.create =  function(content, callback){

	var check_content = false;
	var check_metadata = false;

	fs.writeFile(CONFIG.contentDirectory+"/"+content.fileName, content.getData(), 'utf8', function (err){
		if(!!err)
		{
			console.error(err);
			return;
		}
		
		console.log("file content created");
		check_content= true;

		if (check_content && check_metadata)
		{
			callback(err);
		}
	});

	fs.writeFile(CONFIG.contentDirectory+"/"+content.id+".meta.json", JSON.stringify(content), 'utf8', function (err){
		if(!!err)
		{
			console.error(err);
			return;
		}

		console.log("file meta data created");
		check_metadata=true;

		if (check_content && check_metadata)
		{
			callback(err);
		}
	});



}


ContentModel.read = function(id, callback){

	fs.readFile(CONFIG.contentDirectory+"/"+id+".meta.json", function(err, file){
		
		if (!!err)
		{
			console.error(err);
			return;
		}

		callback(err, file);

	});
}

ContentModel.update = function(content, callback){
console.log("eeeee");
console.log(content);
	if (content.getData() <= 0)
	{
		console.log("Error : no data");
		return;
	}

	//create(content, callback);

	var check_content = false;
	var check_metadata = false;

	fs.writeFile(CONFIG.contentDirectory+"/"+content.fileName, content.getData(), 'utf8', function (err){
		if(!!err)
		{
			console.error(err);
			return;
		}
		
		console.log("file content created");
		check_content= true;

		if (check_content && check_metadata)
		{
//			callback(err);
		}
	});

	fs.writeFile(CONFIG.contentDirectory+"/"+content.id+".meta.json", JSON.stringify(content), 'utf8', function (err){
		if(!!err)
		{
			console.error(err);
			return;
		}

		console.log("file meta data created");
		check_metadata=true;

		if (check_content && check_metadata)
		{
//			callback(err);
		}
	});
	console.log("je suis la ");

}

ContentModel.delete = function (id, callback){

	console.log("delete function param : id = " +  id);

	var check_content = false;
	var check_metadata = false;

	fs.unlink(id+".meta.json", function (err){
		if (!!err)
		{
			console.error(err);
			return;
		}

		check_content = true;
		if (check_content && check_metadata)
		{
//			callback(err);
		}

	});

	fs.unlink(id+".pres.json", function (err){
		if (!!err)
		{
			console.error(err);
			return;
		}

		check_content = true;
		if (check_content && check_metadata)
		{
//			callback(err);
		}

	});

}



function ContentModel( aaaaaa){
	this.type = aaaaaa.type;
	this.id = aaaaaa.id;
	this.title = aaaaaa.title;
	this.src = aaaaaa.src;
	this.fileName = aaaaaa.fileName;
	this.data = aaaaaa.data;
}





module.exports = ContentModel;











