const fs = require('fs');
const ST = require('./dist/index.js');

fs.writeFileSync('dist/index.mjs', `
import ST from './index.js';

${Object.keys(ST).map(key => `export const ${key} = ST.${key};`).join('\n')}

export default ST;
`.slice(1));