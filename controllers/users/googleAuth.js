const jwt = require('jsonwebtoken');
const { ctrlWrapper } = require('../../middlewares/index.js');
const { Model: User } = require('../../models').users;
const { SECRET_KEY } = process.env;

const googleAuth = async (req, res) => {
  const { _id: id } = req.user;
  const payload = {
    id,
  };

  const token = jwt.sign(payload, SECRET_KEY);
  await User.findByIdAndUpdate(id, { token });

  res.redirect(`https://majorprestige.github.io/wallet_front?token=${token}`);
};

module.exports = ctrlWrapper(googleAuth);
