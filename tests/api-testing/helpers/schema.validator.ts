import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv();
addFormats(ajv);

export function validateSchema(data: any, schema: object) {
  const validate = ajv.compile(schema);
  const valid = validate(data);
  
  if (!valid) {
    throw new Error(`Schema validation failed: ${JSON.stringify(validate.errors, null, 2)}`);
  }
  
  return valid;
}
