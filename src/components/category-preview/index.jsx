import React from "react";
import "./category-preview.styles.scss";
import ProductCard from "../product-card";
import { Link } from "react-router-dom";

const CategoryPreview = ({ title, products }) => {
  return (
    <div className="category-preview-container">
      <h2>
        {/* make only the text for clickable */}
        <Link className="title" to={title}>{title.toUpperCase()}</Link>
      </h2>
      <div className="preview">
        {
          // keep the idx not greater than 4
          products
            .filter((_, idx) => idx < 4)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
        }
      </div>
    </div>
  );
};

export default CategoryPreview;
