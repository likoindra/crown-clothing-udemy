import React from "react";
import "./category-preview.styles.jsx";
import ProductCard from "../product-card";
// import { Link } from "react-router-dom";
import { Preview, Title , CategoryPreviewContainer} from "./category-preview.styles.jsx";

const CategoryPreview = ({ title, products }) => {
  return (
    <CategoryPreviewContainer>
      <h2>
        {/* make only the text for clickable */}
        <Title to={title}>{title.toUpperCase()}</Title>
      </h2>
      <Preview>
        {
          // keep the idx not greater than 4
          products
            .filter((_, idx) => idx < 4)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
        }
      </Preview>
    </CategoryPreviewContainer>
  );
};

export default CategoryPreview;
