var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseHidden = require('mongoose-hidden')();
var bcrypt = require('bcrypt');

var minlength = [2,"The value of path `{PATH}` (`{VALUE}`) is shorter than ({minlength})"];

var AdminSchema = new Schema ({
    username: {
        type:String,
        required: true
    },
    password: {
        type: String,
        hide: true
    }
});

//hashing a password before saving it to the database
AdminSchema.pre('save', function (next) {
  var admin = this;
  bcrypt.hash(admin.password, 10, function (err, hash){
    if (err) {
      return next(err);
    }
    admin.password = hash;
    next();
  })
});

//UserSchema.plugin(mongooseHidden);

module.exports = mongoose.model('Admin', AdminSchema, 'admins');