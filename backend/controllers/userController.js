import User from "../models/user.js";
import Library from "../models/library.js";
import { checkUserAuthentication } from "../middlewares/Auth.js";
import OTP from "../models/otp.js";
import { mailSender } from "../utils/mailSender.js";
export const registerLibraryWithAdmin = async (req, res) => {
  try {
    const { admin_name, email, password, library_name, address, pincode, otp } =
      req.body;

    const checkUserPresent = await User.findOne({ email });
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User is already registered",
      });
    }

    // create a unique library code with library_name capitalized with date like LIBRARY_NAME_2021-11
    const library_code = `${library_name.toUpperCase()}_${new Date()
      .toISOString()
      .slice(0, 7)}`;

    const libraryPayload = {
      name: library_name,
      address,
      pincode,
      library_code,
    };

    // Check OTP
    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    if (response.length === 0 || otp !== response[0].otp) {
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    }

    const library = await Library.create(libraryPayload);
    const library_id = library._id;

    const userPayload = {
      name: admin_name,
      email,
      password,
      role: "admin",
      library_id,
      library_code,
    };

    const user = await User.create(userPayload);
    const token = user.getJwtToken();

    res.status(200).json({
      success: true,
      message: "Admin registered successfully",
      token,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(404).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = user.getJwtToken();
    res
      .status(200)
      .json({ success: true, token, message: "User logged in successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    // send library details along with user
    const library = await Library.findById(user.library_id);
    const data = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      library: {
        library_id: library._id,
        name: library.name,
        library_code: library.library_code,
        address: library.address,
        pincode: library.pincode,
      },
    };
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const registerNewUser = async (req, res) => {
  try {
    const { name, email, password, role, library_code } = req.body;

    const checkUserPresent = await User.findOne({ email });
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User is already registered",
      });
    }
    // check if library exists with the code
    const library = await Library.findOne({ library_code });
    if (!library) {
      return res.status(404).json({
        success: false,
        message: "Library not found",
      });
    }
    const library_id = library._id;
    const userPayload = {
      name,
      email,
      password,
      role,
      library_id,
      library_code,
    };
    const user = await User.create(userPayload);
    const emailBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
      <h1 style="color: #333;">Welcome to Our Library Management System!</h1>
      <p style="font-size: 16px; color: #555;">
        Dear ${name},
      </p>
      <p style="font-size: 16px; color: #555;">
        You have been successfully registered as a <strong>${role}</strong> in our library management system. Below are your login details:
      </p>
      <div style="background-color: #f9f9f9; padding: 10px 20px; border-radius: 5px; text-align: center; margin: 20px 0;">
        <p style="font-size: 16px; color: #333;"><strong>Email:</strong> ${email}</p>
        <p style="font-size: 16px; color: #333;"><strong>Password:</strong> ${password}</p>
      </div>
      <p style="font-size: 16px; color: #555;">
        Please keep this information safe and do not share it with anyone.
      </p>
      <p style="font-size: 16px; color: #555;">
        Best regards,<br/>
        Library Management System Team
      </p>
      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
      <p style="font-size: 12px; color: #999; text-align: center;">
        This is an automated message. Please do not reply to this email.
      </p>
    </div>
  `;

    const response = await mailSender(email, "User Registration", emailBody);

    res.status(200).json({
      success: true,
      message: `New ${role} user registered successfully`,
      token: user.getJwtToken(),
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};

