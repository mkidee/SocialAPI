const { connect, connection } = require('mongoose');

const connectionString = 
    process.env.MONGODB_URI || '//insert database here';

connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = connection;