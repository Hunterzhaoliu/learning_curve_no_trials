const keys = require("../config/keys");
const mongoose = require("mongoose");
// const validateRegisterInput = require("../validation/register");

const SubjectCollection = mongoose.model("subjects");

module.exports = app => {
  app.post("/api/register-consent", async (request, response) => {
    SubjectCollection.findOne({ signature: request.body.signature }).then(
      subject => {
        if (subject) {
          return response.json("You have already completed this study.");
        } else {
          const newSubject = new SubjectCollection(request.body);
          newSubject.save();
          response.send("registered subject consent");
        }
      }
    );
  });
};
