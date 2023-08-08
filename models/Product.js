const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
    Product_name: {
        type: String
    },
    Product_type: {
        type: String
    },
    Price: {
        type: Number
    },
    Featured: {
        type: Boolean
    },
    Evaluation: {
        type: Number
    },
    Customer_review: {
        type: Number
    },
    Available: {
        type: String
    },
    SKU: {
        type: String
    },
    Brand: {
        type: String
    },
    Color: {
        type: [String]
    },
    Shipping: {
        type: Boolean
    },
    Description: {
        type: String
    },

}, { timestamps: true });

const Product = mongoose.model('products', ProductSchema);
module.exports = Product;
