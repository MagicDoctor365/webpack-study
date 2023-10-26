// polyfill is used to convert all new features of JS,
// but it will also make the generated file's size much larger.
// If you don't want to convert all new features of JS,
// you can use core-js to customize your feature needs.
// import '@babel/polyfill';

import data from './data.json';
import './css/main.css';
import './css/main.less';
import './css/sub.less';

console.log(data.name);

// eslint-disable-next-line
window.showMsg = () => {
  // eslint-disable-next-line
  alert('Hello');
};

const p = new Promise((resolve) => {
  setTimeout(() => {
    console.log('Promise is working.');
    resolve();
  }, 1000);
});
console.log(p);

import test from './img/test.png';

const img = new Image();
img.src = test;
document.body.append(img);
