import { createContext, ReactNode, useContext, useState } from "react";
import { useLocalStorage } from "../../../app/hooks";
import ShoppingCart from "../ShoppingCart";
import { ProductType } from "../../../features/products/productSlice";

type ShoppingCartProviderProps = {
  children: ReactNode;
};
type CartItem = {
  product: ProductType;
  quantity: number;
};

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (product: ProductType) => number;
  incrementCartQuantity: (product: ProductType) => void;
  decrementCartQuantity: (product: ProductType) => void;
  removeFromCart: (product: ProductType) => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );
  const [isOpen, setIsOpen] = useState(false);

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const openCart = () => setIsOpen(true);

  const closeCart = () => setIsOpen(false);

  function getItemQuantity(product: ProductType) {
    return cartItems.find((item) => item.product.id === product.id)?.quantity || 0;
  }

  function incrementCartQuantity(product: ProductType){
    setCartItems((currentItem) => {
      if (currentItem.find((item) => item.product.id === product.id) == null) {
        return [...currentItem, { product, quantity: 1 }];
      } else {
        return currentItem.map((item) => {
          if (item.product.id === product.id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function decrementCartQuantity(product: ProductType) {
    setCartItems((currentItem) => {
      if (currentItem.find((item) => item.product.id === product.id)?.quantity === 1) {
        return currentItem.filter((item) => item.product.id !== product.id);
      } else {
        return currentItem.map((item) => {
          if (item.product.id === product.id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function removeFromCart(product: ProductType) {
    setCartItems((currentItem) => {
      return currentItem.filter((item) => item.product.id !== product.id);
    });
  }
  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        incrementCartQuantity,
        decrementCartQuantity,
        openCart,
        closeCart,
        removeFromCart,
        cartQuantity,
        cartItems,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
