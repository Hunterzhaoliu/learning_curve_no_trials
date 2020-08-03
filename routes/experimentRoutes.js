const keys = require("../config/keys");
const mongoose = require("mongoose");

const SubjectCollection = mongoose.model("subjects");

module.exports = app => {
  app.put("/api/save-data", async (request, response) => {
    const data = request.body;
    try {
      await SubjectCollection.findOneAndUpdate(
        { _id: "5efa5e151ffa2d276d1bc53b" },
        {
          guesses: data.guesses,
          treeChoice: data.treeChoice,
          reflection: data.reflection
        },
        { upsert: true }
      );
      response.send("successfully saved data");
    } catch (error) {
      response.status(422).send(error);
    }
  });

  app.put("/api/save-conclusion", async (request, response) => {
    const data = request.body;
    try {
      await SubjectCollection.findOneAndUpdate(
        { _id: "5efa5e151ffa2d276d1bc53b" },
        {
          interference: data.interferenceAnswer,
          feedback: data.feedback
        },
        { upsert: true }
      );
      response.send("successfully saved data");
    } catch (error) {
      response.status(422).send(error);
    }
  });
};
