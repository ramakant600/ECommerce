const { check, validationResult } = require("express-validator");

exports.LoginAuth = [
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
      return res.status(422).json({ errors: errors.array()})  ;
    }
    next()
    }
   
];
