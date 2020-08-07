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
    try {
      await SubjectCollection.findOneAndUpdate(
        { _id: request.body.dBID },
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
        { _id: data.dBID },
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

  app.post("/api/save-audio", upload.single("file"), (request, response) => {
    response.send("successfully saved audio");
  });
};
