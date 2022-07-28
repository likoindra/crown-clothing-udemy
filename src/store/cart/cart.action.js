import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";


const addCartItem = (cartItems, productToAdd) => {
  // mencari apakah cartItems berisi product
  // cek terlebih dahulu item yang ada pada cart, lalu cocokan id cartItems dan productToAdd
  // const productInCart = cartItems.find((cartItem) => cartItems.id === productToAdd.id)

  const existingCartItem = cartItems.find(
    (cartItem) =>
      // jika id cartItems dan productToAdd sama
      cartItem.id === productToAdd.id
  );

  // step ke 2
  // mengecek item yang ada dan menambahkan quantity pada product yang sudah ada tersebut
  // cocokan id cartItems dan productToAdd untuk mem-maintain quantity yang sudah ada

  // if(productinCart) {
  //   return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1} : cartItem)
  // }

  // jika ada tambah quantity nya
  if (existingCartItem) {
    // mengecek apakah id dari product sudah sama atau tidak
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? // spread cartItem karena jika ada product yang sama akan selalu menampilkan product tersebut
          // jika kondisi true maka akan menambah quantity + 1
          // atau hanya akan return product yang ada dengan quantity yang sama / memunculkan quantity sebelumnya tanpa ditambah 1
          { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  // step ke 3
  // jika tidak, return array baru dengan product yang ditambahkan
  return [...cartItems, { ...productToAdd, quantity: +1 }];
};

// REMOVE CART ITEM
// disini butuh 2 parameter pada function ini, cartItems dan cartItemToRemove

const removeCartItem = (cartItems, cartItemToRemove) => {
  // step 1 : mencari item/product yang akan di remove
  const existingCartItem = cartItems.find(
    (cartItem) =>
      // jika id cartItems dan cartItemToRemove sama
      cartItem.id === cartItemToRemove.id
  );

  // step 2 : jika jumlahnya sama dengan 1 , remove item pada cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  // step 3 : jika tidak  ( jumlahnya tidak sama dengan 1 ),
  // return item/product dengan jumlah yang sudah dikurangi
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? // spread cartItem karena jika ada product yang sama akan selalu menampilkan product tersebut
        // jika kondisi true maka akan mengurangi quantity - 1
        // atau hanya akan return product yang ada dengan quantity yang sama / memunculkan quantity sebelumnya tanpa dikurangi 1
        { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

// CLEAR CART ITEM AT CHECKOUT PAGE
const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);


// ACTION CREATOR FROM USING USECONTEXT TO REDUX

export const setIsCartOpen = (boolean) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

export const addItemToCart = (cartItems, productToAdd) => {
  // di dalam ini akan meng-update array cartItems dengan product yang di tambahkan
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

// function yang akan trigger apabila user menekan tombol `decrement` pada page checkout
export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

// function yang akan trigger apabila user menekan tombol X pada checkout page
export const clearItemFromCart = (cartItems, cartItemToClear) => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
