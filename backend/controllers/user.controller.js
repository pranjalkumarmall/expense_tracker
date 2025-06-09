import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * Register a new user
 */
export const register = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        if (!fullname || !email || !password) {
            return res.status(400).json({
                message: "All fields are required.",
                success: false
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: "User already exists with this email.",
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });

    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({
            message: "Internal server error during registration.",
            success: false,
            error: error.message
        });
    }
};

/**
 * Login an existing user
 */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required.",
                success: false
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false
            });
        }

        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
            expiresIn: "1d"
        });

        // ✅ IMPORTANT: For Render or any cross-origin, must add: secure: true, sameSite: "None"
        return res
            .status(200)
            .cookie("token", token, {
                httpOnly: true,
                secure: true,           // Required for HTTPS
                sameSite: "None",       // Allow cross-site cookie
                maxAge: 24 * 60 * 60 * 1000 // 1 day
            })
            .json({
                message: `Welcome back ${user.fullname}`,
                success: true,
                user: {
                    _id: user._id,
                    fullname: user.fullname,
                    email: user.email
                }
            });

    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({
            message: "Internal server error during login.",
            success: false,
            error: error.message
        });
    }
};

/**
 * Logout the user
 */
export const logout = async (req, res) => {
    try {
        return res
            .status(200)
            .cookie("token", "", {
                httpOnly: true,
                secure: true,      // Also required here for consistency
                sameSite: "None",
                maxAge: 0
            })
            .json({
                message: "User logged out successfully.",
                success: true
            });
    } catch (error) {
        console.error("Error during logout:", error);
        return res.status(500).json({
            message: "Internal server error during logout.",
            success: false,
            error: error.message
        });
    }
};

