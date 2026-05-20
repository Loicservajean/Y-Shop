const urlAPI = 'http://localhost:3000'

let tousLesProduits = []

// Charger tous les produits au démarrage
function chargerProduits() {
  fetch(urlAPI + '/products')
    .then(response => response.json())
    .then(data => {
      tousLesProduits = data
      afficherProduits(tousLesProduits)
    })
    .catch(error => console.error('Erreur : ', error))
}

// Afficher les produits dans le catalogue
function afficherProduits(produits) {
  const catalogue = document.getElementById('catalogue')
  catalogue.innerHTML = ''

  produits.forEach(produit => {
    const card = document.createElement('div')
    card.classList.add('product-card')
    card.innerHTML = `
      <img src="http://localhost:3000/${produit.images[0]}" alt="${produit.nom}"
        onmouseover="this.src='http://localhost:3000/${produit.images[1] || produit.images[0]}'"
        onmouseout="this.src='http://localhost:3000/${produit.images[0]}'">
      <div class="info">
        <h3>${produit.nom}</h3>
        <p class="prix">${produit.prix} ${produit.devise}</p>
      </div>
    `
    card.addEventListener('click', () => {
      window.location.href = `/produit?id=${produit.id}`
    })
    catalogue.appendChild(card)
  })
}

// Filtrer les produits
function filtrerProduits() {
  const categorie = document.getElementById('filtreCategorie').value
  const origine = document.getElementById('filtreOrigine').value
  const tri = document.getElementById('tri').value

  let resultat = [...tousLesProduits]

  // Filtre catégorie
  if (categorie) {
    resultat = resultat.filter(p => p.type === categorie)
  }

  // Filtre origine
  if (origine) {
    resultat = resultat.filter(p => p.origine === origine)
  }

  // Tri
  if (tri === 'prixAsc') resultat.sort((a, b) => a.prix - b.prix)
  if (tri === 'prixDesc') resultat.sort((a, b) => b.prix - a.prix)
  if (tri === 'nom') resultat.sort((a, b) => a.nom.localeCompare(b.nom))

  afficherProduits(resultat)
}

document.getElementById('filtreCategorie').addEventListener('change', filtrerProduits)
document.getElementById('filtreOrigine').addEventListener('change', filtrerProduits)
document.getElementById('tri').addEventListener('change', filtrerProduits)

chargerProduits()
