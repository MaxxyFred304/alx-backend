import Redis from 'ioredis';
import { promisify } from 'util';

const redis = new Redis(); // Create a new Redis client instance

redis.on('connect', () => {
  console.log('Redis client connected to the server');
});

redis.on('error', (error) => {
  console.error(`Redis client not connected to the server: ${error.message}`);
});

const asyncGet = promisify(redis.get).bind(redis);

async function setNewSchool(schoolName, value) {
  try {
    const result = await redis.set(schoolName, value);
    console.log(`Value set for key ${schoolName}: ${result}`);
  } catch (error) {
    console.error(`Error setting value for key ${schoolName}: ${error.message}`);
  }
}

async function displaySchoolValue(schoolName) {
  try {
    const result = await asyncGet(schoolName);
    console.log(`Value for key ${schoolName}: ${result}`);
  } catch (error) {
    console.error(`Error getting value for key ${schoolName}: ${error.message}`);
  }
}

async function main() {
  await displaySchoolValue('Holberton');
  await setNewSchool('HolbertonSanFrancisco', '100');
  await displaySchoolValue('HolbertonSanFrancisco');
}

main();
