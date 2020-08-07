const keys = require("../config/keys");
const mongoose = require("mongoose");
// const fs = require("fs");
const path = require("path");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const gridfs = require("gridfs-stream");
const crypto = require("crypto");

const SubjectCollection = mongoose.model("subjects");

// For GridFS Audio Storage
const connection = mongoose.connection;
connection.once("open", () => {
  const gfs = gridfs(connection.db, mongoose.mongo);
  gfs.collection("audios");
});

// Create storage engine
const storage = new GridFsStorage({
  url: keys.mongoURI,
  file: (fileRequest, file) => {
    return new Promise((resolve, reject) => {
      // crypto changes the name of the file in case to make each name unique
      crypto.randomBytes(16, (error, buffer) => {
        if (error) {
          return reject(error);
        }
        const filename =
          buffer.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "audios"
        };
        resolve(fileInfo);
      });
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
    console.log("/api/save-audio");
    response.send("successfully saved audio");
  });
};
