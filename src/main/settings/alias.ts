const { addAlias } = require('module-alias');
const { resolve } = require('path');

addAlias('@', resolve(process.env.TS_NODE_DEV === undefined ? 'dist' : 'src'));
