const express = require('express')
const router = express.Router()
const controller = require('../controller/products')

// Routes produits
router.get('/products', controller.getAllProducts)
router.get('/products/:id', controller.getProductById)

// Routes panier
router.get('/panier', controller.getPanier)
router.post('/panier', controller.addToPanier)
router.delete('/panier/:id', controller.removeFromPanier)

// Routes favoris
router.get('/favoris', controller.getFavoris)
router.post('/favoris', controller.addToFavoris)
router.delete('/favoris/:id', controller.removeFromFavoris)

module.exports = router
