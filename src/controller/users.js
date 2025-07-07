import Users from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  try {
    const {
      fullName,
      password,
      phoneNumber,
      role,
      email,
      location,
      confirmPassword,
    } = req.body;
    if (
      !fullName ||
      !password ||
      !role ||
      !phoneNumber ||
      !email ||
      !location
    ) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }
    console.log(req.body);
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(422).json({
        message:
          "user with this email already exists.kindly enter valid email.",
        data: existingUser,
      });
    }
    if (password !== confirmPassword) {
      return res.status(409).json({
        message: "Password mismatch with confirmPassword.",
      });
    }

    if (!["user", "organizer"].includes(role)) {
      return res.status(400).json({ message: "Invalid role provided." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Users({
      fullName,
      password: hashedPassword,
      phoneNumber,
      role,
      email,
      location,
    });

    await newUser.save();
   res.status(200).json({
  message: `${role === "organizer" ? "Organizer" : "User"} registered successfully.`,
  role,
});
  } catch (error) {
    console.log("error is:", error);
    res.status(409).json({
      message: "error fetching users data",
      error: error,
    });
  }
};
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    console.log("Login request received:", req.body);

    const existingUser = await Users.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({
        message: "User not found with this email.",
      });
    }

    const isUser = await bcrypt.compare(password, existingUser.password);
    if (!isUser) {
      return res.status(401).json({
        message: "Invalid password. Enter correct password.",
      });
    }

    const token = jwt.sign(
      { id: existingUser._id, role: existingUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    res.status(200).json({
      message: `${existingUser.role} login successfully`,
      token,
      user: {
        id: existingUser._id,
        fullName: existingUser.fullName,
        email: existingUser.email,
        role: existingUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error signing in user.",
      error,
    });
  }
};
