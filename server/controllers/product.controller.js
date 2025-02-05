import Product from '../models/product.model.js';
import mongoose from 'mongoose';

export const getProducts = async (req, res) =>{
    try {
        const products = await Product.find({});    // Si el objeto esta vacio "({})" entonces devolvera todos los productos.
        res.status(200).json({success:true, data: products});
    } catch (e) {
        console.error('Error fetching Products: ' + e.message);
        res.status(500).json({success: false, message:'Error fetching products: ' + e.message});
    }
}

export const addProduct = async (req, res) => {
    const product = req.body;   // El usuario enviara estos datos. 'req.body' contiene los datos enviados en la solicitud.

    // Validacion de campos
    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success: false, message:'Please provide all fields'});
    }

    // Creacion de nuevo producto con los datos recibidos de 'product'
    const newProduct = new Product(product);

    try{
        await newProduct.save(); // Guarda producto en la BD.
        res.status(201).json({success: true, data: newProduct})
    }catch (e){
        console.error('Error creating new Product: ' + e.message);
        res.status(500).json({success: false, message:'Server Error: ' + e.message});
    }
}

export const updateProduct = async (req, res) => {
    const {id} = req.params;
    const product_update = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message:"Product not found"});
    }

    try{
        const updatedProduct = await Product.findByIdAndUpdate(id, product_update, {new:true});
        res.status(200).json({success: true, data: updatedProduct});
    }catch (e){
        console.error('Error deleting Product: ' + e.message);
        return res.status(500).json({success: false, message:'Server Error: ' + e.message});
    }
}

export const deleteProduct = async (req, res) => {
    const {id} = req.params;
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message:"Product deleted"});
    }catch (e){
        console.error('Error deleting Product: ' + e.message);
        return res.status(404).json({success: false, message:'Product not found'});
    }
}