import mongoose from "mongoose";
import dotenv from 'dotenv';    // dotenv para poder leer archivos .env

// FUNCION PARA CONECTAR A LA BD
export const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected to ${conn.connection.host}`)
    }catch(e){
        console.error(e.message);
        process.exit(1); // Salir con error
    }
}