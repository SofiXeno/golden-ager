const User = require('./models/user')

require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL,{
  useNewUrlParser: true,
  useUnifiedTopology: true

}).then(()=>{console.log("Successfully connected to DB")}).catch (console.error);


const indexRouter = require('./routes/index');
const authRouter = require('./routes/authRouter');


const userRouter = require('./routes/crud/user');
const categoryRouter = require('./routes/crud/category');
const taskRouter = require('./routes/crud/task');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);

app.use('/users', userRouter);
app.use('/task', taskRouter);
app.use('/category', categoryRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// const doc = {
//   is_volunteer: false,
//   phone: '0987654321',
//   password: 'a',
//   first_name: 'Віктор',
//   last_name: 'Іванов',
//   birthday: new Date(1950, 11, 17),
//   organization: "Життєлюб"
// }
//
// const user = new User(doc)
// user.save().then(console.log).catch(console.log)

module.exports = app;
