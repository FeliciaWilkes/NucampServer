//create app object, set settings add middleware, and then exports the app 
// import node libraries /modules
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//These modules/files contain code for handling particular sets of related "routes" (URL paths)
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const campsiteRouter = require('./routes/campsiteRouter');
const promotionRouter = require('./routes/promotionRouter');
const partnerRouter = require('./routes/partnerRouter');
// note: At this point, we have just imported the module; we haven't actually used its routes yet 
//(this happens just a little bit further down the file)

/*Creates express application object. */
const app = express();

/* view engine setup 2parts path to view and view engine template:jade*/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

/*The next set of functions call app.use() 
to add the middleware libraries into the request handling chain*/
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* Now that all the other middleware is set up, we add our 
(previously imported) route-handling code to the request 
handling chain. The imported code will define particular 
routes for the different parts of the site:
Note: The paths specified above ('/' and '/users') 
are treated as a prefix to routes defined in the imported files.*/
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/campsites', campsiteRouter);
app.use('/promotions', promotionRouter);
app.use('/partners', partnerRouter);

/*add handler methods for errors and HTTP 404 responses
 catch 404 and forward to error handler*/
app.use(function(req, res, next) {
    next(createError(404));
});

/*error handler*/
app.use(function(err, req, res, next) {
    /* set locals, only providing error in development*/
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    /* render the error page*/
    res.status(err.status || 500);
    res.render('error');
});

/*The Express application object (app) is now fully configured. The last step is to add it to the module exports
 (this is what allows it to be imported by /bin/www).*/
module.exports = app;