const express = require("express");
const collection = require("./Mongo");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", cors(), (req, res) => {});

app.post("/signup/check", async (req, res) => {
  const { id } = req.body;

  try {
    const check = await collection.findOne({ id: id });

    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
    }
  } catch (e) {
    res.json("fail");
  }
});

app.post("/signup", async (req, res) => {
  const { id, password, name, email } = req.body;

  const data = {
    id: id,
    password: password,
    name: name,
    email: email,
  };

  try {
    const check = await collection.findOne({ id: id });

    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
      await collection.insertMany([data]);
    }
  } catch (e) {
    res.json("fail");
  }
});

app.post("/login", async (req, res) => {
  const { id, password } = req.body;

  try {
    const user = await collection.findOne({ id: id, password: password });

    if (user) {
      res.json("success");
    } else {
      res.json("fail");
    }
  } catch (e) {
    res.json("error");
  }
});

app.listen(8000, "0.0.0.0", () => {
  console.log("Server is listening on port 8000");
});
