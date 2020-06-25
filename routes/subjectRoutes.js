const mongoose = require("mongoose");
const UserCollection = mongoose.model("users");

// module.exports = app => {
//   app.put("/api/subject/update", async (request, response) => {
//     try {
//       const user = request.body;
//       await UserCollection.findOneAndUpdate(
//         { email: user.email },
//         {
//           $set: {
//             access: user.newAccessLevel
//           }
//         },
//         { upsert: true }
//       );
//
//       response.send("saved user");
//     } catch (error) {
//       response.status(422).send(error);
//     }
//   });
// };
