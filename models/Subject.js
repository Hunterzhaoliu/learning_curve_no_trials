const mongoose = require("mongoose");
const { Schema } = mongoose;

const subjectSchema = new Schema(
  {
    code: String,
    condition: String,
    guess1: Number,
    guess2: Number,
    guess3: Number,
    guess4: Number,
    trial1Length: Number,
    trial2Length: Number,
    trial3Length: Number,
    trial4Length: Number,
    treeChoice: String,
    reflection: String,
    interference: String,
    feedback: String,
    completedDate: Date,
    deviceType: String,
    deviceModel: String,
    browser: String,
    windowWidth: Number,
    windowHeight: Number
  },
  {
    // allows for request.subject.save()
    usePushEach: true
  }
);

mongoose.model("subjects", subjectSchema);
