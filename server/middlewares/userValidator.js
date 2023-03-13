const { check, validationResult } = require("express-validator");

exports.validateUser = [
  check("fname")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("User name can not be empty!")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Minimum 3 characters required!")
    .bail(),
  check("lname")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("User name can not be empty!")
    .bail()
    .isLength({ min: 2 })
    .withMessage("Minimum 3 characters required!")
    .bail(),
  check("email")
    .trim()
    .normalizeEmail()
    .not()
    .isEmpty()
    .withMessage("Invalid email address!")
    .bail(),
  check("password").isLength({ min: 6 }),

  (req, res , next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      console.log(errors)
      return res.status(422).json({ errors: errors.array() });
    }
    next()
    }
   
];
