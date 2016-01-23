var indexController = {
	index: function(req, res) {
		res.render('index');
	},
	login: function(req, res) {
		console.log("logging in...");
		// res.render('main');
	}
};

module.exports = indexController;