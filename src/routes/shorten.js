import send from '@polka/send-type';
import {
  validateData,
  makeShortUrl,
  createShortUrl,
} from '../controllers/UrlController';

export async function post(req, res, next) {
  const { url, customShortUrl } = req.body;
  const { valid, errors } = validateData(url, customShortUrl);

  if (!valid) {
    return send(res, 400, { errors });
  }

  try {
    const shortUrl = await makeShortUrl(customShortUrl);

    if (shortUrl instanceof Error) {
      return send(res, 409, { error: shortUrl.message });
    }

    await createShortUrl(url, shortUrl);

    return send(res, 200, { url, shortUrl });
  } catch (error) {
    console.error(error);
    return send(res, 500);
  }
}
