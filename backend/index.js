import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/auth.routes.js";
import userRoute from "./routes/user.routes.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

app.use("/api", (req, res) => {
  res.send("Hello from Fiver clone API art by dickenzoh dev");
});

const PORT = process.env.PORT || 3005;

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_CONN_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
