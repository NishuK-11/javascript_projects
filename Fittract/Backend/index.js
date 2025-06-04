import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import  UserRoutes  from "./routes/User.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({extended:true}));


app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Fittract Backend API",
  });
});
app.use(express.json());
app.use("/api/user", UserRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  res.status(status).json({ 
    message,
    status,
    success: false
 });
});

const connectDB = async () => {
  mongoose.set("strictQuery", false);
  mongoose.connect(process.env.MONGODB_URL)
  .then((res)=> {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
};

const startServer = async () => {
  try {
    // await mongoose.connect(process.env.MONGODB_URL, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // });
    // console.log("Connected to MongoDB");
    await connectDB();

    app.listen(8000, () => {
      console.log(`Server is running on port 8000`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

startServer();
