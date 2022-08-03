import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
// import { getCategoriesAndDocuments } from "../../utils/firebase/firebase-utils";
import CategoriesPreview from "../categories-preview";
import Category from "../category";
// eslint-disable-next-line no-unused-vars
import { fetchCategoriesAsync, setCategories } from "../../store/categories/category.action";
import { useDispatch } from 'react-redux';
import "./shops.styles.scss";
// import { CategoriesProvider } from "../../contexts/categoriesContext";
// import ProductCard from "../../components/product-card";
// import SHOP_DATA from '../../shop-data.json';
// import { CategoriesContext } from "../../contexts/categoriesContext";
// import CategoryPreview from "../../components/category-preview";
// 26 Juni
// Mengganti render SHOP_DATA menggunakan data dari ProdcutsContext dari useContext

const ShopComponent = () => {
  // const { categoriesMap } = useContext(CategoriesContext);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCategoriesAsync())
    // const getCategoriesMap = async () => {
    // const categoriesArray = await getCategoriesAndDocuments('categories');
    // console.log(categoriesArray)
    //   dispatch(setCategories(categoriesArray))
    // }
    // getCategoriesMap();
  },[dispatch]) 

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />}/>
    </Routes>
    // <div className="shop-container">
    //   {
    //     Object.keys(categoriesMap).map((title) => {
    //       const products = categoriesMap[title];
    //       return <CategoryPreview title={title} products={products}/>
    //     })
    //   }
    //   {Object.keys(categoriesMap).map((title) => {
    //     const products = categoriesMap[title];
    //     <Fragment key={title}>
    //       <h2>{title}</h2>
    //       <div className="products-container">
    //         {categoriesMap[title].map((product) => (
    //           <ProductCard key={product.id} product={product} />
    //         ))}
    //       </div>
    //     </Fragment>
    //   })}
    // </div>
  );
};

export default ShopComponent;
