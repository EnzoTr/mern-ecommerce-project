import Product from '../models/product.model.js';
import mongoose from 'mongoose';

// Funciones para los diferentes metodos de consultas HTTP:

// GET
export const getProducts = async (req, res) =>{
    try {
        const products = await Product.find({});    // Si el objeto esta vacio "({})" entonces devolvera todos los productos.
        res.status(200).json({success:true, data: products});   // Devuelve como respuesta un codigo de status y los productos en un JSON
    } catch (e) {
        console.error('Error fetching Products: ' + e.message);
        res.status(500).json({success: false, message:'Error fetching products: ' + e.message});
    }
}

// POST
export const addProduct = async (req, res) => {
    const product = req.body;   // El usuario enviara los datos en el body de la solicitud HTTP, 'req.body' en formato JSON

    // Validacion de campos
    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success: false, message:'Please provide all fields'});
    }

    // Creacion de nuevo producto con los datos recibidos de 'product'
    const newProduct = new Product(product);

    try{
        await newProduct.save(); // Guarda producto en la BD.
        res.status(201).json({success: true, data: newProduct}) // La respuesta al cliente contiene el producto en formato JSON
    }catch (e){
        console.error('Error creating new Product: ' + e.message);
        res.status(500).json({success: false, message:'Server Error: ' + e.message});
    }
}

// PUT
export const updateProduct = async (req, res) => {
    const {id} = req.params;    // ID se encontrara en los parametros de la solicitud HTTP
    const product_update = req.body;

    // Verifica que la ID sea existente
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message:"Product not found"});
    }

    try{
        const updatedProduct = await Product.findByIdAndUpdate(id, product_update, {new:true}); // Encuentra por ID y actualiza segun product_update
        res.status(200).json({success: true, data: updatedProduct});
    }catch (e){
        console.error('Error deleting Product: ' + e.message);
        return res.status(500).json({success: false, message:'Server Error: ' + e.message});
    }
}

// DELETE
export const deleteProduct = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message:"Product not found"});
    }

    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message:"Product deleted"});
    }catch (e){
        console.error('Error deleting Product: ' + e.message);
        return res.status(500).json({success: false, message:'Server Error: ' + e.message});
    }
}