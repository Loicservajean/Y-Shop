const urlAPI = 'http://localhost:3000'

const params = new URLSearchParams(window.location.search)
const productId = parseInt(params.get('id'))

let imageActuelle = 0
let imagesProduit = []
let prixDeBase = 0

// Table des multiplicateurs selon la variante choisie
const MULTIPLICATEURS = {
  'Édition Standard':       1.0,
  'Édition Collector':      1.5,
  'Édition Limitée signée': 2.0,
  'Bootleg':                0.5,
  'Édition Anniversaire':   1.4
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
  const variante = document.getElementById('variante-select').value

  fetch(urlAPI + '/panier', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: id,
      productId: id,
      quantite,
      variante
    })
  })
    .then(r => r.json().then(data => ({ ok: r.ok, data })))
    .then(({ ok, data }) => {
      if (!ok) {
        alert('Impossible : ' + data.message)
        return
      }
      alert('Produit ajouté au panier !')
      chargerProduit()
    })
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

// Boucle sur les caracteristiques et les imprime en paragraphes
// On saute "variantes" car affichee a part dans le <select>
function genererCaracteristiques(produit) {
  if (!produit.caracteristiques) return ''
  let html = ''
  for (const [cle, valeur] of Object.entries(produit.caracteristiques)) {
    if (cle === 'variantes') continue
    html += `<p>${cle} : ${valeur}</p>`
  }
  return html
}

function afficherProduit(produit) {
  const main = document.getElementById('product-container')

  imagesProduit = produit.images
  imageActuelle = 0
  prixDeBase = produit.prix

  // Memorise la consultation pour l'historique localStorage
  ajouterAuxRecents(produit.id)

  const descCourte = produit.description && produit.description.length > 0
    ? produit.description.slice(0, 150) + "..."
    : "Aucune description disponible."

  const imgPrincipale = produit.images[0]

  // Construction du <select> des variantes a partir du champ caracteristiques.variantes
  const variantes = produit.caracteristiques.variantes.split(',').map(v => v.trim())
  const optionsHtml = variantes.map(v => `<option value="${v}">${v}</option>`).join('')

  // Si le stock est nul on desactive l'input et le bouton d'ajout
  const stockZero = produit.stock <= 0
  const boutonAjout = stockZero
    ? `<button disabled>Rupture de stock</button>`
    : `<button onclick="ajouterAuPanier(${produit.id})">Ajouter au panier</button>`

  main.innerHTML = `
    <div class="product-box">

      <div class="carrousel">
        <img id="imgPrincipale" src="../Image/${imgPrincipale}" alt="${produit.nom}">

        <div class="fleches">
          <button onclick="imagePrec()">◀</button>
          <button onclick="imageSuiv()">▶</button>
        </div>
      </div>

      <div class="produit-info">
        <h2>${produit.nom}</h2>
        <p class="prix" id="prix-affiche">${produit.prix.toFixed(2)} ${produit.devise}</p>

        <p id="description">${descCourte}</p>
        <button onclick="voirDescription('${produit.description.replace(/'/g, "\\'")}')">
          Voir plus
        </button>

        ${genererCaracteristiques(produit)}

        <label for="variante-select">Variante : </label>
        <select id="variante-select" onchange="onVarianteChange()">
          ${optionsHtml}
        </select>

        <p>Stock : ${produit.stock}</p>

        <input type="number" id="quantite" value="1" min="1" max="${produit.stock}" ${stockZero ? 'disabled' : ''}>
        ${boutonAjout}
        <button onclick="ajouterFavori(${produit.id})">❤️ Favoris</button>
      </div>
    </div>
  `
}

// Met a jour le prix affiche quand on change la variante
function onVarianteChange() {
  const variante = document.getElementById('variante-select').value
  const mult = MULTIPLICATEURS[variante] || 1.0
  const nouveauPrix = (prixDeBase * mult).toFixed(2)
  document.getElementById('prix-affiche').textContent = nouveauPrix + ' EUR'
}

function imageSuiv() {
  imageActuelle = (imageActuelle + 1) % imagesProduit.length
  document.getElementById('imgPrincipale').src = "../Image/" + imagesProduit[imageActuelle]
}

function imagePrec() {
  imageActuelle = (imageActuelle - 1 + imagesProduit.length) % imagesProduit.length
  document.getElementById('imgPrincipale').src = "../Image/" + imagesProduit[imageActuelle]
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