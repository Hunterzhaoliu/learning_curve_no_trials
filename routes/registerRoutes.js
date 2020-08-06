const keys = require("../config/keys");
const mongoose = require("mongoose");
// const validateRegisterInput = require("../validation/register");

const SubjectCollection = mongoose.model("subjects");

module.exports = app => {
  app.post("/api/submit-code", async (request, response) => {
    try {
      const previousSubjectConditions = await SubjectCollection.find(
        {},
        { condition: 1, _id: 0 }
      );

      let increasingCount = 0;
      let constantCount = 0;

      for (let i = 0; i < previousSubjectConditions.length; i++) {
        if (previousSubjectConditions[i].condition === "increasing") {
          increasingCount++;
        } else {
          constantCount++;
        }
      }

      let currentSubjectCondition;
      if (increasingCount > constantCount) {
        currentSubjectCondition = "constant";
      } else {
        // when increasing <= constant, make this subject increasing
        currentSubjectCondition = "increasing";
      }

      const newSubject = new SubjectCollection({
        condition: currentSubjectCondition,
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
