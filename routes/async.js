var express = require("express");
var router = express.Router();
var async = require("async");
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/mycol'; 



var insertData = function(db, callback) {  
    //连接到表  
    var collection = db.collection('tb2');
    //插入数据
    var data = [{"name":'wilson001',"age":21},{"name":'wilson002',"age":22}];
    collection.insert(data, function(err, result) { 
        if(err){
            console.log('Error:'+ err);
            return;
        }     
        callback(result);
    });
}
var selectData = function(db, callback) {  
  //连接到表  
  var collection = db.collection('tb2');
  //查询数据
  var whereStr = {"name":'wilson002'};
  collection.find(whereStr).toArray(function(err, result) {
    if(err)
    {
      console.log('Error:'+ err);
      return;
    }     
    callback(result);
  });
}
router.get("/list",function(req,res){
	MongoClient.connect(DB_CONN_STR, function(err, db) {
	    console.log("连接成功！");
	    selectData(db, function(result) {
		    console.log(result);
		    db.close();
	    	res.send(result);
		  });
	});	
});


var deleteData = function(db,callback){
	var collection = db.collection("tb2");

	var whereStr = {"name":"wilson002"};
	collection.remove(whereStr,function(err,result){
		if(err){
			console.log("error");
			return;
		}
		callback(result);
	});
}

router.get("/delete",function(req,res){
	MongoClient.connect(DB_CONN_STR, function(err, db) {
	    console.log("连接成功！");
	    deleteData(db, function(result) {
	    	console.info(result);
		    db.close();
	    	res.send(result);
		  });

	});	
});

router.get("/",function(req,res){
	res.send("async");

	async.waterfall([
		function(callback){
			
			MongoClient.connect(DB_CONN_STR, function(err, db) {
			    console.log("连接成功！");
			    insertData(db, function(result) {
			        db.close();
			    });
			});

			callback(null, 'one', 'two');
		},
		function(arg1, arg2, callback){
		 	MongoClient.connect(DB_CONN_STR, function(err, db) {
			    console.log("连接成功！");
			    selectData(db, function(result) {
				    console.log(result);
				    db.close();
			    	//res.send(result);
				  });
			});	
			callback(null, 'three');
		},
		function(arg1, callback){
			callback(null, 'don2222e');
		}
	], function (err, result) {
	   console.log(result);
	});


});

module.exports = router;