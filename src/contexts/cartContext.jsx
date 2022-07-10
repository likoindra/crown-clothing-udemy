import { createContext, useState, useEffect } from "react";

// inisialisasi pada cart dropwdown : jika ada product yang sama , product akan bertambah jika tidak , akan add product baru pada cart dropdown
const addCartItem = (cartItems, productToAdd) => {
  // mencari apakah cartItems berisi product
  // cek terlebih dahulu item yang ada pada cart, lalu cocokan id cartItems dan productToAdd
  // const productInCart = cartItems.find((cartItem) => cartItems.id === productToAdd.id)

  const existingCartItem = cartItems.find((cartItem) => 
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
    return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? 
    // spread cartItem karena jika ada product yang sama akan selalu menampilkan product tersebut 
    // jika kondisi true maka akan menambah quantity + 1 
    // atau hanya akan return product yang ada dengan quantity yang sama / memunculkan quantity sebelumnya tanpa ditambah 1
    { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    ) 
  } 

  // step ke 3 
  // jika tidak, return array baru dengan product yang ditambahkan
  return [...cartItems, { ...productToAdd, quantity :  + 1}]
};

export const CartContext = createContext({
  isCartOpen: false,

  setIsCartOpen: () => {}, // memberikan aksi function pada toggle cart

  cartItems: [], // menampung data pada array

  // function untuk menambah product ke dalam cart
  addItemToCart: () => {},

  // kalkulasi quantity
  // pada default cart akan 0 
  cartCount: 0
});

// Provider dari CartContext
export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [cartItems, setCartItems] = useState([]);

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // .reduce mengembalikan 2 parameter 
    // disini akan mengkalkulasi total dengan cartItem yang ada 
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
    setCartCount(newCartCount)
  },[cartItems]) // akan meng-kalkulasi kembali jika pada state cartItems ada perubahan 

  // function yang akan trigger apabila user menekan tombol `add to cart` pada Product dan akan masuk dalam cart
  // parameter akan berisi product yang akan di add
  const addItemToCart = (productToAdd) => {
    // di dalam ini akan meng-update array cartItems dengan product yang di tambahkan
    // memanggil function addCartItems
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  // cartCount sudah terupdate pada `newCartCount` pada useEffect()
  const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount };

  // setelah inisialisasi provider , mengisi parameter dengan `chidlren` yang akan di render pada CartProvider
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
