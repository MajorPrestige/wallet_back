const { Schema, model } = require('mongoose');
const Joi = require('joi');

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Category is required'],
    },
  },
  { versionKey: false, timestamps: true },
);

const joiCategorySchema = Joi.object({
  name: Joi.string().required(),
});

const Model = model('category', categorySchema);

module.exports = { Model, joiCategorySchema };
