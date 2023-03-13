var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    productName: {
        type: String,
        // required:true
    },
    productDescription: {
        type: String,
        // required:true
    },
    productCategory: {
        type: String,
        // required:true
    },
    productPrice: {
        type: String,
    },
    productImage: {
        type: String
    },
    productSeller: {
        type: String
    },
    productRating: {
        type: String
    },
    dateAdded:{
        type:Date,
        default:Date.now
    },
    Deleted:{
        type:Boolean
    },
    adminId:{ type: Schema.Types.ObjectId, ref: 'User' },
    
});

module.exports = mongoose.model("Product", ProductSchema);
