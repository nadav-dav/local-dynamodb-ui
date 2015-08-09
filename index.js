var open = require("open");

localDynamo = require('local-dynamo').launch(null, 8000);
process.on('exit', function () {
  console.log('Stoping LocalDynamoDb');
  localDynamo.kill();
});

require('./app');

open("http://localhost:33331/");