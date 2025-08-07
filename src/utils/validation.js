const { Error } = require("mongoose");
const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstname, lastname, email, password } = req.body;
  if (!firstname || !lastname) {
    throw new Error("name is not valid");
  } else if (firstname.length < 4 || firstname.length > 50) {
    throw new Error("first name should between 4-50 character");
  } else if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please Enter strong password");
  }
};
module.exports = { validateSignUpData };
