var Connection = require("tedious").Connection;
var Request = require("tedious").Request;

const config = require("./config.json");
var connection = new Connection(config);

connection.on("connect", function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("connected");
    executeSQL(function (response) {
      console.log(response);
    });
  }
});

// Call the connection function
connection.connect();

// Function that executes a SQL query
function executeSQL(callback) {
  request = new Request("SELECT * FROM production.products", function (err) {
    if (err) {
      console.log(err);
    }
  });

  connection.execSql(request);
  var counter = 1;
  response = {};

  request.on("row", function (columns) {
    response[counter] = {};
    columns.forEach(function (column) {
      response[counter][column.metadata.colName] = column.value;
    });
    counter += 1;
  });

  request.on("doneInProc", function (rowCount, more, rows) {
    callback(response);
  });
}
