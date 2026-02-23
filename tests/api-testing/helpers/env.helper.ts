const env = process.env.ENV || 'sit';

export async function getTestData() {
  const envFile = env.toLowerCase() === 'sit' ? 'test-data' : `test-data.${env.toLowerCase()}`;
  return await import(`../fixtures/${envFile}`);
}

export function getEnv() {
  return env.toUpperCase();
}
