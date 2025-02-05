import express from 'express';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../controllers/product.controller.js';

const router = express.Router();

// Metodo GET que se ejecutara para obtener todos los productos.
router.get("/", getProducts);   // Pasamos la funcion de GET en 'product.controllers.js' como callback

// Metodo POST que se ejecutara cuando alguien envie datos para agregar un nuevo producto.
router.post("/", addProduct);

// Metodo PUT que se ejecutara para modificar un producto existente.
router.put("/:id", updateProduct);

// Metodo DELETE para eliminar productos por id
router.delete("/:id", deleteProduct);

export default router;