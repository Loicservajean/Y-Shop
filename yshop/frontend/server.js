const express = require('express')
const path = require('path')

const app = express()
const port = 8080

// Fichiers statiques (CSS, JS, images, polices)
app.use('/css', express.static(path.join(__dirname, 'css')))
app.use('/js', express.static(path.join(__dirname, 'js')))
app.use('/Image', express.static(path.join(__dirname, 'Image')))
app.use('/font', express.static(path.join(__dirname, 'font')))

// Routes pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'index.html'))
})

app.get('/panier', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'cart.html'))
})

app.get('/favoris', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'favorites.html'))
})

app.get('/produit', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'product.html'))
})

app.listen(port, () => {
  console.log(`Frontend server listening on port ${port}`)
})