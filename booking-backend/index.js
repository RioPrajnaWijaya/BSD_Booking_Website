import express from "express";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import roomsRoute from "./routes/rooms.js";
import usersRoute from "./routes/users.js";
import cors from 'cors';
import cookieParser from "cookie-parser";


(async () => {
  try {
    await mongoose.connect("mongodb+srv://bsdadmin:bsd123@bsd.r8cvii7.mongodb.net/?retryWrites=true&w=majority", {
      dbName: 'BSD',
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  } catch (error) {
    console.error(error);
  }
})();

const app = express();


app.use(cookieParser())
app.use(express.json());
app.use(cors());

app.get("/", (req, resp) => {
  resp.send("App is Working");
});

app.use(express.json())

app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/rooms", roomsRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"
    return res.status(500).json({
      success : false,
      status : errorStatus,
      message : errorMessage,
      stack : err.stack
    })
})

mongoose.connection.on("connected", () => {
    console.log("Connected to Mongo DB"); 
});

mongoose.connection.on("disconnected", () => {
    console.log("Disconnected from Mongo DB"); 
});

app.listen(5000, () => {
    console.log("Connected to backend");
});
