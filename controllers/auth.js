var db = require('../models');
var express = require('express');
var router = express.Router();
var gmapsApi = process.env.GMAPS_API;

// GET login and display form
router.get('/login', function(req, res) {
	res.render('auth/login');
});

router.get('/map', function(req, res) {
	res.render('auth/map', {gmapsApi: gmapsApi});
});

// POST login input from user, check credentials
router.post('/login', function(req, res) {
	db.user.authenticate(req.body.email, req.body.password,function(err, user) {
		if (err) {
			res.send(err);
		} else if (user) {
			req.session.user = user.id;
			req.flash('success','welcome back');
			res.redirect('/auth/map');
		} else {
			req.flash('danger','invalid credentials');
			res.redirect('/auth/login');
		}
	});
});

// GET signup info from user, display form
router.get('/signup', function(req, res) {
	res.render('auth/signup');
});

// POST login info from user, check credentials
router.post('/signup', function(req, res) {
	if(req.body.password != req.body.password2) {
		req.flash('danger','Passwords must match');
		res.redirect('/auth/signup');
	} else {
		db.user.findOrCreate({
			where:{
				email: req.body.email
			},
			defaults:{
				email: req.body.email,
				password: req.body.password,
				name: req.body.name
			}
		}).spread(function(user, created) {
			if (created) {
				req.flash('success','Welcome to our community!');
				res.redirect('/');
			} else {
				req.flash('danger','that email already exists. Please login or provide new email.');
				res.redirect('/auth/signup');
			}
		}).catch(function(err) {
			if(err.message) {
				req.flash('danger',err.message);
			} else {
				req.flash('danger','unknown error.');
				console.log(err);
			}
			res.redirect('/auth/signup');
		})
	}
});

// GET logout, user logs out
router.get('/logout',function(req,res) {
	req.flash('info','See you soon!');
	req.session.user = false;
	res.redirect('/');
});

module.exports = router;






































































