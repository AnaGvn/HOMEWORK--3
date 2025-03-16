import React from 'react';
import './style.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './pages/Home';
import { Cart } from './pages/Cart';
import { Products } from './pages/Products';
import { Product } from './pages/Product';
// Importam noua pagina.
import { Favorites } from './pages/Favorites';
import { Header } from './components/Header';
import { useReducer } from 'react';
import { initialState, cartReducer } from './store/Cart/reducer';
import { CartContext } from './store/Cart/context';
import {
  initialState as themeInitialState,
  themeReducer,
} from './store/Theme/reducer';
import { ThemeContext } from './store/Theme/context';
// Importam datele legate de favorite.
import {
  initialState as favoritesInitialState,
  favoritesReducer,
} from './store/Favorites/reducer';
import { FavoritesContext } from './store/Favorites/context';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />
        <Home />
      </>
    ),
  },
  {
    path: '/products',
    element: (
      <>
        <Header />
        <Products />
      </>
    ),
  },
  {
    path: '/product/:id',
    element: (
      <>
        <Header />
        <Product />
      </>
    ),
  },
  {
    path: '/cart',
    element: (
      <>
        <Header />
        <Cart />
      </>
    ),
  },
  // Adaugam noua ruta
  {
    path: '/favorites',
    element: (
      <>
        <Header />
        <Favorites />
      </>
    ),
  },
]);

export default function App() {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [themeState, themeDispatch] = useReducer(
    themeReducer,
    themeInitialState
  );
  // Initializam reducerul pentru favorite.
  const [favoritesState, favoritesDispatch] = useReducer(
    favoritesReducer,
    favoritesInitialState
  );
  const cartContextValue = {
    state,
    dispatch,
  };
  const themeContextValue = {
    themeState,
    themeDispatch,
  };
  // Cream obiectul pasat ca valoare contextului asociat favoritelor.
  const favoritesContextValue = {
    favoritesState,
    favoritesDispatch,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      <ThemeContext.Provider value={themeContextValue}>
        {/* Initializam contextul asociat favoritelor. */}
        <FavoritesContext.Provider value={favoritesContextValue}>
          <div className="App primary">
            <RouterProvider router={router} />
          </div>
        </FavoritesContext.Provider>
      </ThemeContext.Provider>
    </CartContext.Provider>
  );
}
