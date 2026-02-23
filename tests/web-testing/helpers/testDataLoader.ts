import * as fs from 'fs';
import * as path from 'path';

export function getTestData() {
  const env = process.env.ENV || 'sit';
  const testDataPath = path.resolve(__dirname, `../fixtures/testdata.${env.toLowerCase()}.json`);
  const data = fs.readFileSync(testDataPath, 'utf-8');
  return JSON.parse(data);
}
