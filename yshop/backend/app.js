const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()
const port = 3000

app.use(cors({ origin: '*' }))
app.use(express.json())
app.use('/images', express.static(path.join(__dirname, '../frontend/Image/FUMO')))
app.use('/Mangas', express.static(path.join(__dirname, '../frontend/Image/Manga')))
app.use('/Jeux', express.static(path.join(__dirname, '../frontend/Image/Jeux')))
const productsRouter = require('./router/products')
app.use(productsRouter)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
