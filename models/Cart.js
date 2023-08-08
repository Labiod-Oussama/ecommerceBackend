const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    products: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'products',
            required: true
        },
        quantitiy: {
            type: Number,
            default: 1
        },
        color:{
            type:String,
            required:true
        }
    }]
}, { timestamps: true })
const Cart = mongoose.model('carts', CartSchema);
module.exports = Cart;
