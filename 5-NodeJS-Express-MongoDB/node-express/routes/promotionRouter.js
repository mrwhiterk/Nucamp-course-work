const express = require('express')

const promotionRouter = express.Router()

promotionRouter
  .route('/')
  .all((req, res, next) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    next()
  })
  .get((req, res) => {
    res.send('Will send all the promotions to you in time')
  })
  .post((req, res) => {
    res.send(
      'will add the promotion: ' +
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
    res.end('deleting all promotions')
  })

promotionRouter
  .route('/:promotionId')
  .all((req, res, next) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    next()
  })
  .get((req, res) => {
    console.log('hit')
    res.send(
      'Will send all the promotions to you id: ' + req.params.promotionId
    )
  })
  .post((req, res) => {
    res.send(
      'will add the promotion: ' +
        req.body.name +
        ' with desc: ' +
        req.body.description +
        ' id: ' +
        req.params.promotionId
    )
  })
  .put((req, res) => {
    res.statusCode = 403
    res.send(
      'will update the promotion: ' +
        req.body.name +
        ' with desc: ' +
        req.body.description +
        ' id: ' +
        req.params.promotionId
    )
  })
  .delete((req, res) => {
    res.end('deleting promotion with id: ' + req.params.promotionId)
  })

module.exports = promotionRouter
