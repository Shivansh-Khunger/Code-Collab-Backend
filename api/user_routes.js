import express from "express";
import userModel from "./models/userModel.js";
import bcrypt from "bcrypt"

const userRouter = express.Router();

userRouter.use(express.json());

userRouter.post("/signup", async (req, res) => {
  const {  name,email, password } = req.body;
  const existingUser = await userModel.findOne({email:email});
  if(existingUser){
    res.json({
      message: "User already exists",
    });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new userModel({
    name,
    email,
    password:hashedPassword
  });
  await newUser.save();
  res.json({
    message: "Signup",
  });
});

userRouter.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const existingUser = await userModel.findOne({ email: email });

    // Check if user exists
    if (!existingUser) {
      return res.status(404).json({
        message: "User does not exist",
      });
    }

    // Compare passwords
    const validPassword = await bcrypt.compare(password, existingUser.password);

    // Check if password is correct
    if (!validPassword) {
      return res.status(401).json({
        message: "Invalid Password",
      });
    }

    // Successful signin
    res.status(200).json({
      message: "Signin successful",
    });

  } catch (error) {
    
    console.error("Signin error:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
});

userRouter.get("/validateToken", async (req, res) => {});

export default userRouter;
