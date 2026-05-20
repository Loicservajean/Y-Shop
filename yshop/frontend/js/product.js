const urlAPI = 'http://localhost:3000'

// Récupérer l'id dans l'URL
const params = new URLSearchParams(window.location.search)
const productId = parseInt(params.get('id'))

let imageActuelle = 0

// Charger le produit
function chargerProduit() {
  fetch(urlAPI + '/products/' + productId)
    .then(response => response.json())
    .then(produit => {
      afficherProduit(produit)
      chargerSimilaires(produit)
    })
    .catch(error => console.error('Erreur : ', error))
}

// Afficher le détail du produit
function afficherProduit(produit) {
  const main = document.getElementById('detail-produit')

  const descriptionCourte = produit.description.slice(0, 150) + '...'

  main.innerHTML = `
    <div class="carrousel">
      <img id="imgPrincipale" src="${produit.images[0]}" alt="${produit.nom}">
      <button onclick="imagePrec(${JSON.stringify(produit.images)})">◀</button>
      <button onclick="imageSuiv(${JSON.stringify(produit.images)})">▶</button>
    </div>

    <div class="produit-info">
      <h2>${produit.nom}</h2>
      <p class="prix">${produit.prix} ${produit.devise}</p>
      <p id="description">${descriptionCourte}</p>
      <button onclick="voirDescription('${produit.description}')">Voir plus</button>

      <p>Stock : ${produit.stock}</p>
      <p>Couleurs : ${produit.caracteristiques.couleurs.join(', ')}</p>
      <p>Tailles : ${produit.caracteristiques.tailles.join(', ')}</p>
      <p>Matière : ${produit.caracteristiques.matiere}</p>

      <input type="number" id="quantite" value="1" min="1" max="${produit.stock}">
      <button onclick="ajouterAuPanier(${produit.id})">Ajouter au panier</button>
      <button onclick="ajouterFavori(${produit.id})">❤️ Favoris</button>
    </div>
  `
}

// Carrousel - image suivante
function imageSuiv(images) {
  imageActuelle = (imageActuelle + 1) % images.length
  document.getElementById('imgPrincipale').src = images[imageActuelle]
}

// Carrousel - image précédente
function imagePrec(images) {
  imageActuelle = (imageActuelle - 1 + images.length) % images.length
  document.getElementById('imgPrincipale').src = images[imageActuelle]
}

// Afficher description complète
function voirDescription(description) {
  document.getElementById('description').textContent = description
}

// Ajouter au panier
function ajouterAuPanier(id) {
  const quantite = parseInt(document.getElementById('quantite').value)
  fetch(urlAPI + '/panier', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId: id, quantite })
  })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => console.error('Erreur : ', error))
}

// Ajouter aux favoris
function ajouterFavori(id) {
  fetch(urlAPI + '/favoris', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId: id })
  })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => console.error('Erreur : ', error))
}

// Produits similaires (même type)
function chargerSimilaires(produit) {
  fetch(urlAPI + '/products')
    .then(response => response.json())
    .then(products => {
      const similaires = products.filter(p =>
        p.caracteristiques.type === produit.caracteristiques.type && p.id !== produit.id
      )
      const div = document.getElementById('similaires')
      similaires.forEach(p => {
        div.innerHTML += `<p onclick="window.location.href='/produit?id=${p.id}'">${p.nom} - ${p.prix}€</p>`
      })
    })
}

chargerProduit()
