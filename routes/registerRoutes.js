const keys = require("../config/keys");
const mongoose = require("mongoose");

const SubjectCollection = mongoose.model("subjects");

module.exports = app => {
  app.post("/api/submit-code", async (request, response) => {
    try {
      // const newSubjectCondition = "increasing";
      // only count conditions of all the subjects who actually completed the
      // full experiment
      const previousSubjectConditions = await SubjectCollection.find(
        { bystander: { $exists: true } },
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

      let newSubjectCondition;
      if (increasingCount > constantCount) {
        newSubjectCondition = "constant";
      } else {
        // when increasing <= constant, make this subject increasing
        newSubjectCondition = "increasing";
      }

      const newSubject = new SubjectCollection({
        condition: newSubjectCondition,
        code: request.body.code,
        childBirthDate: request.body.childBirthDate
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
