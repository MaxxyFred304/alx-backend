import Redis from 'ioredis';

const subscriber = new Redis(); // Create a new Redis subscriber client instance

subscriber.on('connect', () => {
  console.log('Redis client connected to the server');
});

subscriber.on('error', (error) => {
  console.error(`Redis client not connected to the server: ${error.message}`);
});

subscriber.subscribe('holberton school', (err, count) => {
  if (err) {
    console.error(`Error subscribing to channel: ${err.message}`);
  } else {
    console.log(`Subscribed to ${count} channel(s)`);
  }
});

subscriber.on('message', (channel, message) => {
  console.log(`Received message from channel ${channel}: ${message}`);
  if (message === 'KILL_SERVER') {
    subscriber.unsubscribe('holberton school', () => {
      console.log('Unsubscribed from channel holberton school');
      subscriber.quit();
    });
  }
});
