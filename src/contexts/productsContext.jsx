import { createContext, useState } from "react";

import PRODUCTS from '../shop-data.json';

export const ProductsContext = createContext({
    // value products akan di tampung pada arran
    products : [],
    // function untuk set products 
});

// render children, karena Context akan membungkus App.js yang dimana Context akan mengembalikan data pada child

export const ProductsProvider = ({ children }) => {
    // PRODUCTS di state mengambil data shop-data.json
    const [products, setProducts] = useState(PRODUCTS);
    const  value  = {products};
    return(
        <ProductsContext.Provider value={ value }>{ children }</ProductsContext.Provider>
    )
}