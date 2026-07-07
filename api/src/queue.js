
const {Queue} = require('bullmq')
const connection = require('./redis')

const emailQueue = new Queue('emails',
    {
        connection
    }
);

module.exports = emailQueue;