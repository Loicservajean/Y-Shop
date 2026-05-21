const urlAPI = 'http://localhost:3000'

const params = new URLSearchParams(window.location.search)
const productId = parseInt(params.get('id'))

let imageActuelle = 0

function corrigerChemin(path) {
  return path
    .replace('Images/', 'FUMO/')
    .replace('Mangas/', 'Manga/');
}

function chargerProduit() {
  fetch(urlAPI + '/products/' + productId)
    .then(r => r.json())
    .then(p => {
      afficherProduit(p)
      chargerSimilaires(p)
    })
}

function ajouterAuPanier(id) {
  const quantite = parseInt(document.getElementById('quantite').value)

  fetch(urlAPI + '/panier', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: id,
      productId: id,
      quantite
    })
  })
    .then(() => alert('Produit ajouté au panier !'))
    .catch(error => console.error('Erreur : ', error))
}

function ajouterFavori(id) {
  fetch(urlAPI + '/favoris', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      productId: id
    })
  })
    .then(() => alert('Produit ajouté aux favoris !'))
    .catch(error => console.error('Erreur : ', error))
}

function afficherProduit(produit) {
  const main = document.getElementById('product-container')

  const descCourte = produit.description && produit.description.length > 0
    ? produit.description.slice(0, 150) + "..."
    : "Aucune description disponible."

  const imgFix = corrigerChemin(produit.images[0])

  main.innerHTML = `
    <div class="product-box">

      <div class="carrousel">
        <img id="imgPrincipale" src="../Image/${imgFix}" alt="${produit.nom}">

        <div class="fleches">
          <button onclick="imagePrec(${JSON.stringify(produit.images)})">◀</button>
          <button onclick="imageSuiv(${JSON.stringify(produit.images)})">▶</button>
        </div>
      </div>

      <div class="produit-info">
        <h2>${produit.nom}</h2>
        <p class="prix">${produit.prix} ${produit.devise}</p>

        <p id="description">${descCourte}</p>
        <button onclick="voirDescription('${produit.description.replace(/'/g, "\\'")}')">
          Voir plus
        </button>

        <p>Stock : ${produit.stock}</p>

        <input type="number" id="quantite" value="1" min="1" max="${produit.stock}">
        <button onclick="ajouterAuPanier(${produit.id})">Ajouter au panier</button>
        <button onclick="ajouterFavori(${produit.id})">❤️ Favoris</button>
      </div>
    </div>
  `
}

function imageSuiv(images) {
  imageActuelle = (imageActuelle + 1) % images.length
  const imgFix = corrigerChemin(images[imageActuelle])
  document.getElementById('imgPrincipale').src = "../Image/" + imgFix
}

function imagePrec(images) {
  imageActuelle = (imageActuelle - 1 + images.length) % images.length
  const imgFix = corrigerChemin(images[imageActuelle])
  document.getElementById('imgPrincipale').src = "../Image/" + imgFix
}

function voirDescription(description) {
  document.getElementById('description').textContent = description
}

function chargerSimilaires(produit) {
  fetch(urlAPI + '/products')
    .then(r => r.json())
    .then(list => {
      const similaires = list.filter(p => p.type === produit.type && p.id !== produit.id)
      const div = document.getElementById('similaires')
      similaires.forEach(p => {
        div.innerHTML += `<p onclick="window.location.href='/produit?id=${p.id}'">${p.nom} - ${p.prix}€</p>`
      })
    })
}

chargerProduit()
