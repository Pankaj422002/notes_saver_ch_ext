const express = require("express");

const cors = require("cors");
const DBConnect = require("./database.js");

const app = express();

var corsOptions = {
  origin: "chrome-extension://jmjjagboongoelfhnkbfmbeicdhlemel",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({ extended: true })
); /* bodyParser.urlencoded() is deprecated */

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to DBMS PROJECT." });
});

require("./route.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  DBConnect();
});
