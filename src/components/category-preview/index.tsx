import React, { FC } from "react";
import { CategoryItem } from "../../store/categories/category.types";
import ProductCard from "../product-card";
// import { Link } from "react-router-dom";
import { Preview, Title , CategoryPreviewContainer} from "./category-preview.styles";

// Category Types 
type CategoryPreviewProps = {
  title: string;
  products: CategoryItem[];
}

const CategoryPreview: FC<CategoryPreviewProps> = ({ title, products }) => {
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
