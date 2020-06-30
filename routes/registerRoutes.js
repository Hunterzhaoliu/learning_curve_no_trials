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
          // Also need to determine what condition the subject should be in by
          // looking at the condition of previous children and their birth days
          newSubject.save();
          subjectDBInfo = {
            dBID: newSubject._id,
            condition: newSubject.condition
          };
          response.send(subjectDBInfo);
        }
      }
    );
  });
};
