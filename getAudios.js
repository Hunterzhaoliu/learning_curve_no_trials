const MongoClient = require("mongodb");
const keys = require("./config/dev");

// https://medium.com/@kavitanambissan/uploading-and-retrieving-a-file-from-gridfs-using-multer-958dfc9255e8
MongoClient.connect(
  keys.mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function(error, client) {
    if (error) {
      console.log("MongoClient Connection error = ", error.errMsg);
      return;
    } else {
      const db = client.db("learning_curve");
      const audioFilesCollection = db.collection("audios.files");
      const audioChuncksCollection = db.collection("audios.chunks");

      audioFilesCollection.find().toArray(function(error, files) {
        if (error) {
          console.log("Error finding file = ", error.errMsg);
          return;
          if (!files || files.length === 0) {
            console.log("No files found");
            return;
          } else {
            return;
            //Retrieving the chunks from the db
            audioChuncksCollection
              .find({ files_id: files[0]._id })
              .sort({ n: 1 })
              .toArray(function(error, chunks) {
                if (error) {
                  console.log("Error retrieving chunks = ", error.errmsg);
                  return;
                }
                if (!chunks || chunks.length === 0) {
                  console.log("No data found");
                  return;
                }
              });
          }
        }
      });
    }
  }
);

//
//     let fileData = [];
//     for(let i=0; i<chunks.length;i++){
//       //This is in Binary JSON or BSON format, which is stored
//       //in fileData array in base64 endocoded string format
//
//       fileData.push(chunks[i].data.toString('base64'));
//     }
//
//      //Display the chunks using the data URI format
//      let finalFile = 'data:' + files[0].contentType + ';base64,'
//           + fileData.join('');
//       res.render('imageView', {
//          title: 'Image File',
//          message: 'Image loaded from MongoDB GridFS',
//          imgurl: finalFile});
//      });
//     }
//    });
//      }
//
// });
