import Redis from 'ioredis';

const redis = new Redis(); // Create a new Redis client instance

redis.on('connect', () => {
  console.log('Redis client connected to the server');
});

redis.on('error', (error) => {
  console.error(`Redis client not connected to the server: ${error.message}`);
});

function createHash() {
  redis.hset('HolbertonSchools', 'Portland', 50, redis.print);
  redis.hset('HolbertonSchools', 'Seattle', 80, redis.print);
  redis.hset('HolbertonSchools', 'New York', 20, redis.print);
  redis.hset('HolbertonSchools', 'Bogota', 20, redis.print);
  redis.hset('HolbertonSchools', 'Cali', 40, redis.print);
  redis.hset('HolbertonSchools', 'Paris', 2, redis.print);
}

function displayHash() {
  redis.hgetall('HolbertonSchools', (error, result) => {
    if (error) {
      console.error(`Error getting hash values: ${error.message}`);
    } else {
      console.log('Hash values stored in Redis:');
      console.log(result);
    }
  });
}

createHash();
displayHash();
