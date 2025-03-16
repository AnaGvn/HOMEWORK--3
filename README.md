 Adaugă optiunea de Produse Favorite:
Creează un nou folder în folder-ul store, pe care îl vei numi Favorites. Folderul va conține 3 fișiere: actions.js, reducer.js și context.js.
Creează acțiunea pentru adăugarea la favorite. Creează și reducerul aferent, care modifică state-ul în funcție de tipul acțiunii.
În fișierul App.js inițializează noul context, făcând state-ul și dispatch-ul aferent disponibil în întreaga aplicație.
Adaugă câte un buton de adăugare la favorite în Home.jsx pentru fiecare produs. La click pe buton se va declanșa acțiunea de adăugare la favorite, care va fi trimisă către reducer. 
Creează o pagină nouă: Favorites.jsx. Afișează în această pagină produsele favorite din state. Dacă nu ai niciun produs, afișează un mesaj corespunzător.
Adauga in App.js o noua ruta pentru pagina /favorites
Adauga in componenta Header.jsx un nou link catre ruta /favorites


Pentru fiecare produs din lista de favorite, adaugă un buton de ștergere. Când este apăsat, declanșează acțiunea de ștergere din lista de favorite, care va fi trimisă către reducer.
Pentru asta trebuie sa adaugi a 2-a actiune pentru ștergerea de la favorite si sa modifici și reducerul aferent, care modifică state-ul bazat pe tipul acțiunii acestei a 2-a actiuni.
