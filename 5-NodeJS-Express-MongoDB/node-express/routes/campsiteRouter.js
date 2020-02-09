const express = require('express')

const campsiteRouter = express.Router()

campsiteRouter
  .route('/')
  .all((req, res, next) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    next()
  })
  .get((req, res) => {
    res.send('Will send all the campsites to you')
  })
  .post((req, res) => {
    res.send(
      'will add the campsite: ' +
        req.body.name +
        ' with desc: ' +
        req.body.description
    )
  })
  .put((req, res) => {
    res.statusCode = 403
    res.end('put not supported')
  })
  .delete((req, res) => {
    res.end('deleting all campsites')
  })

module.exports = campsiteRouter
