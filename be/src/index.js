const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 4000;
const { engine } = require('express-handlebars');
const path = require('path');
const route = require('./routes');
const db =require('./config/db');
const session = require('express-session');
const methodOverride = require('method-override');

// Connect to DB
db.connect();

app.use('/img', express.static(path.join(__dirname, 'public/img')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('combined'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));  // ✅ Phải đặt ở đây
app.use(session({
  secret: 'trendhairsecret',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 600000 } // 10 phút
}));

// Middleware truyền user vào res.locals
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  res.locals.flash = req.session.flash;
  delete req.session.flash;
  next();
});

// template engine
app.engine('hbs', engine({ 
  extname: '.hbs',
  helpers: {
    inc: function (value) {
      return parseInt(value) + 1;
    },
     eq: function (a, b) {
      return a === b;
    },
    json: function(context) {
      return JSON.stringify(context, null, 2);
    },
  },
 }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// routes init
route(app);

app.listen(port, () => {
console.log(`Server listening at http://localhost:${port}`);
});
