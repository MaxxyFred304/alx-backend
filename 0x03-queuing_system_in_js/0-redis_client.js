import Redis from 'ioredis';

const redis = new Redis(); 

redis.on('connect', () => {
  console.log('Redis client connected to the server');
});

redis.on('error', (error) => {
  console.error(`Redis client not connected to the server: ${error.message}`);
});
