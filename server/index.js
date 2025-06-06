import express from 'express';
import dotenv from 'dotenv';    // dotenv para poder leer archivos .env
import { connectDB } from './config/db.js'; // Conexion a la BD
import cors from 'cors';

import productRoutes from './routes/product.route.js';


dotenv.config();    //  Permite acceder a las variables definidas en un archivo .env
const app = express();  // Se crea una instancia del servidor express
app.use(cors());    // Habilita las solicitudes de origen cruzado
// const PORT = process.env.PORT || 5000;
app.use(express.json());    // Permite a Express procesar JSON.
app.use("/api/products", productRoutes);


app.get("/", (req, res) => {
  res.send("API is running...");
});



// start server
const startServer = async () => {
    try{
        connectDB();
        const PORT = process.env.PORT || 8080;
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    }catch (e){
        console.error('Error starting server: ', e);
    }
};

startServer();