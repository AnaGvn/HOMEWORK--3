import React from 'react';
import { useEffect, useState, useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { CartContext } from '../store/Cart/context';
import { addToCart } from '../store/Cart/actions';
import { ThemeContext } from '../store/Theme/context';
import { setLightTheme, setDarkTheme } from '../store/Theme/actions';
// Importam ce avem nevoie.
import { FavoritesContext } from '../store/Favorites/context';
import { addToFavorites } from '../store/Favorites/actions';

export function Home() {
  const { dispatch } = useContext(CartContext);
  const { themeState, themeDispatch } = useContext(ThemeContext);
  // Vom adauga un produs la favorite, deci avem nevoie de dispatch-ul asociat favoritelor.
  const { favoritesDispatch } = useContext(FavoritesContext);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('https://www.cheapshark.com/api/1.0/deals?pageSize=4')
      .then((response) => response.json())
      .then((products) => {
        setProducts(products);
      });
  }, []);

  const theme = themeState.theme;

  function handleThemeChange() {
    let actionResult;
    if (theme === 'light') {
      actionResult = setDarkTheme();
      themeDispatch(actionResult);
    } else if (theme === 'dark') {
      actionResult = setLightTheme();
      themeDispatch(actionResult);
    }
  }

  function handleAddToCart(product) {
    const actionResult = addToCart(product);
    dispatch(actionResult);
  }

  function handleAddToFavorites(product) {
    // Apelam actiunea de adaugare la favorite, cu payload-ul aferent.
    const actionResult = addToFavorites(product);
    // Trimitem rezultatul actiunii catre reducer.
    favoritesDispatch(actionResult);
  }

  return (
    <div className={theme === 'light' ? 'bg-white' : 'bg-dark'}>
      <div className="d-flex flex-column align-items-center">
        <Button
          variant="outline-primary"
          className="mt-3"
          onClick={handleThemeChange}
        >
          Change theme
        </Button>
        {products.map((product) => {
          return (
            <Card
              key={product.dealID}
              style={{ width: '18rem' }}
              className="m-3"
            >
              <Link
                to={`/product/${encodeURI(product.dealID)}`}
                className="text-dark"
              >
                <Card.Img variant="top" src={product.thumb} />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text className="text-danger">
                    {product.salePrice} $
                  </Card.Text>
                </Card.Body>
              </Link>
              <Button
                variant="success"
                onClick={() => {
                  handleAddToCart({
                    id: product.dealID,
                    image: product.thumb,
                    name: product.title,
                    price: product.salePrice,
                  });
                }}
              >
                Adaugă în coș
              </Button>
              <Button
                variant="outline-success"
                onClick={() => {
                  // Contruim payload-ul si il pasam ca argument functiei care va declansa actiunea de adaugare la favorite.
                  handleAddToFavorites({
                    id: product.dealID,
                    image: product.thumb,
                    name: product.title,
                    price: product.salePrice,
                  });
                }}
              >
                Adaugă la favorite
              </Button>
            </Card>
          );
        })}
      </div>
      <Link to="/products">Vezi toate produsele</Link>
    </div>
  );
}
