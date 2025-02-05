import express from 'express';
import dotenv from 'dotenv';    // dotenv para poder leer archivos .env
import { connectDB } from './config/db.js';

import productRoutes from './routes/product.route.js';


dotenv.config();    //  Permite acceder a las variables definidas en un archivo .env
const app = express();  // Se crea una instancia del seervidor express
app.use(express.json());    // Permite a Express procesar JSON.

app.use("/api/products", productRoutes)


app.listen(5000,()=>{
    connectDB();
    console.log('Server started at http://localhost:5000');
})

//  5FugQZBprmyr3ouo