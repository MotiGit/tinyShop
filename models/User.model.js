// user schema

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseHidden = require('mongoose-hidden')();
var bcrypt = require('bcrypt');

var minlength = [2,"The value of path `{PATH}` (`{VALUE}`) is shorter than ({minlength})"];

var UserSchema = new Schema ({
    username: {
        type:String,
        minlength: minlength,
    },
    email: {
       type: String,
       required: true,
        unique: true
    },
    password: {
        type: String,
        hide: true
    }
});

//hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash){
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});


UserSchema.plugin(mongooseHidden);

module.exports = mongoose.model('User', UserSchema, 'users');