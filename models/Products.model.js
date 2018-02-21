// products schema

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseHidden = require('mongoose-hidden')();
var bcrypt = require('bcrypt');


var ProductSchema = new Schema ({
   
    category:{
    type: String,
    },
    name:{
    type: String,
    },
    price:{
    type: String,
    },
    image:{
    type: String,
    },
    description:{
    type: String,
    }
    });



module.exports = mongoose.model('Product', ProductSchema, 'products');