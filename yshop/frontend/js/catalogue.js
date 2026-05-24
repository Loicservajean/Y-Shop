const urlAPI = 'http://localhost:3000'

let tousLesProduits = []

// Charger tous les produits au démarrage
function chargerProduits() {
  fetch(urlAPI + '/products')
    .then(response => response.json())
    .then(data => {
      tousLesProduits = data
      restaurerFiltres()
      filtrerProduits()
      afficherProduitsRecents()
    })
    .catch(error => console.error('Erreur : ', error))
}

// Restaure les filtres choisis precedemment a partir du localStorage
function restaurerFiltres() {
  const filtres = getCache('filtres-catalogue')
  if (!filtres) return
  document.getElementById('filtreCategorie').value = filtres.categorie
  document.getElementById('filtreOrigine').value = filtres.origine
  document.getElementById('tri').value = filtres.tri
}

// Affiche les derniers produits consultes au-dessous du catalogue
function afficherProduitsRecents() {
  const recents = getRecents()
  const zone = document.getElementById('produits-recents')
  if (recents.length === 0) return

  const produits = recents.map(id => tousLesProduits.find(p => p.id === id))
  zone.innerHTML = '<h2 class="titre-shop" style="margin-bottom: 20px; margin-top: 40px;">Vus récemment</h2><div class="catalogue">' +
    produits.map(p => `
      <div class="product-card" onclick="window.location.href='/produit?id=${p.id}'">
        <img src="http://localhost:3000/${p.images[0]}" alt="${p.nom}"
             onmouseover="this.src='http://localhost:3000/${p.images[1] || p.images[0]}'"
             onmouseout="this.src='http://localhost:3000/${p.images[0]}'">
        <div class="info">
          <h3>${p.nom}</h3>
          <p class="prix">${p.prix} ${p.devise}</p>
        </div>
      </div>`).join('') +
    '</div>'
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

  // Enregistre les choix de filtre dans le cache navigateur
  setCache('filtres-catalogue', { categorie, origine, tri })

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