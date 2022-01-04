import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import response from "./schema/schemafile.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const port = 5000;
const db = process.env.DB_URL;
const username = process.env.USER_NAME;
const password = process.env.USER_PASSWORD;

// Connect to local DB
// mongoose.connect("mongodb://localhost/todo_db", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     console.log("Connected to MongoDB");
// }).catch((err) => {
// console.log(err);
// });

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

// get all todos (completed or not)
// get one todo
// create todo
// patch todo
// delete todo

app.get("/responses", async (req, res) => {
  const response = await response.find({});
  if (response) {
    return res.status(200).json({
      status: true,
      message: "Todos fettched Successfully",
      data: response,
    });
  } else {
    return res.status(400).json({
      status: false,
      message: "user not found",
    });
  }
});

app.get("/responses/id", async (req, res) => {
  const { status } = req.params;
  const response = await response.find({}).where("status").equals(status);
  if (response) {
    return res.status(200).json({
      status: true,
      message: "Users fettched Successfully",
      data: response,
    });
  } else {
    return res.status(400).json({
      status: false,
      message: "user not found",
    });
  }
});

app.post("/responses", async (req, res) => {
  const { first_name, last_name,  date_of_birth,  school, } = req.body;

  const todoModel = await response.create({
    first_name,
    last_name,
    date_of_birth,
    school,
  });

  if (todoModel) {
    return res.status(201).json({
      status: true,
      message: "User has been Created",
      data: todoModel,
    });
  } else {
    return res.status(400).json({
      status: false,
      message: "user failed to create",
    });
  }
});


app.listen(port, () => console.log("Hey Welcome ${port}!"));
