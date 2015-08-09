
var AWS = require('aws-sdk');
var thenify = require('thenify');
var Promise = require('bluebird').Promise;
var _ = require('lodash');


var db = new AWS.DynamoDB({
  endpoint: 'http://localhost:8000',
  region: 'us-east-1',
  accessKeyId: 'A',
  secretAccessKey: 'B'
});

module.exports.getData = function getData(){
  return thenify(db.listTables.bind(db))({})
    .then(function (res){
      return Promise.all(res.TableNames.map(function (table){
        return thenify(db.scan.bind(db))({TableName: table})
          .then(function (res){
            var fields = [];
            var items = res.Items.map(function (item){
              return _.mapValues(item, function (entry){
                return entry[Object.keys(entry)[0]];
              });
            });
            if(res.Items.length > 0){
              fields = Object.keys(res.Items[0])
            }
            return {name: table, items: items, fields: fields};
          });
      }));
    })
}