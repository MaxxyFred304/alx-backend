import Redis from 'ioredis';

const redis = new Redis();

redis.on('connect', () => {
  console.log('Redis client connected to the server');
});

redis.on('error', (error) => {
  console.error(`Redis client not connected to the server: ${error.message}`);
});

function setNewSchool(schoolName, value) {
  redis.set(schoolName, value, (error, result) => {
    if (error) {
      console.error(`Error setting value for key ${schoolName}: ${error.message}`);
    } else {
      console.log(`Value set for key ${schoolName}: ${result}`);
    }
  });
}

function displaySchoolValue(schoolName) {
  redis.get(schoolName, (error, result) => {
    if (error) {
      console.error(`Error getting value for key ${schoolName}: ${error.message}`);
    } else {
      console.log(`Value for key ${schoolName}: ${result}`);
    }
  });
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
