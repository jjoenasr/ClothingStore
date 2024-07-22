import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { Item, Product } from '../../typings'

interface Action {
  type: string;
  payload?: any;
}

interface State {
  cart: Item[];
  favorites: Product[];
  isAuthenticated: boolean;
  token: string;
  isLoading: boolean;
}

// Define initial state
const initialState:State = {
  cart: [],
  favorites: [],
  isAuthenticated: false,
  token: '',
  isLoading: false,
};

// Create a context
const ShopContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>,
  addToCart: (item: Item) => void;
  removeFromCart: (item: Item) => void;
  clearCart: () => void;
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (product: Product) => void;
  setLoading: (status: boolean) => void;
  setToken: (token: string) => void;
  removeToken: () => void;
  updateCart: () => void;
  favoritesTotal: () => number;
  cartTotalItems: () => number;
  cartTotalPrice: () => number; }
  | undefined>(undefined);

// Actions
const ACTIONS = {
  UPDATE_STORE: 'updateStore',
  ADD_TO_CART: 'addToCart',
  REMOVE_FROM_CART: 'removeFromCart',
  CLEAR_CART: 'clearCart',
  ADD_TO_FAVORITES: 'addToFavorites',
  REMOVE_FROM_FAVORITES: 'removeFromFavorites',
  SET_IS_LOADING: 'setIsLoading',
  SET_TOKEN: 'setToken',
  REMOVE_TOKEN: 'removeToken',
};

// Create a reducer function
const reducer = (state:State, action: any) => {
  switch (action.type) {
    case ACTIONS.UPDATE_STORE:
      const storedCartString = localStorage.getItem('cart');
      const storedCart = storedCartString ? JSON.parse(storedCartString) : initialState.cart;
      const storedFavoritesString = localStorage.getItem('favorites');
      const storedFavorites = storedFavoritesString ? JSON.parse(storedFavoritesString) : initialState.favorites;
      const storedToken = localStorage.getItem('token') || initialState.token;
      const storedIsAuthenticated = !!storedToken;
      return {
        ...state,
        cart: storedCart,
        token: storedToken,
        isAuthenticated: storedIsAuthenticated,
        isLoading: false,
        favorites: storedFavorites
      };

    case ACTIONS.ADD_TO_CART:
      // ... logic for addToCart mutation
      const itemToAdd = action.payload.item;
      const itemIndex = state.cart.length > 0
      ? state.cart.findIndex(i => i.product.id === itemToAdd.product.id)
      : -1;

      let updatedItems;
      if (itemIndex !== -1) {
        // Item already exists in the cart, update the quantity
        updatedItems = state.cart.map((item, index) =>
          index === itemIndex
            ? { ...item, quantity: item.quantity + itemToAdd.quantity }
            : item
        );
      } else {
        // Item doesn't exist in the cart, add it
        updatedItems = [...state.cart, itemToAdd];
      }


      // Update local storage
      localStorage.setItem('cart', JSON.stringify(updatedItems));

      return {
        ...state,
        cart: updatedItems,
      };

    case ACTIONS.REMOVE_FROM_CART:
      const newCart = state.cart.filter(item => item.product.id !== action.payload.item.product.id);

      // Update local storage
      localStorage.setItem('cart', JSON.stringify(newCart));

      return {
        ...state,
        cart: newCart,
      };

      case ACTIONS.CLEAR_CART:
        let emptyCart:Product[] = []
        localStorage.setItem('cart', JSON.stringify(emptyCart))
        return {
          ...state,
          cart: emptyCart
        };
    
      case ACTIONS.ADD_TO_FAVORITES:
        // ... logic for addToCart mutation
        const productToAdd = action.payload.product;
        updatedItems = [...state.favorites, productToAdd];
  
  
        // Update local storage
        localStorage.setItem('favorites', JSON.stringify(updatedItems));
  
        return {
          ...state,
          favorites: updatedItems,
        };
  
      case ACTIONS.REMOVE_FROM_FAVORITES:
        const newFavorites = state.favorites.filter(product => product.id !== action.payload.product.id);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
  
        return {
          ...state,
          favorites: newFavorites,
        };
    
    case ACTIONS.SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload.status
      };

    case ACTIONS.SET_TOKEN:
      localStorage.setItem("token", action.payload.token)
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true
      };

    case ACTIONS.REMOVE_TOKEN:
      localStorage.removeItem("token")
      return {
        ...state,
        token: '',
        isAuthenticated: false
      };

    default:
      return state;
  }
};

// Create a provider component
export const ShopContextProvider: React.FC<{ children: React.ReactNode }> = ({ children} ) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [cart, setCart] = useState<Item[]>([]);

  const addToCart = (item:Item) => {
      setTimeout(() => {
        dispatch({ type: ACTIONS.ADD_TO_CART, payload:{'item': item} });
      }, 700);
  };

  const removeFromCart = (item:Item) => {
      setTimeout(() => {
        dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload:{'item': item} });
      }, 700);
  };

  const addToFavorites = (product:Product) => {
    setTimeout(() => {
      dispatch({ type: ACTIONS.ADD_TO_FAVORITES, payload:{'product': product} });
    }, 700);
  };

  const removeFromFavorites = (product:Product) => {
      setTimeout(() => {
        dispatch({ type: ACTIONS.REMOVE_FROM_FAVORITES, payload:{'product': product}});
      }, 700);
  };

  const favoritesTotal = () => {
    return state.favorites.length
  };

  const setLoading = (status:boolean) => {
      dispatch({ type: ACTIONS.SET_IS_LOADING, payload: {'status': status} })
  }

  const setToken = (token:string) => {
      dispatch({ type: ACTIONS.SET_TOKEN, payload: {'token': token }})
  }

  const removeToken = () => {
      dispatch({ type: ACTIONS.REMOVE_TOKEN})
  }

  const clearCart = () => {
      dispatch({ type: ACTIONS.CLEAR_CART})
  }

  const cartTotalItems = () => {
    return state.cart.reduce((acc:number, curVal:Item) => {
      return acc += curVal.quantity
    }, 0)
  }

  const cartTotalPrice = () => {
    return state.cart.reduce((acc:number, curVal:Item) => {
      return acc += curVal.product.current_price * curVal.quantity
    }, 0)
  }

  const updateCart = () => {
    dispatch({ type: ACTIONS.UPDATE_STORE, });
  }

  useEffect(() => {
      updateCart()
    }, []);

  /*
  useEffect(() => {
    localStorage.setItem('cart',JSON.stringify(state.cart))
  }, [state.cart]);
  */

  return(
    <ShopContext.Provider value={{
      state: {
        cart: state.cart,
        favorites: state.favorites,
        isAuthenticated: state.isAuthenticated,
        token: state.token,
        isLoading: state.isLoading,
      },
      dispatch: dispatch,
      addToCart: addToCart,
      removeFromCart: removeFromCart,
      updateCart: updateCart,
      cartTotalItems: cartTotalItems,
      cartTotalPrice: cartTotalPrice,
      setLoading: setLoading,
      setToken: setToken,
      removeToken: removeToken,
      clearCart: clearCart,
      addToFavorites: addToFavorites,
      removeFromFavorites: removeFromFavorites,
      favoritesTotal: favoritesTotal,
    }}>
      {children}
    </ShopContext.Provider>
  )
}

// Create a custom hook to access the context
export const useStore = () => {
  const context = useContext(ShopContext);
  if(!context){
    throw new Error('StoreContext must be used inside the StoreProvider')
  }
  return context;
};
