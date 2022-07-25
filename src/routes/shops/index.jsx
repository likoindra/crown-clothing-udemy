import { Routes, Route } from "react-router-dom";
import CategoriesPreview from "../categories-preview";
import Category from "../category";
// import ProductCard from "../../components/product-card";
// import SHOP_DATA from '../../shop-data.json';
// import { CategoriesContext } from "../../contexts/categoriesContext";
// import CategoryPreview from "../../components/category-preview";
import "./shops.styles.scss";
// 26 Juni
// Mengganti render SHOP_DATA menggunakan data dari ProdcutsContext dari useContext

const ShopComponent = () => {
  // const { categoriesMap } = useContext(CategoriesContext);
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
