import { FC } from "react";
import ButtonComponent, { BUTTON_TYPE_CLASSES } from "../button";
import { ProductCartContainer, Footer, Name, Price } from  './product-card.styles'
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
import { CategoryItem } from "../../store/categories/category.types";
// import { CartContext } from "../../contexts/cartContext";

export type ProductCardProps = {
  product: CategoryItem;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  // de-structure key dari product, pilih mana yang di butuhkan untuk ditampilkan pada component ini
  const { name, price, imageUrl } = product;
 
  const cartItems = useSelector(selectCartItems)

  // memanggil function dari CartContext yang akan di gunakan pada button 
  // const { addItemToCart } = useContext(CartContext); 
  const addProductToCart = () => dispatch(addItemToCart(cartItems, product))

  // console.log(cartItems, 'product card')
  return (
    <ProductCartContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name className="name">{name}</Name>
        <Price className="price">{price}</Price>
      </Footer>
      <ButtonComponent buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add To Cart</ButtonComponent>
    </ProductCartContainer> 
  );
};

export default ProductCard;
