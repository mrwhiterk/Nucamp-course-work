const express = require("express");
const authenticate = require("../authenticate");
const multer = require("multer");

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

uploadRouter.get(
  "/",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  (req, res, next) => {
    res.status(403).send("GET operation not supported on /imageUpload");
  }
);
uploadRouter.post(
  "/",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  upload.single("imageFile"),
  (req, res, next) => {
    res.send(req.file);
  }
);
uploadRouter.put(
  "/",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  (req, res, next) => {
    res.status(403).send("PUT operation not supported on /imageUpload");
  }
);
uploadRouter.delete(
  "/",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  (req, res, next) => {
    res.status(403).send("DELETE operation not supported on /imageUpload");
  }
);

module.exports = uploadRouter;
