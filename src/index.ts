const root = require('./app')
const { PORT } = require('./config')

root.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})