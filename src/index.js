const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 4000;
const { engine } = require('express-handlebars');
const path = require('path');
const route = require('./routes');

app.        use(express.static(path.join(__dirname, 'public')));
app.use(morgan('combined'));
            app.use(express.urlencoded({ extended: true }));
            app.use(express.json());

// template engine
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// routes init
route(app);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
