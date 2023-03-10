const { Schema, model } = require('mongoose');
const Joi = require('joi');

const emailRegexp = /^\w+[\w-.]*\w@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/;
const passwordRegexp = /^.*(?=.{6,})((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;

const userSchema = new Schema({
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: emailRegexp,
    },
    password: {
      type: String,
      required: [true, 'Set password for user'],
      match: passwordRegexp,
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    balance: {
      type: Number,
      required: [true, 'Balance is required'],
      default: 0,
    },
    token: {
      type: String,
      default: null,
    },
  },
  {versionKey: false, timestamps: true},
);

const Model = model('user', userSchema);

const registerJoiSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).min(10).max(63).required(),
  password: Joi.string().pattern(passwordRegexp).min(6).max(16).required(),
  name: Joi.string().min(1).max(12).required(),
});

const loginJoiSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = {
  Model,
  registerJoiSchema,
  loginJoiSchema,
};
