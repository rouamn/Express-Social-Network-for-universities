const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
// security packages
const helmet = require("helmet");
const errorMiddleware = require("./middleware/errorMiddleware.js");
const router = require("./routers/index.js");
const mongoose = require("mongoose");

dotenv.config();
const app = express();
app.use(express.static(path.join(__dirname, "views/build")));

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

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
    app.listen(process.env.PORT, () => {
      console.log(`Listening at ${process.env.PORT}`);
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
// Routes
/*app.use("/auth", AuthRoute);
app.use('/user', UserRoute);
app.use('/chat', ChatRoute);
app.use('/message', MessageRoute);
*/

