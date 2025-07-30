import express from 'express'

const app = express()

app.get('/hello', (_req, res) => {
  res.send('<h1>Hello Full Stack!</h1>')
})

const PORT: number = 3001

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`)
})