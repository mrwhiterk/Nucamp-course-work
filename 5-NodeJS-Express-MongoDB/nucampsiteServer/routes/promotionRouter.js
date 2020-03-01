const Promotion = require("../models/promotion");
const express = require("express");
const router = express.Router();
const authenticate = require("../authenticate");
const cors = require("./cors");

router.options(cors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
});

router.get("/", cors.cors, (req, res) => {
  Promotion.find()
    .then(promotions => {
      res.send(promotions);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

router.post(
  "/",
  cors.corsWithOptions,
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  (req, res) => {
    Promotion.create(req.body)
      .then(promotion => {
        res.send(promotion);
      })
      .catch(err => res.status(400).send(err));
  }
);

router.put(
  "/",
  cors.corsWithOptions,
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  (req, res) => {
    res.status(403).send("Put not supported");
  }
);

router.delete(
  "/",
  cors.corsWithOptions,
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  (req, res) => {
    Promotion.deleteMany()
      .then(response => {
        res.send(response);
      })
      .catch(err => res.status(400).send(err));
  }
);

router.get("/:promotionId", cors.cors, (req, res) => {
  Promotion.findById(req.params.promotionId, (err, promotion) => {
    if (err) {
      res.status(400).send(err);
    }
    res.send(promotion);
  });
});

router.post(
  "/:promotionId",
  cors.corsWithOptions,
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  (req, res) => {
    res
      .status(403)
      .send(
        `POST operation not supported on /promotions/${req.params.promotionId}`
      );
  }
);

router.put(
  "/:promotionId",
  cors.corsWithOptions,
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  (req, res) => {
    Promotion.findByIdAndUpdate(
      req.params.promotionId,
      {
        $set: req.body
      },
      { new: true }
    )
      .then(promotion => {
        res.send(promotion);
      })
      .catch(err => res.status(400).send(err));
  }
);

router.delete(
  "/:promotionId",
  cors.corsWithOptions,
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  (req, res) => {
    Promotion.findByIdAndDelete(req.params.promotionId)
      .then(promotion => {
        res.send(promotion);
      })
      .catch(err => res.status(400).send(err));
  }
);

module.exports = router;
