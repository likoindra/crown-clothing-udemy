import React, { useContext } from "react";
import ProductCard from "../../components/product-card";
// import SHOP_DATA from '../../shop-data.json';
import { ProductsContext } from "../../contexts/productsContext";
import './shops.styles.scss';
// 26 Juni
// Mengganti render SHOP_DATA menggunakan data dari ProdcutsContext dari useContext

const ShopComponent = () => {
  const { products } = useContext(ProductsContext);
  return (
    <div className="products-container">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ShopComponent;
