const http = require('http');
const debug = require('debug')('notes-angular-node');
const app = require('./app');

// This function checks that the number is valid when we try setting up a port
const checkPortNumber = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if(port >= 0) {
    return port;
  }
  return false;
};

// Checks which type of error occurred
const onError = error => {
  if(error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string' ? 'pipe ' + port : 'port ' + port;
  switch(error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// Logs that server is listening to incoming requests
const onListening = () => {
  const addr = server.address();
  const bind = typeof port === 'string' ? 'pipe ' + port : 'port ' + port;
  debug('Listening on ' + bind);
};

// Setting up port
const port = checkPortNumber(process.env.PORT || '3000');
app.set('port', port);

// Setting up node server
const server = http.createServer(app);
server.on('error', onError);
server.on('listening', onListening);
server.listen(port);
