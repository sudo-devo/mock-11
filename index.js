const express = require("express");
const conection = require("./config/db");
require("dotenv").config();

const { userRoute } = require("./routes/user.route");
const { auth } = require("./middleware/auth.middleware");
const { profileRouter } = require("./routes/profile.route");

const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.use("/user", userRoute);
// app.use(auth);
app.use("/profile", profileRouter);

app.listen(process.env.port, async () => {
  try {
    await conection;
    console.log("Connected to db");
  } catch (err) {
    console.log(err);
  }

  console.log(`server is listening on ${3200}`);
});


