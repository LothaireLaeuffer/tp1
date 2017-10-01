



var ContentModel = function (model){

	//public
	this.type = model.type;
	this.id = model.id;
	this.title = model.title;
	this.src = model.src;
	this.fileName = model.fileName;

	//private
	var data = model .data;


	this.getData = function(){
		return this.data;
	}

	this.setData = function(data){
		this.data = data;
	}
}


ContentModel.create =  function(content, callback){

		fs.writeFile(CONFIG.contentDirectory+"/"+content.fileNAme, content.data, 'utf8', function (err){
			if(!!err)
			{
				console.error(err);
				return;
			}
		});


		fs.writeFile(CONFIG.contentDirectory+"/"+content.id+".meta.json", METADONNE, 'utf8', function (err){
			if(!!err)
			{
				console.error(err);
				return;
			}
		});
	}


ContentModel.read = function(id, callback){

		fs.readFile(id+".meta.json", function(err, file){
			
			if (!!err)
			{
				console.error(err);
				return;
			}

			return file;

		});
	}

ContentModel.update = function(content, callback){

	}

ContentModel.delete = function (id, callback){

		fs.unlink(id+".meta.json", function (err){
			if (!!err)
			{
				console.error(err);
				return;
			}
		});

		fs.unlink(id+".pres.json", function (err){
			if (!!err)
			{
				console.error(err);
				return;
			}
		});
	}


/*
	constructor( aaaaaa){
		this.type = aaaaaa.type;
		this.id = aaaaaa.id;
		this.title = aaaaaa.title;
		this.src = aaaaaa.src;
		this.fileName = aaaaaa.fileName;
		this.data = aaaaaa.data;
	}
*/




module.exports = ContentModel;











