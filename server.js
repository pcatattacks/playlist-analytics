const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use( function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    next();
});

// Some other constants
let authResponse;
const base64 = new Buffer(process.env.CLIENT_ID+':'+process.env.CLIENT_SECRET).toString('base64');
const authConfig = {
    method: "POST",
    url: 'https://accounts.spotify.com/api/token',
    headers: {
        "Content-Type" : "application/x-www-form-urlencoded",
        Authorization: "Basic "+base64
    },
    params: {
        "grant_type": "client_credentials"
    }
};

// api routes
router.get('/', (req, res)=> {
    // res.json({'message':"Hello world!"});
    
    axios(authConfig)
    .then( (response, body) => {
        console.log(response.data);
        authResponse = JSON.parse(response.data);
    }).catch( (error) => {
        console.log(error);
    });

    

});

// use router configuration when we call /api/
app.use('/api', router);

// start server and listen for requests
app.listen(port = (8000 || process.env.PORT), () => {
    console.log(`Node server listening on port ${port}`);
});