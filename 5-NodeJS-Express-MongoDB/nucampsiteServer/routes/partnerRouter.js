const Partner = require("../models/partner");
const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  Partner.find()
    .then(partners => {
      res.send(partners);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

router.post("/", (req, res) => {
  Partner.create(req.body)
    .then(partner => {
      res.send(partner);
    })
    .catch(err => res.status(400).send(err));
});

router.put("/", (req, res) => {
  res.statusCode = 403;
  res.end("put not supported");
});

router.delete("/", (req, res) => {
  Partner.deleteMany()
    .then(response => {
      res.send(response);
    })
    .catch(err => res.status(400).send(err));
});

router.get("/:partnerId", (req, res) => {
  Partner.findById(req.params.partnerId)
    .then(partner => {
      res.send(partner);
    })
    .catch(err => res.status(400).send(err));
});

router.post("/:partnerId", (req, res) => {
  res
    .status(403)
    .send(`POST operation not supported on /partners/${req.params.partnerId}`);
});

router.put("/:partnerId", (req, res) => {
  Partner.findByIdAndUpdate(
    req.params.partnerId,
    {
      $set: req.body
    },
    { new: true }
  )
    .then(partner => {
      res.send(partner);
    })
    .catch(err => res.status(400).send(err));
});

router.delete("/:partnerId", (req, res) => {
  Partner.findByIdAndDelete(req.params.partnerId)
    .then(partner => {
      res.send(partner);
    })
    .catch(err => res.status(400).send(err));
});

module.exports = router;
