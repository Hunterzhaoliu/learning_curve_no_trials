const keys = require("../config/keys");
const mongoose = require("mongoose");
const validateRegisterInput = require("../validation/register");

const SubjectCollection = mongoose.model("subjects");

module.exports = app => {
  // app.post("/api/register", async (request, response) => {
  //   const { registerErrors, isValidRegister } = validateRegisterInput(
  //     request.body
  //   );
  //
  //   // Check validation
  //   if (!isValidRegister) {
  //     return response.json(registerErrors);
  //   }
  //
  //   const lowerCaseEmail = request.body.email.toLowerCase();
  //
  //   SubjectCollection.findOne({ email: lowerCaseEmail }).then(user => {
  //     if (user) {
  //       return response.json({ email: "Email already exists." });
  //     } else {
  //       const newSubject = new SubjectCollection({
  //         name: request.body.name,
  //         email: lowerCaseEmail,
  //         password: request.body.password
  //       });
  //
  //       // Hash password before saving in database
  //       bcrypt.genSalt(10, (error, salt) => {
  //         bcrypt.hash(newSubject.password, salt, (error, hash) => {
  //           if (error) throw error;
  //           newSubject.password = hash;
  //           newSubject
  //             .save()
  //             .then(user => response.send("success"))
  //             .catch(error => console.log(error));
  //         });
  //       });
  //     }
  //   });
  // });
};
