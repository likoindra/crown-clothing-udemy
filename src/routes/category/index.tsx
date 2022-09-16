import React, { Fragment, useEffect, useState } from "react";
// import { CategoriesContext } from "../../contexts/categoriesContext";
import { useParams } from "react-router";
import ProductCard from "../../components/product-card";
import { useSelector } from "react-redux";
import { selectCategoriesIsLoading, selectCategoriesMap } from "../../store/categories/category.selector";
import { CategoryContainer, Title } from "./category.styles";
import Spinner from "../../components/spinner";

// Expecting typescript to return a value while using useParams();
type CategoryRouteParams = {
  category : string;
}

const Category = () => {
  // tell typescript to return just only the key from `CategoryRouteParams` 
  // making it as `CategoryRouteParams`, to make `category` always presents 
  const { category } = useParams<keyof CategoryRouteParams>() as CategoryRouteParams;
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
