import { Schema, model } from 'mongoose';

const urlSchema = new Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
});

export const Url = model('Url', urlSchema);
