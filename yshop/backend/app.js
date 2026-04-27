const express = require('express')
const cors = require('cors')

const app = express()
const port = 3000

app.use(cors({ origin: '*' }))
app.use(express.json())

const productsRouter = require('./router/products')
app.use(productsRouter)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
