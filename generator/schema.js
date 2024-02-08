const { stripIndent, codeBlock } = require('common-tags');
const path = require('node:path');

const Schema = {
  generate(schema, options) {
    if (schema.$ref) return path.basename(schema.$ref, '.json');
    return this[schema.type]?.(schema, options) || 'any';
  },

  string(schema, { inner = false } = {}) {
    if (inner || !schema.name) return schema.enum ? `(${schema.enum.map(opt => JSON.stringify(opt)).join(' | ')})` : 'string';
    if (schema.enum) return stripIndent(codeBlock)`
      ${schema.description ? `/** ${schema.description} */` : ''}
      export enum ${schema.name} {
        ${schema.enum.map(opt => stripIndent`
          ${schema['x-enumDescriptions'] ? `/** ${schema['x-enumDescriptions'][opt]} */` : ''}
          ${opt} = ${JSON.stringify(opt)},
        `).join('\n')}
      }
    `;
    return `type ${schema.name} = string;`;
  },

  number(schema, { inner = false } = {}) {
    return (inner || !schema.name) ? 'number' : stripIndent`
      ${schema.description ? `/** ${schema.description} */` : ''}
      export type ${schema.name} = number;
    `;
  },

  integer(...args) { return this.number(...args) },

  boolean(schema, { inner = false } = {}) {
    return (inner || !schema.name) ? 'boolean' : stripIndent`
      ${schema.description ? `/** ${schema.description} */` : ''}
      export type ${schema.name} = boolean;
    `;
  },

  null(schema, { inner = false } = {}) {
    return (inner || !schema.name) ? 'null' : stripIndent`
      ${schema.description ? `/** ${schema.description} */` : ''}
      export type ${schema.name} = null;
    `;
  },

  object(schema, { inner = false, interface = true } = {}) {
    const content = stripIndent(codeBlock)`
      {
        ${Object.entries(schema.properties).map(([key, prop]) => stripIndent(codeBlock)`
          ${prop.description ? `/** ${prop.description} */` : ''}
          ${`${JSON.stringify(key)}${schema.required?.includes(key) ? '' : '?'}: ${this.generate(prop, { inner: true })},`}
        `).join('\n')}
      }
    `;

    if (inner || !schema.name) return content;
    return stripIndent(codeBlock)`
      ${schema.description ? `/** ${schema.description} */` : ''}
      ${interface ? `export interface ${schema.name} ${content}` : `export type ${schema.name} = ${content}`}
    `;
  },

  array(schema, { inner = false } = {}) {
    const content = `${this.generate(schema.items, { inner: true })}[]`;

    if (inner || !schema.name) return content;
    return stripIndent(codeBlock)`
      ${schema.description ? `/** ${schema.description} */` : ''}
      ${`export type ${schema.name} = ${content};`}
    `
  },
}

module.exports = Schema;