import React, { Fragment, useContext, useEffect, useState } from "react";
import { CategoriesContext } from "../../contexts/categoriesContext";
import "./category.styles.scss";
import { useParams } from "react-router";
import ProductCard from "../../components/product-card";

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  //   const products =  categoriesMap[category]
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      <div className="category-container">
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </Fragment>
  );
};

export default Category;
