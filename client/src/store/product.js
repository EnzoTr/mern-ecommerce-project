import {create} from 'zustand';

export const useProductStore = create((set)=>({
    products: [],
    setProducts: (products) => set({products}),
    createProduct: async (newProduct)=>{
        // Validacion de campos
        if(!newProduct.name || !newProduct.price || !newProduct.image){
            return {success:false, message:'Please fill all the fields'}
        }
        // Enviar producto a la BD mediante metodo POST
        const res = await fetch("http://localhost:5000/api/products",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
        });
        const data = await res.json();
        set((state) =>({products: [...state.products, data.data]}));
        return {success: true, message:'Product created successfully'};
    },
    fetchProducts: async() => {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        set({products: data.data});
    },
}));