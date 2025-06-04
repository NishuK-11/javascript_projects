import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { createError } from "../error.js";
import User from '../models/User.js';
import Workout from '../models/Workout.js';

dotenv.config();

export const UserRegister = async (req, res, next) => {
  try {
    const { email, password, name, img } = req.body;

    // ✅ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(createError(409, "Email already in use"));
    }

    // ✅ Hash password
    const salt = await bcrypt.genSalt(10); // No need to use Sync versions inside async functions
    const hashedPassword = await bcrypt.hash(password, salt);

    // ✅ Create user
    const user = new User({
      email,
      password: hashedPassword,
      name,
      img
    });

    const createdUser = await user.save();

    // ✅ Create token
    const token = jwt.sign(
      { id: createdUser._id },
      process.env.JWT,
      { expiresIn: "9999 years" }
    );

    return res.status(200).json({ token, user });
  } catch (err) {
    next(err);
  }
};

export const UserLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // ✅ Check if user exists
    const user = await User.findOne({ email }).exec();
    if (!user) {
      return next(createError(404, "User not found"));
    }
      console.log(password, user.password);
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if(!isPasswordCorrect) {
      return next(createError(403, "Incorrect password"));
    }
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT,
      { expiresIn: "9999 years" }
    );

    return res.status(200).json({ token, user });
  } catch (err) {
    next(err);
  }
};


export const getUserDashboard = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const user = await User.findById(userId);
    if (!user) {
      return next(createError(404, "User not found"));
    }

    const currentDate = new Date();

    const startToday = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const endToday = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);

    // ✅ Total calories burnt today
    const totalCaloriesBurnt = await Workout.aggregate([
      {
        $match: {
          user: userId,
          Date: { $gte: startToday, $lt: endToday }
        }
      },
      {
        $group: {
          _id: null,
          totalCaloriesBurnt: { $sum: "$caloriesBurned" }
        }
      }
    ]);

    // ✅ Total workouts today
    const totalWorkouts = await Workout.countDocuments({
      user: userId,
      Date: { $gte: startToday, $lt: endToday }
    });

    // ✅ Average calories per workout
    const avgCaloriesBurntPerWorkout =
      totalCaloriesBurnt.length > 0
        ? totalCaloriesBurnt[0].totalCaloriesBurnt / totalWorkouts
        : 0;

    // ✅ Pie chart data by category
    const categoryCalories = await Workout.aggregate([
      {
        $match: {
          user: userId,
          Date: { $gte: startToday, $lt: endToday }
        }
      },
      {
        $group: {
          _id: "$category",
          totalCaloriesBurned: { $sum: "$caloriesBurned" }
        }
      }
    ]);

    const pieChartData = categoryCalories.map((item, index) => ({
      id: index,
      value: item.totalCaloriesBurned,
      label: item._id
    }));

    // ✅ Weekly data
    const weeks = [];
    const caloriesBurned = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(currentDate.getTime() - i * 24 * 60 * 60 * 1000);

      weeks.push(`${date.getDate()}th`);

      const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);

      const weekData = await Workout.aggregate([
        { $match: { user: userId, Date: { $gte: startOfDay, $lt: endOfDay } } },
        { $group: { _id: null, totalCaloriesBurned: { $sum: "$caloriesBurned" } } }
      ]);

      caloriesBurned.push(weekData[0]?.totalCaloriesBurned || 0);
    }

    // ✅ Send final dashboard data
    res.status(200).json({
      totalCaloriesBurnt: totalCaloriesBurnt[0]?.totalCaloriesBurnt || 0,
      totalWorkouts,
      avgCaloriesBurntPerWorkout,
      pieChartData,
      weeklyCalories: {
        labels: weeks,
        data: caloriesBurned
      }
    });

  } catch (err) {
    next(err);
  }
};

export const getWorkoutsByDate = async(req,res,next)=>{
    try{
        const userId = req.user?.id;
        const user = await User.findById(userId);
        let date = req.query.date ? new Date(req.query.date) : new Date();
        console.log(date);
        if (!user) {
            return next(createError(404, "User not found"));
        }
        const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
        const todaysWorkouts = await Workout.find({
            user: userId,
            Date: { $gte: startOfDay, $lt: endOfDay }
        });

        const totalCaloriesBurnt = todaysWorkouts.reduce((total, workout) => total + workout.caloriesBurned, 0);

        res.status(200).json({ todaysWorkouts, totalCaloriesBurnt });

    } catch (err) {
        next(err);
    }
}

export const addWorkout = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const {workoutString} = req.body;
    if(!workoutString){
        return next(createError(400, "Workout string is required"));
    }
    const eachWorkout = workoutString.split("\n").map(workout => workout.trim());
    const categories = eachWorkout.filter((line)=>line.startswith("#"))
    if(categories.length === 0){
        return next(createError(400, "At least one category is required"));
    }

    const parsedWorkouts = [];
    let currentCategory = "";
    let count = 0;

    //loop through each line to parse workout details
    await eachWorkout.forEach((line) => {
        count++;
        if(line.startswith("#")){
            const parts = line?.split("\n").map((part)=>part.trim());
            console.log(parts);
            if(parts.length<5){
                return next(createError(400, `Workout string is missing for ${count}`));
            }

            //update current category
            currentCategory = parts[0].substring(1).trim(); // Remove the '#' character and trim spaces
            //Extract workout details
            const workoutDetails = parseWorkoutLine(parts);
            if(workoutDetails == null){
                return next(createError(400, `Please enter in proper format`));

            }
            if(workoutDetails){
                workoutDetails.category = currentCategory;
                parsedWorkouts.push(workoutDetails);
            }
        }
        else{
            return next(createError(400,    `workout string is missing for ${count}`));
        }
    })

    await parsedWorkouts.forEach(async (workout) => {
        workout.caloriesBurned = parseFloat(calculateCaloriesBurnt(workout));
        await Workout.create({ ...workout, user: userId });
    });

    return res.status(201).json({
      message: "Workouts added successfully",
      workouts: parsedWorkouts,
    });

  } catch (err) {
    next(err);
  }
};