import { createContext, useState } from "react";

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {}, // memberikan aksi function pada toggle cart
});

// Provider dari CartContext
export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const value = { isCartOpen, setIsCartOpen };

  // setelah inisialisasi provider , mengisi parameter dengan `chidlren` yang akan di render pada CartProvider
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
