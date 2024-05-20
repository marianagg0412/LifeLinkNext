const { register } = require('@swc/register');
const path = require('path');

register({
  project: path.join(__dirname, 'tsconfig.json')
});

module.exports = require('./tailwind.config.ts').default;
