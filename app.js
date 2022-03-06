const express = require("express");
const connectToDB = require("./db");
const fetchadmin = require("./middlerware/fetchadmin");
const dotenv = require("dotenv");

const PORT = process.env.PORT || 5000;

dotenv.config();

connectToDB();
const app = express();

app.use(express.json());

app.use("/api/auth", require("./routes/signup"));
app.use("/api/auth", require("./routes/address"));
app.use("/api/auth", require("./routes/notes"));
app.use("/api/auth", require("./routes/admin"));
app.use("/api/order", require("./routes/cart"));
app.use("/api/order", require("./routes/order"));


if (process.env.NODE_ENV === "production") {
    const path = require("path");
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

app.listen(PORT, () => {
  console.log("app running one port", PORT);
});
