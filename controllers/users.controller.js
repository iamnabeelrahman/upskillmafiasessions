const { Users } = require("../models/user.models");
const getusers = async (req, res) => {
  try {
    const allUsers = await Users.find();

    if (!allUsers || allUsers.length === 0) {
      return res.status(404).json({
        success: false,
        message: "no user found, please create and then fetch",
      });
    }

    return res.status(200).json({
      success: true,
      users: allUsers,
      message: "Users sent",
    });
  } catch (error) {
    console.log("Errror while fetching user: ", error);
  }
};

const createUser = async (req, res) => {
  const body = req.body;

  if (!body.email || !body.name || !body.address) {
    return res.status(500).json({
      success: false,
      message: "PLease send important fields",
    });
  }

  const checkIfUserExist = await Users.findOne({ email: body.email });

  if (checkIfUserExist) {
    return res.status(400).json({
      success: false,
      message: "User already exist",
    });
  }

  const newUser = await Users.create(body);

  return res.status(200).json({
    success: true,
    message: "User created successfully",
    user: newUser,
  });
};

// check if al reqired feild available
// if email already exist
// create user
// send response

module.exports = {
  getusers,
  createUser
};
