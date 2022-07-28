import { createContext,  useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

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

// REMOVE CART ITEM 
// disini butuh 2 parameter pada function ini, cartItems dan cartItemToRemove 

const removeCartItem = (cartItems,cartItemToRemove) => {
  // step 1 : mencari item/product yang akan di remove 
  const existingCartItem = cartItems.find((cartItem) => 
  // jika id cartItems dan cartItemToRemove sama 
  cartItem.id === cartItemToRemove.id
  );

  // step 2 : jika jumlahnya sama dengan 1 , remove item pada cart 
  if(existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
  }

  // step 3 : jika tidak  ( jumlahnya tidak sama dengan 1 ), 
  // return item/product dengan jumlah yang sudah dikurangi 
  return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id ? 
  // spread cartItem karena jika ada product yang sama akan selalu menampilkan product tersebut 
  // jika kondisi true maka akan mengurangi quantity - 1 
  // atau hanya akan return product yang ada dengan quantity yang sama / memunculkan quantity sebelumnya tanpa dikurangi 1
  { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
  )
} 

// CLEAR CART ITEM AT CHECKOUT PAGE 
const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);
}



export const CartContext = createContext({
  isCartOpen: false,

  setIsCartOpen: () => {}, // memberikan aksi function pada toggle cart

  cartItems: [], // menampung data pada array

  // function untuk menambah product ke dalam cart
  addItemToCart: () => {},

  // function untuk remove product dalam cart 
  removeItemFromCart: () => {},

  // function untuk clear item dari cart pada page checkout 
  clearItemFromCart: () => {},

  // kalkulasi quantity
  // pada default cart akan 0 
  cartCount: 0,

  // Total from cart item/product 
  cartTotal: 0
});

// 
const CART_ACTION_TYPES = {
  SET_CART_ITEM : "SET_CART_ITEM",
  SET_IS_CART_OPEN : "SET_IS_CART_OPEN",
  SET_CART_COUNT :'SET_CART_COUNT',
  SET_CART_TOTAL:  'SET_CART_TOTAL'
}

// make initial value that readeable 
const INITIAL_STATE = {
  isCartOpen : false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0
}

const cartReducer = (state, action) => {
  const { type , payload } = action;

  switch(type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS : 
    return {
      ...state,
      ...payload
    }
    case CART_ACTION_TYPES.SET_IS_CART_OPEN : 
    return {
      ...state,
      isCartOpen: payload
    }
    default: 
    throw new Error(`Unhandled type of ${type} in cartReducer`)
  }
}

// Provider dari CartContext
export const CartProvider = ({ children }) => {
  // const [isCartOpen, setIsCartOpen] = useState(false);
  // const [cartItems, setCartItems] = useState([]);
  // const [cartCount, setCartCount] = useState(0);
  // const [cartTotal, setCartTotal] = useState(0);

  // useEffect(() => {
    // .reduce mengembalikan 2 parameter 
    // disini akan mengkalkulasi total dengan cartItem yang ada 
    // const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
    // setCartCount(newCartCount)
    // akan meng-kalkulasi kembali jika pada state cartItems ada perubahan 
  // },[cartItems])


  // USE EFFECT UNTUK MENDAPATKAN TOTAL PADA CHEKOUT PAGE
  // useEffect(() => {
    // .reduce mengembalikan 2 parameter 
    // disini akan mengkalkulasi total dengan cartItem yang ada dan di tambah dengan harga dari item/product yang dipilih
    // const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
    // setCartTotal(newCartTotal)
 // akan meng-kalkulasi kembali jika pada state cartItems ada perubahan 
  // },[cartItems])

  // megganti set state dan use effect dengan useReducer hook
  const [{ cartItems, isCartOpen, cartTotal , cartCount}, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemsReducer = (newCartItems) => {
    // mendapatkan value `newItems` pada function helpers dibawah , 

    // get cartCount 
    const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)

    // get cartTotal 
    const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
    
    // dispatch useReducer function 
    dispatch(
      // function createAction , recieve type and payload
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {cartItems: newCartItems, cartTotal: newCartTotal, cartCount: newCartCount})
    // {type: CART_ACTION_TYPES.SET_CART_ITEMS, 
    // payload: {cartItems: newCartItems, cartTotal: newCartTotal, cartCount: newCartCount}}
    )
  }

  // function yang akan trigger apabila user menekan tombol `add to cart` pada Product dan akan masuk dalam cart
  // parameter akan berisi product yang akan di add
  const addItemToCart = (productToAdd) => {
    // di dalam ini akan meng-update array cartItems dengan product yang di tambahkan
    // memanggil function addCartItems
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems)
  };

  // function yang akan trigger apabila user menekan tombol `decrement` pada page checkout
  const removeItemFromCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems)

  };

  // function yang akan trigger apabila user menekan tombol X pada checkout page
  const clearItemFromCart = (cartItemToClear) => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear);
  updateCartItemsReducer(newCartItems)
  };

  // this function will recieve boolean type 
  const setIsCartOpen = (bool) => {
    dispatch(
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)
    // {type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: bool}
    )
  }

  // cartCount sudah terupdate pada `newCartCount` pada useEffect()
  const value = { isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart, cartItems, cartCount, cartTotal };

  // setelah inisialisasi provider , mengisi parameter dengan `chidlren` yang akan di render pada CartProvider
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
