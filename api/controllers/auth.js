/* eslint-disable no-undef */
var users = require('../../models/users');
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const debug = require('debug')('Authentication:');

function generateAccessToken(user) {
  debug('Generating access token: ', user.email);
  return jwt.sign({ name: user.name, email: user.email }, process.env.ACCESS_SECRET, { expiresIn: '1h' });
}

function generateRefreshToken(user) {
  debug('Generating refresh token: ', user.email);
  return jwt.sign({ name: user.name, email: user.email }, process.env.REFRESH_SECRET, { expiresIn: '1y' });
}

function authenticate(password, user) {
  debug('Authenticating user: ', user.email);
  return bcrypt.compareSync(password, user.password);
}

exports.register = async (req, res) => {
  try {
    const { nom, email, password } = req.body;
    debug('Checking if user exists');
    const existingUser = await users.findOne({ email });
    
    if (existingUser) {
      debug('User already exists');
      return res.status(400).json({ error: 'Email already exists' });
    }

    debug('Hashing the password');
    const salt = await bcrypt.genSalt(parseInt(process.env.ROUND) ?? 0);
    const hashedPassword = await bcrypt.hash(password, salt);

    debug('Creating a new user');
    const newUser = new users({ nom, email, password: hashedPassword });
    await newUser.save();
    debug('User registered successfully');
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    debug('Registration failed:', error);
    return res.status(500).json({ error: 'Registration failed' });
  }
};

exports.login = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    debug('Attempting login for user: ', email);
    const user = await users.findOne({ email });

    console.log('on est ici');
    if (!user || !authenticate(password, user)) {
      debug('Invalid credentials');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    return res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    debug('Login failed:', error);
    return res.status(500).json({ error: 'Login failed' });
  }
};

exports.refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    debug('Refreshing token');
    
    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh token is required' });
    }
    
    const user = await new Promise((resolve, reject) => {
      jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, user) => {
        if (err) {
          reject(err);
        } else {
          resolve(user);
        }
      });
    });

    const accessToken = generateAccessToken(user);
    return res.status(200).json({ accessToken });
  } catch (error) {
    debug('Refresh failed:', error);
    return res.status(500).json({ error: 'Refresh failed' });
  }
};

exports.logout = async (req, res) => {
  try {
    console.log(req.headers);
    debug('Logging out user');
    // Destroy the access token here
    req.headers['authorization'] = null;
    console.log(req.headers);
    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    debug('Logout failed:', error);
    return res.status(500).json({ error: 'Logout failed' });
  }
};

exports.profile = async (req, res) => {
  debug('Fetching user profile');
  var email = req.user.email;
  
  const user = await users.findOne({ email });
  if (user) {
    res.status(200).json(user);
    debug('User profile fetched successfully');
  } else {
    res.status(404).json({ error: 'User not found' });
  }
};

