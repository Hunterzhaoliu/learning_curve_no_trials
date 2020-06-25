const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let registerErrors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // Email checks
  if (Validator.isEmpty(data.email)) {
    registerErrors.email = "Email is required.";
  } else if (!Validator.isEmail(data.email)) {
    registerErrors.email = "Email is invalid.";
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    registerErrors.password = "Password is required.";
  }

  return {
    registerErrors,
    isValidRegister: isEmpty(registerErrors)
  };
};
