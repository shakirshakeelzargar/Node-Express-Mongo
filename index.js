const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv=require("dotenv");

//Initializing Env Variables
dotenv.config();


//Import Routes
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const postsRoute=require("./routes/posts");


//Connect to mongoose
mongoose.connect(
  process.env.MONGO_DB_CONNECTION_STRING,
  { useNewUrlParser: true,useUnifiedTopology: true },
  () => console.log("Connected to MongoDB")
);


//Middlewares
app.use(express.json());



//Route Middlewares
app.use("/api/user", registerRoute);
app.use("/api/user", loginRoute);
app.use("/api/posts", postsRoute);


//Start Server
app.listen(3000, () => console.log("Server running at port 3000"));
