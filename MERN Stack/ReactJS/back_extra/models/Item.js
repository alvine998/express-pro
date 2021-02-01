const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema ({
    nama:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    nohp:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default: Date.now
    }
}, {
    timestamps:true
});

module.exports = Item = mongoose.model('item', ItemSchema);