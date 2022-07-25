import React, { Fragment, useContext } from "react";
// import ProductCard from "../../components/product-card";
// import SHOP_DATA from '../../shop-data.json';
import { CategoriesContext } from "../../contexts/categoriesContext";
import CategoryPreview from "../../components/category-preview";
// 26 Juni
// Mengganti render SHOP_DATA menggunakan data dari ProdcutsContext dari useContext

const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext);
  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return <CategoryPreview title={title} products={products} />;
      })}
    </Fragment>
  );
};

export default CategoriesPreview;
