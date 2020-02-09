const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const hostname = 'localhost'
const port = 3000

const app = express()

app.use(morgan('dev'))
app.use(express.json())

app.all('/campsites', (req, res, next) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  next()
})

app.get('/campsites', (req, res) => {
  res.send('Will send all the campsites to you')
})

app.post('/campsites', (req, res) => {
  res.send(
    'will add the campsite: ' +
      req.body.name +
      ' with desc: ' +
      req.body.description
  )
})

app.put('/campsites', (req, res) => {
  res.statusCode = 403
  res.end('put not supported')
})

app.delete('/campsites', (req, res) => {
  res.end('deleting all campsites')
})

app.get('/campsites/:id', (req, res) => {
  res.end(req.params.id)
})

app.post('/campsites/:id', (req, res) => {
  res.end('no post operation for id ' + req.params.id)
})

app.put('/campsites/:id', (req, res) => {
  res.statusCode = 403
  res.write('update campsite ' + req.params.id)
  res.end('\nbody ' + req.body.name + ' ' + req.body.description)
})

app.delete('/campsites/:id', (req, res) => {
  res.status(403)
  res.end('delete campsite ' + req.params.id)
})

app.use(express.static(__dirname + '/public'))

app.use((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')
  res.end('<html><body><h1>this is express</h1></body></html>')
})

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
