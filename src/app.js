let express = require('express');
let bodyParser = require('body-parser');

let app = express();

let {port} = require('./config');
//Use env 
//const port = process.env.PORT;

// create db connection
require('./db/db');

// create routes
const userRouter = require('./routers/users');
const groupRouter = require('./routers/group');

// create middleware
app.use(bodyParser.json());
app.use('/', userRouter);
app.use('/group', groupRouter);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
