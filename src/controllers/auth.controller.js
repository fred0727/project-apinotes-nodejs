const User = require('../models/user.model');
const generateJWT = require('../utils/jwt');
const bycrpt = require('bcryptjs');

exports.SignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const salt = await bycrpt.genSalt(12);
    const encryptedPassword = await bycrpt.hash(password, salt);

    const user = await User.create({
      name: name,
      email: email.toLowerCase().trim(),
      password: encryptedPassword,
    });

    const token = await generateJWT(user.id);

    return res.status(200).json({
      status: 'Success',
      message: 'The user has been created',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
      error,
    });
  }
};

exports.SignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email: email.toLowerCase().trim(),
      },
    });

    if (!user) {
      return res.status(400).json({
        status: 'error',
        message: 'User not found',
      });
    }

    if (!(await bycrpt.compare(password, user.password))) {
      return res.status(400).json({
        status: 'error',
        message: 'Email or password incorrect',
      });
    }

    const token = await generateJWT(user.id);

    return res.status(200).json({
      status: 'success',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
      error,
    });
  }
};
