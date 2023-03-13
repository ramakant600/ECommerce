const mongoose = require('mongoose');
const Schema = mongoose.Schema ;
const orderDetails = new Schema({
    userId:{ type: Schema.Types.ObjectId, ref: 'User' },
    ProductId:{ type: Schema.Types.ObjectId, ref: 'Product' },
    orderDateTime:{
        type:Date,
        default: Date.now
    },
    status:{
        type:String
    },
    quantity:{
        type:Number
    },
    cancelled:{
        type:Boolean
    }
});

module.exports = mongoose.model('Order', orderDetails);