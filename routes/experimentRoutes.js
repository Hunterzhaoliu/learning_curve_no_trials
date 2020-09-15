const keys = require("../config/keys");
const mongoose = require("mongoose");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const gridfs = require("gridfs-stream");

const SubjectCollection = mongoose.model("subjects");

// Create storage engine
// https://github.com/bradtraversy/mongo_file_uploads/blob/master/app.js
const storage = new GridFsStorage({
  db: mongoose.connection,
  file: (fileRequest, file) => {
    return new Promise((resolve, reject) => {
      const fileInfo = {
        filename: file.originalname,
        bucketName: "audios" // collection name in mongoDB
      };
      resolve(fileInfo);
    });
  }
});

const upload = multer({ storage });

module.exports = app => {
  app.put("/api/save-data", async (request, response) => {
    const data = request.body;

    let date = new Date();
    // getTimezoneOffset returns in minutes hence / 60 and subtract four for
    // difference between UTC and eastern time zone
    date.setHours(date.getHours() + date.getTimezoneOffset() / 60 - 4);

    try {
      await SubjectCollection.findOneAndUpdate(
        { _id: request.body.dBID },
        {
          guess1: data.guesses[0],
          guess2: data.guesses[1],
          guess3: data.guesses[2],
          guess4: data.guesses[3],
          trial1Length: data.trialLengths[0],
          trial2Length: data.trialLengths[1],
          trial3Length: data.trialLengths[2],
          trial4Length: data.trialLengths[3],
          treeChoice: data.treeChoice,
          reflection: data.reflection,
          completedDate: date
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
        { _id: data.dBID },
        {
          interference: data.interferenceAnswer,
          bystander: data.bystander,
          feedback: data.feedback,
          deviceType: data.deviceType,
          deviceModel: data.deviceModel,
          browser: data.browser,
          windowWidth: data.windowWidth,
          windowHeight: data.windowHeight
        },
        { upsert: true }
      );
      response.send("successfully saved data");
    } catch (error) {
      response.status(422).send(error);
    }
  });

  app.post("/api/save-audio", upload.single("file"), (request, response) => {
    response.send("successfully saved audio");
  });
};
