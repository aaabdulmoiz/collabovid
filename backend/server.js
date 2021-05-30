const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const userRoutes = require("./routes/userRoutes");
const requestRoutes = require("./routes/requestRoutes");
const collabovidRoutes = require("./routes/collabovidRoutes");

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ key: "value" });
  console.log("Check");
});

app.use("/api/users", userRoutes);

app.use("/api/request", requestRoutes);

app.use("/api/collabovid", collabovidRoutes);

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}`.grey.bold
  )
);
