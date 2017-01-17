//先包含进来
var MongoDB = require('./mongodb');
var express = require("express");
var router = express.Router();
var async = require("async");

//查询一条数据
// MongoDB.findOne('user_info', {_id: user_id}, function (err, res) {
//     console.log(res);
// });

// //查询多条数据
// MongoDB.find('user_info', {type: 1}, {}, function (err, res) {
//     console.log(res);
// });

// //更新数据并返回结果集合
// MongoDB.updateData('user_info', {_id: user_info._id}, {$set: update_data}, function(err, user_info) {
//       callback(null, user_info);
// });

//删除数据
// MongoDB.remove('user_data', {user_id: 1});

router.get("/",function(req,res){
	
	var resdata= {"title":"title"};

	async.waterfall([
		function(callback){
			MongoDB.save('user_info',{user_id:1,type:1,name:'test'},function(data){
				console.info(data);
				callback(null, "one");
			});
		},
		function(arg1, callback){
		 	console.info(arg1);
		 	MongoDB.find('user_info',{},function(err,data){
				resdata.d = data;
				callback(null, 'three');
			});
		},
	], function (err, result) {
		console.info(result);
		console.info(resdata);
		res.render('mon', resdata);
	});
});


module.exports = router;