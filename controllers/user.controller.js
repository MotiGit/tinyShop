 var mongoose = require('mongoose');
 var Schema = mongoose.Schema;
 var mongooseHidden = require('mongoose-hidden')();
 var User = require('../models/User.model');
 var Admin = require('../models/Admin.model');
 var Product = require('../models/Products.model');
 var bcrypt = require('bcrypt');
 var cookieParser = require('cookie-parser');
 var session = require('client-sessions');

// register user to DB
 exports.register = function (req, res) {
 var newUser = new User();
 newUser.username = req.body.username;
 newUser.email = req.body.email;
 newUser.password = req.body.password;
 newUser.save(function (err, user) {
 if (err) {
 console.log(err);
 if (err.code === 11000) {
 console.log(err);
 }
 res.render('register.jade', err);
 } else {
 //req.session.user = user;
 res.redirect('/login');
 }
 });
 console.log(newUser);
 };

// login auth
 exports.login = function (req, res, next) {
 User.findOne({
 username: req.body.username
 }, function (err, user) {
 if (!user) {
 res.redirect('/products');
 } else {
 if (bcrypt.compareSync(req.body.password, user.password)) {
 req.session.user = user;
 res.redirect('/products');
 err = ("User " + user.username + " has logged in.");
 //return done(null, user);
 } else {
 console.log("Wrong Email/Password. Please try again");
 res.render("login", {
 err: "no"
 });
 }
 }
 });
 };


// add admin users
 exports.adminregister = function (req, res, next) {
 var newAdmin = new Admin();
 newAdmin.username = req.body.username;
 newAdmin.password = req.body.password;
 newAdmin.save(function (err, admin) {
 if (err) {
 console.log(err);
 if (err.code === 11000) {
 console.log(err);
 }
 res.render('adminregister');
 } else {
 //req.session.user = user;
 res.redirect('/adminLogin');
 }
 });
 };

// auth admin username and password
 exports.admin = function (req, res, next) {
 Admin.findOne({username: req.body.username}, function (err, admin) {
 if (!admin) {
 res.redirect('/admin');
 } else {
 if (bcrypt.compareSync(req.body.password, admin.password)) {
 req.session.admin = admin;
 res.redirect('/admin');
 
 } else {
 console.log("Wrong Email/Password. Please try again");
 res.render("adminLogin");
 }
 }
 });
 };

// add/edit/delete users in DB in admin panel
 exports.adminAddUser = function (req, res, next) {
 var byEmail = {
 email: req.body.email
 };
 User.deleteOne(byEmail, function (err, obj) {
 if (err) throw err;
 console.log("1 document deleted");
 });
 var newvalues = {
 $set: {
 username: req.body.username,
 password: req.body.password
 }
 };
 User.updateOne(byEmail, newvalues, function (err, res) {
 if (err) throw err;
 console.log("1 document updated");
 });
 var newUser = new User();
 newUser.username = req.body.username;
 newUser.email = req.body.email;
 newUser.password = req.body.password;
 newUser.save(function (err, user) {
 if (err) {
 // console.log(err);
 if (err.code === 11000) {
 // console.log(err);
 }
 res.redirect('/adminUsers');
 } else {
 //req.session.user = user;
 res.redirect('/adminUsers');
 }
 next();
 });
 console.log(newUser);
 };

// delete/edit products in DB in admin panel
 exports.adminProduct = function (req, res, next) {
 var byName = {
 name: req.body.name
 };
 var byId = {
 _id: req.body.id
 };
 Product.deleteOne(byId, function (err, obj) {
 if (err) throw err;
 console.log("1 document deleted");
 console.log(byId);
 next();
 });
 res.redirect('/adminProducts');
 var byId2 = {
 _id: req.body.id2
 };
 var newvalues = {
 $set: {
 category: req.body.category,
 name: req.body.editName,
 price: req.body.price,
 image: req.body.image,
 description: req.body.description
 }
 };
 Product.updateOne(byId2, newvalues, function (err, res) {
 if (err) throw err;
 console.log("1 document updated");
 });
 };

// add products to DB in admin panel
 exports.adminAddProduct = function (req, res, next) {
 var newProduct = new Product();
 newProduct.category = req.body.categoryAdd;
 newProduct.name = req.body.productNameAdd;
 newProduct.price = req.body.priceAdd;
 newProduct.image = req.body.imageAdd;
 newProduct.description = req.body.descriptionAdd;
 newProduct.save(function (err, user) {
 if (err) {
 // console.log(err);
 if (err.code === 11000) {
 // console.log(err);
 }
 res.render('/adminProductsAdd');
 } else {
 //req.session.user = user;
 //res.redirect('/adminProductsAdd');
 }
 //next();
 });
 console.log(newProduct);
 res.redirect('/adminProductsAdd');
 };
