import {create} from 'zustand'; // Usamos zustand para que las funciones dentro de este archivo js puedan ser importadas desde cualquier componente jsx.

// Cualquier componente de React puede usar useProductStore() para acceder a los productos o modificar el estado.
export const useProductStore = create((set)=>({
    
    products: [],   // Estado inicial del store

    //  Debajo van las funciones para actualizar el estado de la store (product)
    setProducts: (products) => set({products}),

    createProduct: async (newProduct)=>{
        // Validacion de campos
        if(!newProduct.name || !newProduct.price || !newProduct.image){
            return {success:false, message:'Please fill all the fields'}
        }
        // Enviar producto a la BD mediante metodo POST
        const res = await fetch("https://mern-ecommerce-project-i8vz.onrender.com/api/products",{  // res guarda la respuesta de la solicitud HTTP
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Le especifica al servidor que los datos son formato JSON
            },
            body: JSON.stringify(newProduct),   // Convierte newProduct a formato JSON
        });
        const data = await res.json();  // La respuesta del servidor contiene el producto en formato JSON
        set((state) =>({products: [...state.products, data.data]}));
        return {success: true, message:'Product created successfully'};
    },

    fetchProducts: async() => {
        const res = await fetch("https://mern-ecommerce-project-i8vz.onrender.com/api/products");  // Peticion GET por default
        const data = await res.json();  // Convierte la response en JSON y se guarda en 'data'
        set({products: data.data});
    },

    deleteProduct: async(pid) => {
        const res = await fetch("https://mern-ecommerce-project-i8vz.onrender.com/api/products/" + pid, {
            method: 'DELETE',
        });
        const data = await res.json();
        if(!data.success) return {success: false, message:data.message};

        // ACTUALIZA UI
        set((state)=>({products: state.products.filter((product) => product._id !== pid)}));    // 'state.products.filter' Crea un nuevo array excluyendo la id coincidente
        return {success: true, message:data.message};
    },

    updateProduct: async (pid, updatedProduct) =>{
        const res = await fetch("https://mern-ecommerce-project-i8vz.onrender.com/api/products/" + pid, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProduct),
        });
        const data = await res.json();
        if (!data.success) return {success: false, message: 'Could not update product'};
        set(state => ({
            products: state.products.map((product) => (product._id === pid ? data.data : product)), // Itera hasta encontrar id coincidente, entonces reemplaza ese producto con 'data.data'
        }));
        return {success: true, message:'Product updated successfully'};
    },

}));