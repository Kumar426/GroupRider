const mongoose = require('mongoose');
let {url} = require('../config');

mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {console.log('connected to mongo db');
}).catch(err => {
 console.log("Not Connected to Database ERROR! ", err);
});