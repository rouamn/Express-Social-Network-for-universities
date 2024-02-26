import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import path from "path";
//securty packges
import helmet from "helmet";
import errorMiddleware from "./middleware/errorMiddleware.js";
import router from "./routers/index.js";
import mongoose from "mongoose";

//configuration
const __dirname = path.resolve(path.dirname(""));

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



//erreur middleware
app.use(errorMiddleware)

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