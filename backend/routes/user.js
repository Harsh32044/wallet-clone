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
  password: zod.string(),
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
      message: "User with given username already exists!",
    });
  }
  const { success } = userObjSchema.safeParse(req.body); // { success: true; data: "tuna" } OR { success: false; error: ZodError }

  if (!success) {
    return res.status(411).json({
      message: "Incorrect Inputs!",
    });
  }

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
    jwtSecret.JWT_SECRET
  );

  return res.status(201).json({
    message: "User created successfully",
    token: token,
  });
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
      message: "Username or Password are not in valid format",
    });
  }

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
    jwtSecret.JWT_SECRET
  );

  return res.status(200).json({
    token: token,
    message: `Sign In Successful! Welcome ${user.firstName}`,
  });
});

//Update User Info
const updateBody = zod.object({
  firstName: zod.string().optional(),
  password: zod.string().optional(),
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

userRoute.get("/bulk", async (req, res) => {
  const filterParam = req.query.filter || "" // can be either firstname, or lastname

  const users = Array.from(await User.find({
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
module.exports = userRoute;
