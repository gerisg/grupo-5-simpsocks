module.exports = {
	index: (req, res) => {
		res.render('index');
	},
	aboutUs: (req, res) => {
		res.render('site/about-us');
	},
	faq: (req, res) => {
		res.render('site/faq');
	},
	contact: (req, res) => {
		res.render('site/contact-form');
	}
};