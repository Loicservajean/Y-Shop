const urlAPI = 'http://localhost:3000'

// Meme table que dans product.js
const MULTIPLICATEURS = {
  'Édition Standard':       1.0,
  'Édition Collector':      1.5,
  'Édition Limitée signée': 2.0,
  'Bootleg':                0.5,
  'Édition Anniversaire':   1.4
}

// Charger le panier
function chargerPanier() {
  fetch(urlAPI + '/panier')
    .then(response => response.json())
    .then(panier => {
      if (panier.length === 0) {
        document.getElementById('panier-liste').innerHTML = '<p>Votre panier est vide</p>'
        document.getElementById('total').textContent = '0 €'
        return
      }
      afficherPanier(panier)
    })
    .catch(error => console.error('Erreur : ', error))
}

// Afficher le panier
function afficherPanier(panier) {
  const div = document.getElementById('panier-liste')
  div.innerHTML = ''
  let total = 0

  panier.forEach(item => {
    fetch(urlAPI + '/products/' + item.productId)
      .then(response => response.json())
      .then(produit => {

        const prixUnitaire = produit.prix * MULTIPLICATEURS[item.variante]
        total += prixUnitaire * item.quantite

        div.innerHTML += `
          <div class="panier-item">
            <img src="http://localhost:3000/${produit.images[0]}" alt="${produit.nom}">
            
            <div class="info">
              <h3>${produit.nom}</h3>
              <p>Variante : ${item.variante}</p>
              <p>Quantité : ${item.quantite}</p>
              <p>${(prixUnitaire * item.quantite).toFixed(2)} €</p>
            </div>

            <button onclick="supprimerDuPanier(${item.productId})">Supprimer</button>
          </div>
        `

        document.getElementById('total').textContent = total.toFixed(2) + ' €'
      })
  })
}

// Supprimer du panier
function supprimerDuPanier(productId) {
  fetch(urlAPI + '/panier/' + productId, {
    method: 'DELETE'
  })
  .then(() => chargerPanier())
}

chargerPanier()