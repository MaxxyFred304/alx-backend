import kue from 'kue';

// Create an array of blacklisted phone numbers
const blacklistedNumbers = ['4153518780', '4153518781'];

// Create a Kue job queue
const queue = kue.createQueue({
  concurrency: 2 // Process two jobs at a time
});

// Function to simulate sending notifications
function sendNotification(phoneNumber, message, job, done) {
  job.progress(0, 100);

  if (blacklistedNumbers.includes(phoneNumber)) {
    done(new Error(`Phone number ${phoneNumber} is blacklisted`));
  } else {
    job.progress(50);

    console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
    setTimeout(() => {
      job.progress(100);
      done();
    }, 1000); // Simulating notification sending time
  }
}

// Process jobs from the queue
queue.process('push_notification_code_2', 2, (job, done) => {
  const { phoneNumber, message } = job.data;
  sendNotification(phoneNumber, message, job, done);
});
