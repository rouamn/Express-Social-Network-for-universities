const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // Import the cors middleware
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const helmet = require("helmet");
const errorMiddleware = require("./middleware/errorMiddleware.js");
const router = require("./routers/index.js");
const mongoose = require("mongoose");
const multer = require('multer');




dotenv.config();
const app = express();

app.use(express.static(path.join(__dirname, "views")));



const http = require("http").createServer(app); 
const initializeSocket = require('./socket/socket.js'); 

app.use(express.static(path.join(__dirname, "views/build")));

app.use(helmet());


// Use the cors middleware
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3000' 
}));

app.use(morgan("dev"));
app.use(router);

// Error middleware
app.use(errorMiddleware);

dotenv.config();
mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    http.listen(process.env.PORT, () => { // Use http.listen instead of app.listen
      console.log(`Listening at ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Remove redundant body-parser middleware

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use('/uploads', express.static(path.join(__dirname, 'routers/uploads')));

// Initialize Socket.IO
initializeSocket(http);
module.exports = app;
