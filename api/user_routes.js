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

userRouter.get("/signin", async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await userModel.findOne({email:email});
  if(!existingUser){
    res.json({
      message: "User does not exist",
    });
  }
  const validPassword = await bcrypt.compare(password, existingUser.password);
  if(!validPassword){
    res.json({
      message: "Invalid Password",
    });
  }
  res.json({
    message: "Signin",
  });

});

userRouter.get("/validateToken", async (req, res) => {});

export default userRouter;
