var Comment = require('../models/comments')

var indexController = {
	index: function(req, res) {
		res.render('index');
	},
	getComments: function(req, res) {
		Comment.find({}, function(err, results) {
			if(err) throw err;
			res.send(results);
		});
	},
	saveComment: function(req, res) {
		var newComment = new Comment(req.body);
		newComment.save(function(err, result) {
			if(err) throw err;
			res.send(result);
		});
	}
};

module.exports = indexController;
