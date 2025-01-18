const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const { sendSuccessResponse, sendErrorResponse } = require("../utils/response");
const environment = require("../utils/environment");
const { generateRandomString } = require("../utils/fn");
const dayjs = require("dayjs");

exports.signup = async (req, res) => {
  try {
    const { email, password, role, fullName, mobileNumber } = req.body;
    const existingUser = await UserModel.findOne({ email: email });
    if (!existingUser) {
      const user = new UserModel({
        fullName,
        email,
        role,
        password,
        mobileNumber,
      });
      const savedUser = await user.save();
      sendSuccessResponse(res, { data: savedUser });
    } else {
      return sendErrorResponse(
        res,
        "Account with that email address already exists.",
        400
      );
    }
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

exports.login = async (req, res) => {
  try {
    res.clearCookie("token", { domain: `.${environment.domain}` });
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email }).select(
      "+password"
    );

    if (!user) {
      return sendErrorResponse(res, "We are not aware of this user.", 403);
    }

    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        return sendErrorResponse(res, "Invalid email or password", 401);
      }
      if (isMatch) {
        const token = jwt.sign(
          { _id: user._id, },
          environment.jwt.secret,
          { expiresIn: environment.jwt.expiredIn }
        );

        const { password: hash, ...data } = user.toJSON();
        res.cookie("token", token, { domain: `.${environment.domain}` });
        return sendSuccessResponse(res, {
          message: "Success! You are logged in.",
          token,
          data,
        });
      }
      return sendErrorResponse(res, "Invalid email or password.", 401);
    });
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

