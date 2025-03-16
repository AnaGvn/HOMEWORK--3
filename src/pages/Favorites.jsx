
import React from 'react';
// Importam ce avem nevoie.
import { useContext } from 'react';
import { FavoritesContext } from '../store/Favorites/context';
import Button from 'react-bootstrap/Button';
import { removeFromFavorites } from '../store/Favorites/actions';

export function Favorites() {
  // Extragem state-ul pentru favorite, precum si functia care modifica state-ul.
  const { favoritesState, favoritesDispatch } = useContext(FavoritesContext);

  function handleRemoveProduct(productId) {
    // Apelam actiunea de stergere de la favorite, cu payload-ul aferent.
    const actionResult = removeFromFavorites(productId);
    // Trimitem rezultatul actiunii catre reducer.
    favoritesDispatch(actionResult);
  }

  return (
    <div>
      {/* Afisam produsele favorite pe ecran. */}
      {favoritesState.products.length === 0 ? (
        <p>Nu ai produse favorite.</p>
      ) : (
        favoritesState.products.map((product) => {
          return (
            <div key={product.id} className="my-3">
              <img src={product.image} alt="" />
              <h2>{product.name}</h2>
              <div>
                <strong>{product.price}$</strong>
              </div>
              <Button
                variant="danger"
                // Apelam functia ce va declansa actiunea de stergere a produsului, cu payload-ul aferent.
                onClick={() => handleRemoveProduct(product.id)}
              >
                Șterge de la favorite
              </Button>
            </div>
          );
        })
      )}
    </div>
  );
}
