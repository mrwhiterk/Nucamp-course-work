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
    res.send('Will send all the campsites to you in timen')
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

campsiteRouter
  .route('/:campsiteId')
  .all((req, res, next) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    next()
  })
  .get((req, res) => {
    console.log('hit')
    res.send('Will send all the campsites to you id: ' + req.params.campsiteId)
  })
  .post((req, res) => {
    res.send(
      'will add the campsite: ' +
        req.body.name +
        ' with desc: ' +
        req.body.description +
        ' id: ' +
        req.params.campsiteId
    )
  })
  .put((req, res) => {
    res.statusCode = 403
    res.send(
      'will update the campsite: ' +
        req.body.name +
        ' with desc: ' +
        req.body.description +
        ' id: ' +
        req.params.campsiteId
    )
  })
  .delete((req, res) => {
    res.end('deleting campsite with id: ' + req.params.campsiteId)
  })

module.exports = campsiteRouter
