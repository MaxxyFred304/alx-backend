import kue from 'kue';

// Create a Kue job queue
const queue = kue.createQueue();

const jobData = {
  phoneNumber: '1234567890',
  message: 'Hello, this is a notification!',
};

// Create a job and add it to the queue
const job = queue.create('push_notification_code', jobData).save((error) => {
  if (!error) {
    console.log(`Notification job created: ${job.id}`);
  } else {
    console.error(`Error creating job: ${error.message}`);
  }
});

// When the job completes successfully
job.on('complete', () => {
  console.log('Notification job completed');
});

// When the job encounters an error
job.on('failed', () => {
  console.log('Notification job failed');
});
