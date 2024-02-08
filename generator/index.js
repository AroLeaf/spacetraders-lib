const fs = require('node:fs');
const path = require('node:path');
const { stripIndent, codeBlock } = require('common-tags');
const Schema = require('./schema.js');

const schemas = fs.readdirSync('openapi/models').map(file => ({ name: path.basename(file, '.json'), ...JSON.parse(fs.readFileSync(path.join('openapi/models', file), 'utf-8')) }));

fs.writeFileSync('src/api/types.ts', stripIndent(codeBlock)`
  /**
   * This file has been generated from the JSON schema model definitions SpaceTraders provide here: https://github.com/SpaceTradersAPI/api-docs.
   * Please do not make changes to this file directly.
  */
 
  ${schemas.map(schema => Schema.generate(schema)).join('\n\n')}
`, 'utf-8');