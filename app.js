const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const path = require('path')
const app = express();
dotenv.config();

const { notFoundHandler, errorHandler } = require('./middlewares/common/errorhandeler')

const loginRouter = require('./router/loginRouter')
const userRouter = require('./router/userRouter')
const inboxRouter = require('./router/inboxRouter')

//database collection 
mongoose.connect(process.env.MONGO_CONNECTION_STRING).then(() => {
    console.log('mongo connection success');
})

//request parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//set view engine
app.set('view engine', 'ejs');

//set public folder
app.use(express.static(path.join(__dirname, 'public')))

//parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET))

//routing setup
app.use('/', loginRouter);
app.use('/users', userRouter);
app.use('/inbox', inboxRouter);

//404 handler
app.use(notFoundHandler)
app.use(errorHandler)

app.listen(process.env.PORT, () => {
    console.log(`listing to ${process.env.PORT}`);
})