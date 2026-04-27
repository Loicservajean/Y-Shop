const urlAPI = 'http://localhost:3000'

// Charger le panier
function chargerPanier() {
  fetch(urlAPI + '/panier')
    .then(response => response.json())
    .then(panier => {
      if (panier.length === 0) {
        document.getElementById('panier-liste').innerHTML = '<p>Votre panier est vide</p>'
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
          <div>
            <p>${produit.nom} x${item.quantite} - ${produit.prix * item.quantite} €</p>
            <button onclick="supprimerDuPanier(${item.productId})">Supprimer</button>
          </div>
        `
        document.getElementById('total').textContent = total.toFixed(2) + ' €'
      })
  })
}

// Supprimer du panier
function supprimerDuPanier(id) {
  fetch(urlAPI + '/panier/' + id, { method: 'DELETE' })
    .then(response => response.json())
    .then(() => chargerPanier())
    .catch(error => console.error('Erreur : ', error))
}

chargerPanier()
