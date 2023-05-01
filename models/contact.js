const Joi = require('joi');
const { Schema, model } = require('mongoose');

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    number: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true }
);

const addSchema = Joi.object({
  name: Joi.string().min(3).required(),
  number: Joi.string().min(6).required(),
});

const updateSchema = Joi.object({
  name: Joi.string().min(3).optional(),
  number: Joi.string().min(6).optional(),
})
  .required()
  .min(1);

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = model('contact', contactSchema);

module.exports = { addSchema, updateSchema, updateFavoriteSchema, Contact };
