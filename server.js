const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
/*
const AuthRoute = require( './routers/authRoute.js');
const UserRoute = require( './routers/UserRoute.js');
const ChatRoute = require( './routers/chatRoute.js');
const MessageRoute = require( './routers/messageRoute.js');*/
//import dotenv from 'dotenv';
const dotenv = require("dotenv");

dotenv.config();
mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`listening at ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Utilisation du body parser middleware
app.use(bodyParser.json()); // Pour les données JSON
app.use(bodyParser.urlencoded({ extended: true })); // Pour les données URL encodées

app.get("/", (req, res) => {
  res.send("Hello World");
});
//routes
/*app.use("/auth", AuthRoute);
app.use('/user', UserRoute);
app.use('/chat', ChatRoute);
app.use('/message', MessageRoute);
*/