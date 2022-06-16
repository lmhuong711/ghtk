var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
app.use(cors({ origin: 'http://localhost:3001' }));

app.listen(3000, function () {
  console.log('Node server running @ http://localhost:3000')
});

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "db"
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.post('/student', (req, res) => {
  var values = req.body;
  var message = 'Hông rõ lỗi';
  var sql = "INSERT INTO student (school, district, studentCode, class, fullName, dob, gender, birthplace, ethnic, address, phone, marks, note) VALUES ?";
  con.query(sql, [values], function (err, result) {
    if (err) message = err.toString();
    else message = "Thành công! Đã thêm " + result.affectedRows + " dòng.";
    console.log(message);
    res.json(message);
  });
})

app.get('/student', (req, res) => {
  var values = req.query;
  var haveData = {
    sc: values.studentCode !== '',
    fn: values.fullname !== '',
  };
  console.log(values);
  var message = 'Hông rõ lỗi';
  if (!haveData.sc && !haveData.fn) {
    message = 'Không có dữ liệu';
    res.json({
      message: message,
      data: [],
    });;
  } else {
    var sql = "SELECT school, district, studentCode, class, fullName, dob, gender, birthplace, ethnic, address, phone, marks, note FROM student WHERE ";
    haveData.sc ? (sql = sql + "studentCode like '%" + values.studentCode + "%' ") : null;
    haveData.sc && haveData.fn ? sql = sql + ' and ' : null;
    haveData.fn ? (sql = sql + "fullname like '%" + values.fullname + "%' ") : null;
    con.query(sql, function (err, result, fiels) {
      if (err) message = err.toString();
      else {
        result.length === 0 ?
          message = 'Khum tìm thấy dữ liệu'
          :
          message = "Thành công! Tìm thấy " + result.length + " dữ liệu.";
      }
      res.json({
        message: message,
        data: result,
      });
    });
  }
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
