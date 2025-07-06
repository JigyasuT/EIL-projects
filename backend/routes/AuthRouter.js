const { signup, login, application } = require("../controller/userController");
const {
  signupValidation,
  loginValidation,
} = require("../middleware/userValidation");

const express = require("express");
const router = express.Router(); // ✅ Correct Express Router

const multer = require("multer");
const storage = multer.memoryStorage(); // ya disk storage
// const upload = multer({ storage: storage });
// const upload = multer({ limits: { fileSize: 5 * 1024 * 1024 } }); // max 5MB
const upload = multer(); // ⚠️ Ensure this is not commented out

router.post(
  "/signup",
  upload.single("academicDocument"),
  signupValidation,
  signup
);

router.post("/login", loginValidation, login);

router.post("/application", upload.any(), application);

module.exports = router;
