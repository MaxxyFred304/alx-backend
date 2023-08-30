import chai from 'chai';
import kue from 'kue';
import { createPushNotificationsJobs } from './8-job'; // Assuming your module is named 8-job.js

const { expect } = chai;

describe('createPushNotificationsJobs', () => {
  let queue;

  beforeEach(() => {
    queue = kue.createQueue({ testMode: true });
  });

  afterEach(() => {
    kue.Job.rangeByState('test', 'active', 0, -1, 'asc', (err, jobs) => {
      jobs.forEach(job => {
        job.remove();
      });
    });

    queue.testMode.clear();
  });

  it('should throw an error if jobs is not an array', () => {
    expect(() => createPushNotificationsJobs('invalid', queue)).to.throw('Jobs is not an array');
  });

  it('should create and process jobs', () => {
    const jobs = [
      {
        phoneNumber: '4153518780',
        message: 'This is the code 1234 to verify your account'
      },
      {
        phoneNumber: '4153518781',
        message: 'This is the code 4562 to verify your account'
      }
      // ... more job data ...
    ];

    createPushNotificationsJobs(jobs, queue);

    expect(queue.testMode.jobs.length).to.equal(jobs.length);
  });

  // ... more test cases ...
});
