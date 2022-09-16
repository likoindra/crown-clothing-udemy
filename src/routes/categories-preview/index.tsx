import React, { Fragment } from "react";
import { useSelector } from "react-redux";
// import ProductCard from "../../components/product-card";
// import SHOP_DATA from '../../shop-data.json';
// import { CategoriesContext } from "../../contexts/categoriesContext";
import CategoryPreview from "../../components/category-preview";
import Spinner from "../../components/spinner";
import { selectCategoriesIsLoading, selectCategoriesMap } from "../../store/categories/category.selector";
// 26 Juni
// Mengganti render SHOP_DATA menggunakan data dari ProdcutsContext dari useContext

const CategoriesPreview = () => {
  // const { categoriesMap } = useContext(CategoriesContext);
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        Object.keys(categoriesMap).map((title) => {
          const products = categoriesMap[title];
          return (
            <CategoryPreview title={title} products={products} key={title} />
          );
        })
      )}
    </Fragment>
  );
};

export default CategoriesPreview;
