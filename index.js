const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const keys = require("./config/keys");

require("./models/Subject");

mongoose.Promise = global.Promise;
mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// gives deprecation warning if not included: mongoose findOneAndUpdate uses
// mongoDB's findOneAndUpdate rather than mongoDB's findAndModify
mongoose.set("useFindAndModify", false);

const app = express();
const server = require("http").createServer(app);

// heroku dynamic port
const PORT = process.env.PORT || 5000;
server.listen(PORT, function() {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});

// wiring middlewares
// middlewares = small functions that modify incoming requests to our
// app before requests are sent to route handlers
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

require("./routes/registerRoutes")(app);
require("./routes/experimentRoutes")(app);

if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets like our main.js or main.css file
  app.use(express.static("client/build"));

  // Express will serve up the index.html file if it doesn't recognize the route
  const path = require("path");
  app.get("*", (request, response) => {
    response.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
