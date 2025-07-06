const Joi = require("joi");

exports.signupValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    lastName: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    collegeName: Joi.string().min(3).max(100).required(),
    engineeringField: Joi.string().min(3).max(100).required(),
    yearofStudy: Joi.string().min(3).max(100).required(),
    academicDocument: Joi.string().min(3).max(100),
    password: Joi.string().min(6).max(20).required(),
    confirmPassword: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .messages({ "any.only": "Passwords do not match" }),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: "Bad request", error: error.details[0].message });
  }
  next();
};


exports.loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(10).required(),
  });
  const {error}=schema.validate(req.body);
  if(error){
    return res.status(400).json({ message: "Bad request", error: error.details[0].message });
  }
  next();
};
