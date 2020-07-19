import * as sapper from '@sapper/app';
import 'tailwindcss-dark-mode/prefers-dark';

sapper.start({
  target: document.querySelector('#sapper'),
});
