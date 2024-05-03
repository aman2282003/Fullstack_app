const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const connection = require("./config/db");
app.use(express.json())
const cors = require('cors')
const userRouter = require("./routes/userRouter");
const noteRouter = require("./routes/noteRouter");
PORT = process.env.PORT || 8080;

app.use("/user", userRouter);
app.use("/note", noteRouter)
app.use(cors())
app.get("/", (req, res) => {
  res.send("this is home route of full stack app");
});

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("server is running on port", PORT, "and db is also connected");
  } catch (error) {
    console.log(error);
  }
});
