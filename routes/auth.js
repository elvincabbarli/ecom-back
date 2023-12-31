// const express = require('express');
// const bcrypt = require("bcryptjs");
// const jwt = require('jsonwebtoken');
// const cookieParser = require('cookie-parser');
// const User = require('../model/User'); // Import your User model or adjust the import path

// const router = express.Router();

// router.use(express.json());
// router.use(cookieParser());

// const generateRandomAvatar = () => {
//     const randomAvatar = Math.floor(Math.random() * 71)
//     return `https://i.pravatar.cc/300?img=${randomAvatar}`;
// }

// router.post('/register', async (req, res) => {
//     try {
//         const { username, email, password } = req.body
//         // CALLING RANDOM AVATAR FUNCTION
//         const randomAvatar = generateRandomAvatar()
//         // CHECKING THE EXISTING USER EMAIL
//         const existingUser = await User.findOne({ email })
//         if (existingUser) {
//             return res.status(400).json({ error: 'Email already used' })
//         }
//         // HASHING PASSWORD
//         const hashedPassword = await bcrypt.hash(password, 10)
//         // CREATING NEW USER
//         const newUser = await new User({
//             username, email, password: hashedPassword, avatar: randomAvatar
//         })
//         // SAVING NEW USER TO DB
//         await newUser.save()
//          // Generate JWT token
//          const token = jwt.sign({ userId: newUser._id }, 'your-secret-key', { expiresIn: '1h' });

//          // Send token in response
//          res.status(201).json({ token: token, user: newUser });
//         // res.status(201).json(newUser)
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ send: "Server Error" })
//     }
// })


// router.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(401).json({ error: 'Invalid email' });
//         }

//         const isPasswordValid = await bcrypt.compare(password, user.password);

//         if (!isPasswordValid) {
//             return res.status(401).json({ error: 'Invalid password' });
//         }

//         // Generate JWT token
//         const token = jwt.sign(
//             {
//                 id: user._id,
//                 email: user.email,
//                 username: user.username,
//                 role: user.role,
//                 avatar: user.avatar
//             },
//             'secretKey', // Replace with your actual secret key
//             { expiresIn: '1h' } // Set the expiration time as needed
//         );

//         // Set the JWT token as a cookie
//         res.cookie('jwtToken', token, { httpOnly: true, maxAge: 3600000 }); 

//         res.status(200).json({
//             id: user._id,
//             email: user.email,
//             username: user.username,
//             role: user.role,
//             avatar: user.avatar
//         }, token);

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ send: 'Server Error' });
//     }
// });


// module.exports = router


const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../model/User");

const generateRandomAvatar = () => {
  const randomAvatar = Math.floor(Math.random() * 71);
  return `https://i.pravatar.cc/300?img=${randomAvatar}`;
};

// Kullanıcı Oluşturma (Create - Register)
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const defaultAvatar = generateRandomAvatar();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Email address is already registed." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await new User({
      username,
      email,
      password: hashedPassword,
      avatar: defaultAvatar,
    });

    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

// Kullanıcı girişi (Login)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid email." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password." });
    }

    res.status(200).json({
      id: user._id,
      email: user.email,
      username: user.username,
      role: user.role,
      avatar: user.avatar,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;