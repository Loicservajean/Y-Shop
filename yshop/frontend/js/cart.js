const urlAPI = 'http://localhost:3000'

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

        total += produit.prix * item.quantite

        div.innerHTML += `
          <div class="panier-item">
            <img src="http://localhost:3000/${produit.images[0]}" alt="${produit.nom}">
            
            <div class="info">
              <h3>${produit.nom}</h3>
              <p>Quantité : ${item.quantite}</p>
              <p>${(produit.prix * item.quantite).toFixed(2)} €</p>
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
