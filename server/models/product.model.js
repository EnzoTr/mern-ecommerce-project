import mongoose from "mongoose";

// Definimos la estructura / esquema de los documentos de la coleccion Products
const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    image:{
        type: String,
        required: true
    },
},{
    timestamps: true    // Se guardan los createdAt y updatedAt
});

// MongoDB pluraliza 'Product' a 'products'
const Product = mongoose.model('Product', productSchema);

export default Product;