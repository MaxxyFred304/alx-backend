import kue from 'kue';

// Create an array of job data
const jobs = [
  {
    phoneNumber: '4153518780',
    message: 'This is the code 1234 to verify your account'
  },
  {
    phoneNumber: '4153518781',
    message: 'This is the code 4562 to verify your account'
  },
  // ... more job data ...
];

// Create a Kue job queue
const queue = kue.createQueue();

// Process each job data and add it to the queue
for (const jobData of jobs) {
  const job = queue.create('push_notification_code_2', jobData).save((error) => {
    if (!error) {
      console.log(`Notification job created: ${job.id}`);
    } else {
      console.error(`Error creating job: ${error.message}`);
    }
  });

  // Event listeners for job status
  job.on('complete', () => {
    console.log(`Notification job ${job.id} completed`);
  });

  job.on('failed', (error) => {
    console.log(`Notification job ${job.id} failed: ${error}`);
  });

  job.on('progress', (progress) => {
    console.log(`Notification job ${job.id} ${progress}% complete`);
  });
}
