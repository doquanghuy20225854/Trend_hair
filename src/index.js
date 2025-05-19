const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 4000;
const { engine } = require('express-handlebars'); // sửa tại đây
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')))
// http logger
app.use(morgan('combined'));

// template engine
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views')); // bật lại nếu bạn có thư mục views


app.get('/', (req, res) => {
  res.render('home'); 
})
app.get('/news', (req, res) => {
  res.render('news'); 
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
