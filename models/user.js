const Joi = require('joi');
const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: String,
    verify: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const registerSchema = Joi.object({
  name: Joi.string().required().min(3),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6),
});

const loginSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6),
});

const subscriptionScema = Joi.object({
  subscription: Joi.string().required().valid('starter', 'pro', 'business'),
});

const User = model('user', userSchema);

module.exports = { User, registerSchema, loginSchema, subscriptionScema };
