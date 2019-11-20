'use strict'
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors');
var common_lib = require('../common_lib');
const logging =common_lib.logging;
const { handle404Error, handleDevErrors } = common_lib.errorHandlers;
// const { getConnection } = require('./app/middlewares/mysql');
const { verifyToken } = common_lib.verifyToken;
const compression = require('compression');

// const index = require('./app/routes/index');
const app = express();
var log4js = require('log4js');
var logger = log4js.getLogger();

var webapi= require('./web/router/api');
var mobileapi = require('./mobile/router/api')

// cors being added for more information refer https://www.npmjs.com/package/cors
app.use(cors());
// refer this https://expressjs.com/en/advanced/best-practice-performance.html#use-gzip-compression
app.use(compression())

// // view engine setup
// app.set('views', path.join(__dirname, './app/views'));
// app.set('view engine', 'pug');


// app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



/* http server */
const server = http.createServer(app);

// app.use('/', index);

/* serving auth files to route */
app.use('/api/web', webapi);
app.use('/api/mobile', mobileapi);

/* query all the errors */
app.use('/getErrorsList', async ( req, res ) =>{
  const haha =  await require('./app/logger').queryErrors(new Date('2018-2-11'), new Date());
  res.json(haha)
});

// catch 404 and forward to error handler
app.use(handle404Error);

// error handler
app.use(handleDevErrors);


//set headers to allow cross origin request.
// app.use(function(req, res, next) {

//     res.header("Access-Control-Allow-Origin", "*");
//     res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

/* will be assinging env port if it's available  else port will be 3000 */
const port = process.env.PORT || 6001;

/* running application server on port 6001 */
server.listen(port, () => {
  logging.logTheinfo(`Reco is running on port ${server.address().port}`);
});

module.exports = app;
