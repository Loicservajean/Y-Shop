const urlAPI = 'http://localhost:3000'

// Charger les favoris
function chargerFavoris() {
  fetch(urlAPI + '/favoris')
    .then(response => response.json())
    .then(favoris => {
      if (favoris.length === 0) {
        document.getElementById('favoris-liste').innerHTML = '<p>Aucun favori</p>'
        return
      }
      afficherFavoris(favoris)
    })
    .catch(error => console.error('Erreur : ', error))
}

// Afficher les favoris
function afficherFavoris(favoris) {
  const div = document.getElementById('favoris-liste')
  div.innerHTML = ''

  favoris.forEach(id => {
    fetch(urlAPI + '/products/' + id)
      .then(response => response.json())
      .then(produit => {
        div.innerHTML += `
          <div>
            <p>${produit.nom} - ${produit.prix} €</p>
            <button onclick="supprimerFavori(${id})">Supprimer</button>
          </div>
        `
      })
  })
}

// Supprimer un favori
function supprimerFavori(id) {
  fetch(urlAPI + '/favoris/' + id, { method: 'DELETE' })
    .then(response => response.json())
    .then(() => chargerFavoris())
    .catch(error => console.error('Erreur : ', error))
}

chargerFavoris()
