const express = require("express");
const Campsite = require("../models/campsite");
const Campsite = require("/Users/mrwhiterk/dev/nucamp/Nucamp-course-work/5-NodeJS-Express-MongoDB/nucampsiteServer/models/campsite");
const authenticate = require("../authenticate");
const cors = require("./cors");
const campsiteRouter = express.Router();

campsiteRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, (req, res, next) => {
    Campsite.find()
      .populate("comments.author")
      .then((campsites) => {
        res.json(campsites);
      })
      .catch((err) => next(err));
  })
  .post(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Campsite.create(req.body)
        .then((campsite) => {
          res.json(campsite);
        })
        .catch((err) => next(err));
    }
  )
  .put(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res) => {
      res.statusCode = 403;
      res.end("put not supported on /campsites");
    }
  )
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Campsite.deleteMany()
        .then((response) => {
          res.send(response);
        })
        .catch((err) => next(err));
    }
  );

campsiteRouter
  .route("/:campsiteId")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, (req, res, next) => {
    Campsite.findById(req.params.campsiteId)
      .populate("comments.author")
      .then((campsite) => {
        res.send(campsite);
      })
      .catch((err) => next(err));
  })
  .post(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res) => {
      res.statusCode = 403;
      res.end(
        `POST operation not supported on /campsites/${req.params.campsiteId}`
      );
    }
  )
  .put(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Campsite.findByIdAndUpdate(
        req.params.campsiteId,
        {
          $set: req.body,
        },
        { new: true }
      )
        .then((campsite) => {
          res.send(campsite);
        })
        .catch((err) => next(err));
    }
  )
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Campsite.findByIdAndDelete(req.params.campsiteId)
        .then((campsite) => {
          res.send(campsite);
        })
        .catch((err) => next(err));
    }
  );

campsiteRouter
  .route("/:campsiteId/comments")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, (req, res, next) => {
    Campsite.findById(req.params.campsiteId)
      .populate("comments.author")
      .then((campsite) => {
        if (campsite) {
          res.send(campsite.comments);
        } else {
          err = new Error(`Campsite ${req.params.campsiteId} not found`);
          err.status = 404;
          return next(err);
        }
      })
      .catch((err) => next(err));
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Campsite.findById(req.params.campsiteId)
      .then((campsite) => {
        if (campsite) {
          campsite.comments.push({ ...req.body, author: req.user._id });
          campsite
            .save()
            .then((campsite) => {
              res.send(campsite);
            })
            .catch((err) => {
              next(err);
            });
        } else {
          err = new Error(`Campsite ${req.params.campsiteId} not found`);
          err.status = 404;
          return next(err);
        }
      })
      .catch((err) => next(err));
  })
  .put(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res) => {
      res.statusCode = 403;
      res.end(
        `put not supported on /campsites/${req.params.campsiteId}/comments`
      );
    }
  )
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Campsite.findById(req.params.campsiteId)
        .then((campsite) => {
          if (campsite) {
            // campsite.comments.push(req.body);
            // for (let i = campsite.comments.length - 1; i >= 0; i--) {
            //   campsites.comments.id(campsite.comments[i]._id).remove();
            // }
            campsite.comments = [];

            campsite
              .save()
              .then((campsite) => {
                res.send(campsite);
              })
              .catch((err) => {
                next(err);
              });
          } else {
            err = new Error(`Campsite ${req.params.campsiteId} not found`);
            err.status = 404;
            return next(err);
          }
        })
        .catch((err) => next(err));
    }
  );

campsiteRouter
  .route("/:campsiteId/comments/:commentId")
  .options(cors.cors, cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get((req, res, next) => {
    Campsite.findById(req.params.campsiteId)
      .populate("comments.author")
      .then((campsite) => {
        if (campsite && campsite.comments.id(req.params.commentId)) {
          res.send(campsite.comments.id(req.params.commentId));
        } else if (!campsite) {
          err = new Error(`Campsite ${req.params.campsiteId} not found`);
          err.status = 404;
          return next(err);
        } else {
          err = new Error(`Comment ${req.params.commentId} not found`);
          err.status = 404;
          return next(err);
        }
      })
      .catch((err) => next(err));
  })
  .post(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res) => {
      res
        .status(403)
        .send(
          `POST operation not supported on /campsites/${req.params.campsiteId}/comments/${req.params.commentId}`
        );
    }
  )
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Campsite.findById(req.params.campsiteId)
      .then((campsite) => {
        if (campsite && campsite.comments.id(req.params.commentId)) {
          if (
            !campsite.comments
              .id(req.params.commentId)
              .author.equals(req.user._id) ||
            !req.user.admin
          ) {
            return res.status(403).send("You are not authorized to edit");
          }
          if (req.body.rating) {
            campsite.comments.id(req.params.commentId).rating = req.body.rating;
          }

          if (req.body.text) {
            campsite.comments.id(req.params.commentId).text = req.body.text;
          }

          campsite
            .save()
            .then((campsite) => {
              res.send(campsite);
            })
            .catch((err) => next(err));
        } else if (!campsite) {
          let err = new Error(`Campsite ${req.params.campsiteId} not found`);
          err.status = 404;
          return next(err);
        } else {
          let err = new Error(`Comment ${req.params.commentId} not found`);
          err.status = 404;
          return next(err);
        }
      })
      .catch((err) => next(err));
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Campsite.findById(req.params.campsiteId)
      .then((campsite) => {
        if (campsite && campsite.comments.id(req.params.commentId)) {
          if (
            !campsite.comments
              .id(req.params.commentId)
              .author.equals(req.user._id) ||
            !req.user.admin
          ) {
            return res.status(403).send("You are not authorized to delete");
          }
          campsite.comments.pull(req.params.commentId);

          campsite
            .save()
            .then((campsite) => {
              res.send(campsite);
            })
            .catch((err) => next(err));
        } else if (!campsite) {
          err = new Error(`Campsite ${req.params.campsiteId} not found`);
          err.status = 404;
          return next(err);
        } else {
          err = new Error(`Comment ${req.params.commentId} not found`);
          err.status = 404;
          return next(err);
        }
      })
      .catch((err) => next(err));
  });

module.exports = campsiteRouter;
