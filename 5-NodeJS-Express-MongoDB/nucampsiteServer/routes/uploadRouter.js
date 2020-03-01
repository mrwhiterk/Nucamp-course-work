const express = require("express");
const authenticate = require("../authenticate");
const multer = require("multer");
const cors = require("./cors");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const imageFileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error("You can upload only image files!"), false);
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter: imageFileFilter });

const uploadRouter = express.Router();

uploadRouter.options(cors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
});

uploadRouter.get(
  "/",
  cors.cors,
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  (req, res, next) => {
    res.status(403).send("GET operation not supported on /imageUpload");
  }
);
uploadRouter.post(
  "/",
  cors.corsWithOptions,
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  upload.single("imageFile"),
  (req, res, next) => {
    res.send(req.file);
  }
);
uploadRouter.put(
  "/",
  cors.corsWithOptions,
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  (req, res, next) => {
    res.status(403).send("PUT operation not supported on /imageUpload");
  }
);
uploadRouter.delete(
  "/",
  cors.corsWithOptions,
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  (req, res, next) => {
    res.status(403).send("DELETE operation not supported on /imageUpload");
  }
);

module.exports = uploadRouter;
