const fs = require('fs');
const path = require('path');
const schemaGenerator = require('@openapi-contrib/openapi-schema-to-json-schema');
const YAML = require('yaml');

const SCHEMAS_PATH = path.join(__dirname, '../src/api/api-schemas');

fs.rmSync(SCHEMAS_PATH, { recursive: true, force: true });
fs.mkdirSync(SCHEMAS_PATH, { recursive: true });

const openAPIContent = fs.readFileSync(
  path.join(__dirname, './openapi.yml'),
  'utf8',
);
const parsedOpenAPIContent = YAML.parse(openAPIContent);

const COMPONENT_REF_REGEXP = /#\/components\/schemas\/[^"]+/g;

const schemaAdapter = (generatedSchema, name) => {
  delete generatedSchema.$schema;
  generatedSchema.title = name;
  generatedSchema.$id = `${name}.json`;

  if (generatedSchema.format?.includes('date')) {
    generatedSchema.tsType = 'Date';
  }
};

Object.entries(parsedOpenAPIContent.components.schemas).forEach(
  ([name, schema]) => {
    const generatedSchema = schemaGenerator(schema);
    schemaAdapter(generatedSchema, name);

    let stringifiedSchema = JSON.stringify(generatedSchema, undefined, 2);
    const results = stringifiedSchema.match(COMPONENT_REF_REGEXP);

    (results || []).forEach(element => {
      const refName = element.split('/').at(-1);

      stringifiedSchema = stringifiedSchema.replace(element, `${refName}.json`);
    });

    const destinationPath = path.join(SCHEMAS_PATH, `${name}.json`);
    fs.writeFileSync(destinationPath, stringifiedSchema);
  },
);
