const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const userRoutes = require("./router/users.routes.js");
const communityRoutes = require("./router/communities.routes.js");
const goalRoutes = require("./router/goals.routes.js");
const port = 3000;
const app = express();
dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ extended: false }));

//session setup
app.use(
  session({
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: false,
  })
);

mongoose.set("strictQuery", true);

//Database connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("database connected"))
  .catch((err) => console.log(err));

app.use("/users", userRoutes);
app.use("/communities", communityRoutes);
app.use("/goals", goalRoutes);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
