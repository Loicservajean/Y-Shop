const fs = require('fs')
const path = require('path')

const dataPath = path.join(__dirname, '../data.json')

function lireData() {
  return JSON.parse(fs.readFileSync(dataPath))
}

function sauvegarder(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2))
}

// Récupérer tous les produits
const getAllProducts = (req, res) => {
  const data = lireData()
  res.status(200).json(data.products)
}

// Récupérer un produit par son id
const getProductById = (req, res) => {
  const id = parseInt(req.params.id)
  const data = lireData()
  const product = data.products.find(p => p.id === id)

  if (!product) {
    return res.status(404).json({ message: 'Produit non trouvé' })
  }
  res.status(200).json(product)
}

// Récupérer le panier
const getPanier = (req, res) => {
  const data = lireData()
  res.status(200).json(data.panier)
}

// Ajouter au panier
const addToPanier = (req, res) => {
  const { productId, quantite } = req.body
  const data = lireData()

  const product = data.products.find(p => p.id === productId)
  if (!product) {
    return res.status(404).json({ message: 'Produit non trouvé' })
  }

  const existant = data.panier.find(p => p.productId === productId)
  if (existant) {
    existant.quantite += quantite
  } else {
    data.panier.push({ productId, quantite })
  }

  // Mise à jour du stock
  product.stock -= quantite
  sauvegarder(data)
  res.status(200).json({ message: 'Ajouté au panier', panier: data.panier })
}

// Supprimer du panier
const removeFromPanier = (req, res) => {
  const id = parseInt(req.params.id)
  const data = lireData()

  data.panier = data.panier.filter(p => p.productId !== id)
  sauvegarder(data)
  res.status(200).json({ message: 'Supprimé du panier', panier: data.panier })
}

// Récupérer les favoris
const getFavoris = (req, res) => {
  const data = lireData()
  res.status(200).json(data.favoris)
}

// Ajouter aux favoris
const addToFavoris = (req, res) => {
  const { productId } = req.body
  const data = lireData()

  if (!data.favoris.includes(productId)) {
    data.favoris.push(productId)
    sauvegarder(data)
  }
  res.status(200).json({ message: 'Ajouté aux favoris', favoris: data.favoris })
}

// Supprimer des favoris
const removeFromFavoris = (req, res) => {
  const id = parseInt(req.params.id)
  const data = lireData()

  data.favoris = data.favoris.filter(f => f !== id)
  sauvegarder(data)
  res.status(200).json({ message: 'Supprimé des favoris', favoris: data.favoris })
}

module.exports = {
  getAllProducts,
  getProductById,
  getPanier,
  addToPanier,
  removeFromPanier,
  getFavoris,
  addToFavoris,
  removeFromFavoris
}
