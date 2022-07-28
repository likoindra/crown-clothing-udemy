import { createContext, useEffect, useState } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase-utils";
// import { addCollectionAndDocuments } from "../utils/firebase/firebase-utils.js";
// import PRODUCTS from '../shop-data.json';
// import SHOP_DATA from '../shop-data.js';

export const CategoriesContext = createContext({
    // value products akan di tampung pada arran
    categoriesMap : {},
    // function untuk set products 
});

// render children, karena Context akan membungkus App.js yang dimana Context akan mengembalikan data pada child

export const CategoriesProvider = ({ children }) => {
    // PRODUCTS di state mengambil data shop-data.json
    // const [products, setProducts] = useState(PRODUCTS);

    // state pada product akan tertampung pada array setelah mengganti data pada shop-data.js
    const [categoriesMap, setCategoriesMap] = useState({});

    // memanggil function `addCollectionAndDocuments` yang hanya akan ter-render 1x
    // ** FUNCTION INI HANYA UNTUK MEMBUAT DATA PADA FIRESTORE JADI HANYA AKAN DIGUNAKAN 1 X SETELAH DATABASE PRODUCT TERBUAT
    // useEffect(() => {
        // memeberikan 2 parameter pada function ini untuk  diterima pada function firebase 
        // 2 param ini yaitu : collectionKey : { categories } , objetsToAdd  : { SHOP_DATA}
        // addCollectionAndDocuments("categories", SHOP_DATA)
    // },[])


    // mengambil data dari firestore menggunakan function getCategoriesAndDocuments 
    //  gunakan async await di dalam useEffect, tidak dengan `useEffect( async () => {},[])`
    useEffect(() => {
        // panggil async await di dalam useEffect 
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            // console.log(categoryMap)
            setCategoriesMap(categoryMap)
        }
        
        getCategoriesMap();
    },[])

    const  value  = {categoriesMap};
    return(
        <CategoriesContext.Provider value={ value }>{ children }</CategoriesContext.Provider>
    )
}