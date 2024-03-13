const express = require("express");
const router = express.Router();
const zod = require("zod");
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleWare } = require("../middleware");
// signIn signUp
const signUpSchema = zod.object({
  userName: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});
router.post("/signup", async (req, res) => {
  const body = req.body;
  const { success } = signUpSchema.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }
  const userExist = await User.findOne({
    userName: req.body.userName,
  });
  if (userExist) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  const dbUser = await User.create(body);
  const userId = dbUser._id;
  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );
  res.json({
    message: "User created successfully",
    token: token,
  });
});
const signInBody = zod.object({
  userName: zod.string().email(),
  password: zod.string(),
});
router.post("/signin", async (req, res) => {
  const { success } = signInBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }
  const userExist = await User.findOne({
    userName: req.body.userName,
    password: req.body.password,
  });

  if (userExist) {
    const userId = userExist._id;
    const token = jwt.sign(
      {
        userId,
      },
      JWT_SECRET
    );
    res.status(200).json({
      token: token,
    });
    return;
  }
  res.status(411).json({
    message: "Error while logging in",
  });
});
//details update
const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});
router.put("/", authMiddleWare, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }
  await User.updateOne({ _id: req.userId }, req.body);

  res.json({
    message: "Updated successfully",
  });
});

router.get("/bulk", async ( req, res)=>{
  const filter = req.query.filter || "";
  const users = await User.find({
    $or: [{
      firstName:{
        "$regex":filter
      }
    },{
      lastName:{
        "$regex":filter
      }
    }]
  })
  res.json({
    user: users.map(user =>({
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id
    }))
  })
} )
module.exports = router;
