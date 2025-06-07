const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ username, email, password });
    if(user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id)
      });
    }
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if(user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password').populate('followers following', 'username profilePic');
    if(user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if(user) {
      user.username = req.body.username || user.username;
      user.profilePic = req.body.profilePic || user.profilePic;
      if(req.body.password) user.password = req.body.password;
      await user.save();
      res.json({ message: 'Profile updated successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
};

exports.followUser = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user.id);

    if(!userToFollow) return res.status(404).json({ message: 'User not found' });
    if(userToFollow._id.equals(currentUser._id)) return res.status(400).json({ message: 'You cannot follow yourself' });

    if(!userToFollow.followers.includes(currentUser._id)) {
      userToFollow.followers.push(currentUser._id);
      currentUser.following.push(userToFollow._id);
      await userToFollow.save();
      await currentUser.save();
      res.json({ message: 'User followed' });
    } else {
      res.status(400).json({ message: 'Already following this user' });
    }
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
};

exports.unfollowUser = async (req, res) => {
  try {
    const userToUnfollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user.id);

    if(!userToUnfollow) return res.status(404).json({ message: 'User not found' });
    if(userToUnfollow._id.equals(currentUser._id)) return res.status(400).json({ message: 'You cannot unfollow yourself' });

    if(userToUnfollow.followers.includes(currentUser._id)) {
      userToUnfollow.followers.pull(currentUser._id);
      currentUser.following.pull(userToUnfollow._id);
      await userToUnfollow.save();
      await currentUser.save();
      res.json({ message: 'User unfollowed' });
    } else {
      res.status(400).json({ message: 'You are not following this user' });
    }
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
};