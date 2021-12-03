const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const path = require("path");

// const connection = require("./server/database/connection");
const mongoose = require("mongoose");

const app = express();

dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 8080;

//log requests:
app.use(morgan("tiny"));

// mongodb connection
//connectDB();
const URI = process.env.MONGODB_URL;
mongoose.connect(URI, { useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});
//parse request to body parser:
app.use(bodyparser.urlencoded({ extended: true }));

//set view engine:
app.set("view engine", "ejs");
//app.set("views", path.resolve(__dirname,"views/ejs"));//tani "all ejs files", lao 3mlt folder gwa el views and put all ejs files inside that folder then we need to inform express that folder as default view engine folder

//load assets:
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));

//load routers
app.use("/", require("./server/routes/router"));

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
