const mongoose = require("mongoose");
const { Schema } = mongoose;

const subjectSchema = new Schema(
  {
    code: String,
    condition: String,
    guesses: [Number],
    treeChoice: String,
    reflection: String,
    interference: String,
    feedback: String
  },
  {
    // allows for request.subject.save()
    usePushEach: true
  }
);

mongoose.model("subjects", subjectSchema);
