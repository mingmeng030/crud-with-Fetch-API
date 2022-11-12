const express = require("express");
const mongoose = require("mongoose");
const { MONGO_URI } = require("./config");
const cors = require("cors");

//Routes
const postsRoutes = require("./routes/api/posts");
const app = express();

app.use(
  cors({
    "Access-Control-Allow-Origin": "*",
    "Allow-Methods": "GET, POST, DELETE, PATCH",
  })
);

//Body parser middleware
app.use(express.json());

//connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

//User routes
app.use("/api/posts", postsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server run at ${PORT}`));
