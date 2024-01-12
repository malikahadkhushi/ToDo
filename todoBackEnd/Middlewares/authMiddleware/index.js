const jwt = require('jsonwebtoken')

// middleware.js
const validateEmailAndPassword = (req, res, next) => {
    const { email, password } = req.body;
  
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    } else if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    } else if (password.length < 6) {
      return res.status(400).json({ error: 'Password should be at least 6 characters long' });
    }
      next();
  };

  // userMiddleware.js
const validateUserFields = (req, res, next) => {
    const { email, password, profession, profileImage, userName } = req.body;
  
    if (!email.trim() || !password.trim() || !profession.trim() || !profileImage.trim() || !userName.trim()) {
      return res.status(400).json({ error: 'All fields are required and cannot be empty' });
    }
  
    // If validation passes, proceed to the next middleware/route handler
    next();
  };


// Middleware function to verify the token
const verifyToken = (req, res, next) => {

  // Get the token from the request header, query parameter, or body
  const token = req.headers.authorization || req.query.token || req.body.token;

  // Check if a token exists
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  // Call the token verification function
  try {
    const tokenIsValid = jwt.verify(token , process.env.SECRET_KEY);
    if (!tokenIsValid) {
      return res.status(401).json({ message: 'Invalid token.' });
    }
    // If the token is valid, proceed to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error.' });
  }
};
  
  module.exports = { validateEmailAndPassword , validateUserFields , verifyToken};
  