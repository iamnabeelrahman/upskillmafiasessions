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

  // const newUser= await new Users(body)
  // newUser.save()

  const newUser = await Users.create(body);

  return res.status(200).json({
    success: true,
    message: "User created successfully",
    user: newUser,
  });
};


const updateUser = async (req, res) => {
  try {
    const id=req.params.id
    const { name, address, email } = req.body
    const user = await Users.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user found with this id",
      });
    }
    const user1 = await Users.findByIdAndUpdate(
      id,
      {
        name,
        email,
        address,
      },
      { new: true }
    )

    return res.status(200).json({
      "success": true,
      "message": "User updated successfully",
      "user": user1
    })

  } catch (error) {
    console.log("Error while updating user: ", error);

  }
}


const deleteUser=async(req,res)=>{
  try {
    const id=req.params.id
     const user=await Users.findById(id)
     if(!user){
      return res.status(404).json({
        success: false,
        message: "No user found with this id",
      })
     }
     await Users.findByIdAndDelete(id)
     return res.status(200).json({
      success: true,
      message: "User deleted successfully",
     })
  } catch (error) {
    console.log("Error while deleting user: ", error);
  }
     
}

const findUserById=async(req,res)=>{
  try {
    const id=req.params.id;
    const user=await Users.findById(id);
    if(!user){
      return res.status(404).json({
        success: false,
        message: "No user found with this id",
      })
    }
    return res.status(200).json({
      success: true,
      message: "User found",
      user: user
    })
  } catch (error) {
     console.log("Error while fetching user: ", error)
  }
 
}

module.exports = {
  getusers,
  createUser,
  updateUser,
  deleteUser,
  findUserById
};
