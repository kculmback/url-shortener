import redirect from '@polka/redirect';
import normalizeUrl from 'normalize-url';
import { findShortUrl } from '../controllers/UrlController';

const responseOptions = {
  'Content-Type': 'application/json',
};

export async function get(req, res, next) {
  const { shortUrl } = req.params;
  let url;

  try {
    url = await findShortUrl(shortUrl);
  } catch (error) {
    console.log(error);
  }

  if (!url) {
    res.writeHead(404, responseOptions);
    res.end(JSON.stringify({ message: 'could not find url' }));
    return;
  }

  url.clicks++;
  url.save();

  console.log(url.originalUrl, url.shortUrl, url.clicks);

  return redirect(res, normalizeUrl(url.originalUrl));
}
