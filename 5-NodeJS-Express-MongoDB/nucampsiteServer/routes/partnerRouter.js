const express = require('express')

const partnerRouter = express.Router()

partnerRouter
  .route('/')
  .all((req, res, next) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    next()
  })
  .get((req, res) => {
    res.send('Will send all the partners to you in time')
  })
  .post((req, res) => {
    res.send(
      'will add the partner: ' +
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
    res.end('deleting all partners')
  })

partnerRouter
  .route('/:partnerId')
  .all((req, res, next) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    next()
  })
  .get((req, res) => {
    console.log('hit')
    res.send('Will send all the partners to you id: ' + req.params.partnerId)
  })
  .post((req, res) => {
    res.send(
      'will add the partner: ' +
        req.body.name +
        ' with desc: ' +
        req.body.description +
        ' id: ' +
        req.params.partnerId
    )
  })
  .put((req, res) => {
    res.statusCode = 403
    res.send(
      'will update the partner: ' +
        req.body.name +
        ' with desc: ' +
        req.body.description +
        ' id: ' +
        req.params.partnerId
    )
  })
  .delete((req, res) => {
    res.end('deleting partner with id: ' + req.params.partnerId)
  })

module.exports = partnerRouter
