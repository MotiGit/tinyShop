var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var controller = require('./controllers/user.controller');
var passport = require('passport');
var session = require('client-sessions');
var bcrypt = require('bcrypt');
var User = require('./models/User.model');
var Product = require('./models/Products.model');
var Admin = require('./models/Admin.model');
var autoIncrement = require('mongoose-auto-increment');
var jade = require('jade');
var port = 80;  
var app = express(); 

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/tinyShopDb');  
//mongoose.connect('mongodb://0.0.0.0/tinyShopDb');  

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('openUri', function() {
    console.log("Connected to mongodb");
});           

app.use(cookieParser());
app.use(session({
    //key: 'user_sid',
    cookieName: 'session',
    secret: 'sm_rnd-Str',
    duration: 1000 * 60 * 60,
    saveUninitialized: false,
//    httpOnly: true,
//    secure: true,
//    ephemeral: true
    
}));

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/')));
app.use(express.static(path.join(__dirname, '/public')));

app.use(function(req, res, next) {
        res.locals.user = req.user;
        next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var sessionChecker = function (req, res, next) {
    if (req.session.user == null) {
        console.log('not logged');
        res.redirect('/login');
        
    } else {
        console.log('IS logged');
        
        next();
    }    
    
};

// check if admin is logged
var adminChecker = function (req, res, next) {
    if (req.session.admin == null) {
        console.log('admin not logged');
        res.redirect('/adminLogin');
        
    } else {
        console.log('admin IS logged');
        next();
    }    
    
};

// check if user is login
var isLogged = function (req, res, next) {
    if (req.session.user != null) {
        console.log('IS logged');
        res.redirect('/products');
        
    } else {
        console.log('not logged');
        next();
    }    
    
};

app.get('/',isLogged, function(req, res){
    res.render('index.jade'); 
});

app.get('/homePage',isLogged, function(req, res){
    res.render('homePage.jade'); 
});


app.get('/login',isLogged, function(req, res){
    res.render('login.jade');
});

app.get('/register', function(req, res){
    res.render('register.jade');
}); 

app.get('/cart', function(req, res){
    res.render('cart.jade');
});

app.get('/admin',adminChecker, function(req, res){
         res.render('admin/admin');
});

app.get('/adminregister', function(req, res){
         res.render('adminregister');
});

app.get('/adminLogin', function(req, res){
         res.render('adminLogin');
});

app.get('/userLogged/products',sessionChecker, function(req, res){
         Product.find({}, function(err, docs){
        if(err) res.json(err);
        else res.render('userLogged/products', {products: docs});
    });
});
 
app.get('/adminUsers',adminChecker, function(req, res){
     User.find({}, function(err, docs){
        if(err) res.json(err);
        else res.render('admin/adminUsers', {users: docs});
    });
 
});

app.get('/adminProducts',adminChecker, function(req, res){
     Product.find({}, function(err, docs){
        if(err) res.json(err);
        else res.render('admin/adminProducts', {products: docs});
    });
 
});

app.get('/adminProductsAdd',adminChecker, function(req, res){
     Product.find({}, function(err, docs){
        if(err) res.json(err);
        else res.render('admin/adminProductsAdd', {products: docs});
    });
 
});

app.get('/logout', function(req,res){
    
    req.session.destroy(function (err) {
        res.redirect('/login'); //Inside a callback… bulletproof!
    });
    res.redirect('/login');
});

app.get('/products',sessionChecker, function(req, res, next){
   Product.find({}, function(err, docs){
        if(err) res.json(err);
        else {res.render('userLogged/products', {products: docs});
        console.log(req.session.user.username);
             }
    });
    
});

app.get('/shipping',sessionChecker, function(req, res, next){
  res.render('userLogged/shipping');
    
});

app.post('/register' , controller.register);
app.post('/login', controller.login);
app.post('/adminregister',  controller.adminregister ); 
app.post('/adminUsers',  controller.adminAddUser ); 
app.post('/adminProducts', controller.adminProduct); 
app.post('/adminProductsAdd', controller.adminAddProduct); 
app.post('/adminLogin', controller.admin);


module.exports = app;

app.listen(port, function(){
    console.log('app listening on port ' + port);
});

