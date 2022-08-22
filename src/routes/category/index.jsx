import React, { Fragment, useEffect, useState } from "react";
// import { CategoriesContext } from "../../contexts/categoriesContext";
import "./category.styles.jsx";
import { useParams } from "react-router";
import ProductCard from "../../components/product-card";
import { useSelector } from "react-redux";
import {
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from "../../store/categories/category.selector";
import { CategoryContainer, Title } from "./category.styles.jsx";
import Spinner from "../../components/spinner/index.jsx";

const Category = () => {
  const { category } = useParams();
  // const { categoriesMap } = useContext(CategoriesContext);
  // console.log("render/rerendering category component");
  const categoriesMap = useSelector(selectCategoriesMap);
  //   const products =  categoriesMap[category]
  const [products, setProducts] = useState(categoriesMap[category]);

  // get Loading from `category selector`
  const isLoading = useSelector(selectCategoriesIsLoading);

  useEffect(() => {
    // console.log("effect fired calling setProducts");
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <Title>{category.toUpperCase()}</Title>
      {isLoading ? (
        <Spinner/>
      ) : (
        <CategoryContainer>
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </CategoryContainer>
      )}
    </Fragment>
  );
};

export default Category;
