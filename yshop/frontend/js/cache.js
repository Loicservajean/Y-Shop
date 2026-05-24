// Helpers de cache avec une duree de vie de 15 minutes

const TTL_MIN = 15

// Stocke une valeur en cache avec sa date d'expiration
function setCache(cle, valeur) {
  const expire = Date.now() + TTL_MIN * 60 * 1000
  localStorage.setItem(cle, JSON.stringify({ valeur, expire }))
}

// Lit une valeur depuis le cache, ou null si expiree / absente
function getCache(cle) {
  const brut = localStorage.getItem(cle)
  if (!brut) return null
  const item = JSON.parse(brut)
  if (Date.now() > item.expire) return null
  return item.valeur
}

// Ajoute un produit a l'historique des derniers vus (max 5)
function ajouterAuxRecents(productId) {
  let liste = getCache('produits-recents') || []
  liste = liste.filter(id => id !== productId)
  liste.unshift(productId)
  liste = liste.slice(0, 5)
  setCache('produits-recents', liste)
}

// Retourne la liste des produits vus recemment
function getRecents() {
  return getCache('produits-recents') || []
}