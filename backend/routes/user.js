const express = require("express");
const zod = require("zod");
const {User, Account} = require("../db");
const jwt = require("jsonwebtoken");
const jwtSecret = require("../config");
const { authMiddleware } = require("../middleware");

const userRoute = express.Router();

const userObjSchema = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string().min(8),
});

//Basic get route
userRoute.get("/", (req, res) => {
  return res.status(200).json({
    message: "Hello",
  });
});

//signup route
userRoute.post("/signup", async (req, res) => {
  const existing = await User.findOne({
    username: req.body.username,
  });

  if (existing) {
    return res.status(400).json({
      error: "User with given username already exists!",
    });
  }
  const { success } = userObjSchema.safeParse(req.body); // { success: true; data: "this" } OR { success: false; error: ZodError }

  if (!success) {
    return res.status(411).json({
      error: "Incorrect Inputs,or password length too small.",
    });
  }

  try {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });
  
    const newAccount = await Account.create({
      userId: newUser._id,
      balance: (Math.random() * 1000).toFixed(2) + 1
    })
  
    const token = jwt.sign(
      {
        userId: newUser._id,
      },
      jwtSecret.JWT_SECRET, 
      {
        expiresIn: '20m'
      }
    );
  
    return res.status(201).json({
      message: "User created successfully",
      token: token,
    });
  }
  catch (err) {
    return res.status(500).json({
      message: 'Something went wrong!'});
  }
});

//signin route
userRoute.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const { success } = zod
    .object({
      username: zod.string().email(),
      password: zod.string(),
    })
    .safeParse(req.body);

  if (!success) {
    return res.status(400).json({
      error: "Username or Password are not in valid format",
    });
  }

  try {
    const user = await User.findOne({
      username: username,
    });
  
    if (user.username != username || user.password != password) {
      return res.status(403).json({
        message: "Username or Password provided are incorrect",
      });
    }
  
    const token = jwt.sign(
      {
        userId: user._id,
      },
      jwtSecret.JWT_SECRET,
      {
        expiresIn: '1h'
      }
    );
  
    return res.status(200).json({
      token: token,
      message: `Sign In Successful! Welcome ${user.firstName}`,
    });
  }

  catch (err) {
    return res.status(500).json({
      error: "Some error occurred. Please try again later"
    })
  }
});

//Update User Info
const updateBody = zod.object({
  firstName: zod.string().optional(),
  password: zod.string().min(8).optional(),
  lastName: zod.string().optional(),
});

userRoute.put("/", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const { success } = updateBody.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: "Error while updating info. Is password too small?",
    });
  }

  await User.updateOne({ _id: userId }, req.body);

  return res.status(200).json({
    message: "Updated successfully",
  });
});

// Getting users in bulk

userRoute.get("/bulk", authMiddleware,async (req, res) => {
  const filterParam = req.query.filter || "" // can be either firstname, or lastname

  let users = Array.from(await User.find({
    $or: [
      {firstName: {
        $regex: filterParam
      }
    },
      {lastName: {
        $regex: filterParam
      }
    }
    ]
  }))

  users = users.filter(user => user._id != req.userId)

  return res.status(200).json({
    users: users.map(usr => {
      return {
        _id: usr._id,
        firstName: usr.firstName,
        lastName: usr.lastName
      }
    })
  })
});

userRoute.get("/userData", authMiddleware, async (req, res) => {
  const userId = req.userId

  try {
    const userDetails = await User.findById(userId)

    res.status(200).json({
      _id: userDetails._id,
      firstName: userDetails.firstName,
      lastName: userDetails.lastName
    })
  }
  catch (err) {
    res.status(404).json({
      error: "User not found with given ID."
    })
  }

})
module.exports = userRoute;
