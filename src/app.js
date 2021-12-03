const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const methodOverride =  require('method-override');
let localsCheck = require('./middlewares/localsCheck');
const port = 3001;

/* ENRUTADORES */
let indexRouter = require('./routes/index');
let productsRouter = require('./routes/products');
let userRouter = require('./routes/user');
let cartRouter = require('./routes/cart')
let adminRouter = require('./routes/admin');

/*el error dejarlo debajo */
let errorRouter = require ('./routes/error_404');


/* Middleware */
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(session({
    secret: "arte_cafe",
    resave: false,
    saveUninitialized: true,
    
}))
app.use(localsCheck)

/* VIEWS */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/* Rutas */
app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/user', userRouter);
app.use('/cart',cartRouter);
app.use('/admin', adminRouter);


/* el error dejarlo bebajo */
app.use('*', errorRouter);



app.listen(port, () => {
    console.log(`Puerto corriendo en ${port}\n http://localhost:${port}`)
});