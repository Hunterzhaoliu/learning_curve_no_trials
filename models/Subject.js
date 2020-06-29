const mongoose = require("mongoose");
const { Schema } = mongoose;

const subjectSchema = new Schema(
  {
    childName: String,
    childBirthDate: Date,
    signature: String,
    signatureDate: Date,
    videoPermission: { type: Number, default: 0 }
  },
  {
    // allows for request.subject.save()
    usePushEach: true
  }
);

mongoose.model("subjects", subjectSchema);
