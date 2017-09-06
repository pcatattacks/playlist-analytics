const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
});

// api routes
router.get('/', (req, res)=> {
    res.json({'message':"Hello world!"});
});

// use router configuration when we call /api/
app.use('/api', router);

// start server and listen for requests
app.listen(port = (8888 || process.env.PORT), ()=> {
    console.log(`Node server listening on port ${port}`);
});