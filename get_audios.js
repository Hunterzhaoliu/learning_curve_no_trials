const MongoClient = require("mongodb");
const fs = require("fs");
const keys = require("./config/dev");

// https://medium.com/@kavitanambissan/uploading-and-retrieving-a-file-from-gridfs-using-multer-958dfc9255e8
MongoClient.connect(
  keys.mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function(connectError, client) {
    if (connectError) {
      console.log(
        "MongoClient Connection connectError = ",
        connectError.errMsg
      );
      return;
    } else {
      const db = client.db("learning_curve");
      const audioFilesCollection = db.collection("audios.files");
      const audioChuncksCollection = db.collection("audios.chunks");
      // console.log("got collections");

      audioFilesCollection.find().toArray(function(filesError, files) {
        // console.log("finding files");

        if (filesError) {
          console.log("Error finding file = ", filesError.errMsg);
          return;
        } else if (!files || files.length === 0) {
          console.log("No files found");
          return;
        } else {
          // console.log("retrieved files");
          // Retrieving chunks from mongoDB where n is the sequence number of
          // the chuncks
          for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
            audioChuncksCollection
              .find({ files_id: files[fileIndex]._id })
              .sort({ n: 1 })
              .toArray(function(chuncksError, chunks) {
                if (chuncksError) {
                  console.log(
                    "Error retrieving chunks = ",
                    chuncksError.errmsg
                  );
                  return;
                } else if (!chunks || chunks.length === 0) {
                  console.log("No data found");
                  return;
                } else {
                  let fileData = [];
                  for (
                    let chunckIndex = 0;
                    chunckIndex < chunks.length;
                    chunckIndex++
                  ) {
                    // chuncks are in BSON format, which is stored
                    // in fileData array in base64 encoded string format
                    fileData.push(chunks[chunckIndex].data.toString("base64"));
                  }

                  const filename = files[fileIndex].filename;
                  // console.log("filename = ", filename);
                  // console.log("fileData = ", fileData);
                  const fileBase64 = fileData.join("");
                  fs.writeFile(
                    filename,
                    fileBase64,
                    { encoding: "base64" },
                    function(err) {
                      console.log(filename, " created");
                    }
                  );
                }
              });
          }
        }
        console.log("end of file");
      });
    }
  }
);
