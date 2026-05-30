const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Request = require("../models/Request");
const Message = require("../models/Message");

router.post("/signup", async (req, res) => {

  try {

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});
router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});
router.put("/update-profile/:id", async (req, res) => {

  try {

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedUser);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

router.get("/users", async (req, res) => {

  try {

    const users = await User.find();

    res.status(200).json(users);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

router.post("/send-request", async (req, res) => {

  try {

    const { sender, receiver } = req.body;

    const existingRequest = await Request.findOne({
      sender,
      receiver
    });

    if (existingRequest) {
      return res.status(400).json({
        message: "Request already sent"
      });
    }

    const newRequest = new Request({
      sender,
      receiver
    });

    await newRequest.save();

    res.status(201).json({
      message: "Request sent successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

router.get("/requests/:userId", async (req, res) => {

  try {

    const requests = await Request.find({
      receiver: req.params.userId
    }).populate("sender");

    res.status(200).json(requests);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


router.put("/request-status/:id", async (req, res) => {

  try {

    const updatedRequest =
      await Request.findByIdAndUpdate(
        req.params.id,
        {
          status: req.body.status
        },
        { new: true }
      );

    res.status(200).json(updatedRequest);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

router.get("/connections/:userId", async (req, res) => {

  try {

    const acceptedRequests = await Request.find({
      status: "accepted",
      $or: [
        { sender: req.params.userId },
        { receiver: req.params.userId }
      ]
    })
    .populate("sender")
    .populate("receiver");

    const connections = acceptedRequests.map((request) => {

      if (request.sender._id.toString() === req.params.userId) {
        return request.receiver;
      } else {
        return request.sender;
      }

    });

    res.status(200).json(connections);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

router.post("/send-message", async (req, res) => {

  try {

    const {
      sender,
      receiver,
      text
    } = req.body;

    const message = new Message({
      sender,
      receiver,
      text
    });

    await message.save();

    res.status(201).json({
      message: "Message sent"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


router.get(
  "/messages/:senderId/:receiverId",
  async (req, res) => {

    try {

      const messages =
        await Message.find({

          $or: [

            {
              sender:
                req.params.senderId,

              receiver:
                req.params.receiverId
            },

            {
              sender:
                req.params.receiverId,

              receiver:
                req.params.senderId
            }

          ]

        }).sort({ createdAt: 1 });

      res.status(200).json(messages);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

module.exports = router;