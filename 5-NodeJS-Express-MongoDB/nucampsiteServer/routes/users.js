const express = require("express");
const User = require("../models/user");
const router = express.Router();
const passport = require("passport");
const authenticate = require("../authenticate");

/* GET users listing. */
router.get("/", authenticate.verifyUser, authenticate.verifyAdmin, function(
  req,
  res
) {
  User.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => res.status(400).send({ err }));
});

router.post("/signup", (req, res) => {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.json({ err: err });
      } else {
        if (req.body.firstName) {
          user.firstName = req.body.firstName;
        }
        if (req.body.lastName) {
          user.lastName = req.body.lastName;
        }
        user.save(err => {
          if (err) {
            return res.status(500).send({ err });
          }

          passport.authenticate("local")(req, res, () => {
            res.json({ success: true, status: "Registration Successful!" });
          });
        });
      }
    }
  );
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  const token = authenticate.getToken({ _id: req.user._id });
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json({ success: true, token, status: "You are successfully logged in!" });
});

router.get("/logout", (req, res, next) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie("session-id");
    res.redirect("/");
  } else {
    const err = new Error("You are not logged in!");
    err.status = 401;
    return next(err);
  }
});

module.exports = router;
