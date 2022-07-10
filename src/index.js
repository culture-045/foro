/* create variables */
const xpress = require('express');
const http = require('http');
const path = require('path');
/* var server */
const app = xpress();
const server = http.createServer(app);
/* listen socket */
let io = require('socket.io')(server);
/* config the port */
app.set('port', process.env.PORT || 4343);
/* call socket file and execte funtion*/
require('./socks')(io);
/* interface */
app.use(xpress.static(path.join(__dirname, 'public')));
/* start server */
server.listen(
    app.get('port'),
    () => {
        console.log('server is running and use port: ', app.get('port'));
    }
)
