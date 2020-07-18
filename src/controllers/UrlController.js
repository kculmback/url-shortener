import validator from 'validator';
import { Url } from '../database/models/url';
import { connectToDatabase } from '../database';
import makeRandomString from '../helpers/makeRandomString';

export async function findShortUrl(shortUrl) {
  return await Url.findOne({ shortUrl }).exec();
}

export async function shortUrlExists(shortUrl) {
  return !!(await findShortUrl(shortUrl));
}

let tries = 0;
export async function makeShortUrl(customShortUrl) {
  const shortUrl = customShortUrl || makeRandomString();

  await connectToDatabase();

  if (await shortUrlExists(shortUrl)) {
    if (customShortUrl) {
      return new Error('That short URL already exists');
    }

    if (tries >= 3) {
      tries = 0;
      throw new Error('could not make unique url');
    }

    tries++;
    return makeShortUrl(customShortUrl);
  }

  tries = 0;
  return shortUrl;
}

export async function createShortUrl(originalUrl, shortUrl) {
  await Url.create({ originalUrl, shortUrl });
}

export function validateData(url, customShortUrl) {
  let valid = true;
  const errors = {};

  if (
    !validator.isURL(url, {
      protocols: ['http', 'https'],
    })
  ) {
    valid = false;
    errors.url = 'Must be valid URL';
  }

  if (!validator.isLength(customShortUrl, { min: 5, max: 100 })) {
    errors.customShortUrl =
      'URL length must be greater than 5 and less than 100';
  }

  return { valid, errors };
}
