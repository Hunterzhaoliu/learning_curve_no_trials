const keys = require("../config/keys");
const mongoose = require("mongoose");

const SubjectCollection = mongoose.model("subjects");

module.exports = app => {
  app.post("/api/submit-code", async (request, response) => {
    try {
      const newSubjectCondition = "increasing";

      const newSubject = new SubjectCollection({
        condition: newSubjectCondition,
        code: request.body.code
      });

      await newSubject.save();

      subjectDBInfo = {
        dBID: newSubject._id,
        condition: newSubject.condition
      };
      response.send(subjectDBInfo);
    } catch (error) {
      response.send(error);
    }
  });
};
