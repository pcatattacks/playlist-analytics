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

app.use(express.static('./build/'))

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

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname+'/build'});
});

// api routes
router.get('/playlist', (req, res)=> {
    // res.json({'message':"Hello world!"});
    console.log(req.query); // debugging statement
    user_id = req.query.userID;
    playlist_id = req.query.playlistID;
    let config;
    let playlist_data;
    // authorizing with API via client credentials flow
    axios(authConfig)
    .then( (response, body) => {
        console.log(response.data);
        authResponse = response.data;

        // playlist data request config
        config = {
            method: 'GET',
            url: `https://api.spotify.com/v1/users/${user_id}/playlists/${playlist_id}`,
            headers: { authorization: 'Bearer '+authResponse.access_token }
        };

        axios(config)
        .then( (response, body) => {
            console.log(response.data);
            playlist_data = response.data;

            // doing aggregation

            var contributers = {}
            let tracks = playlist_data.tracks.items; //list of json objects of tracks
            let tracklist = []; // list of track IDs of tracks in playlist
            var attrList = {
                danceability:0,
                loudness:0,
                energy:0,
                speechiness:0,
                acousticness:0,
                instrumentalness:0,
                liveness:0,
                valence:0,
                tempo:0,
                duration_ms:0
            };
            var mode = {major:0, minor:0};
            var keyData = {}
            var timeSignatures = {}
            // aggregating user contributions
            for (let i = 0; i < tracks.length; i++) {
                let user;
                if (tracks[i].added_by !== null) {
                    user = tracks[i].added_by.id;
                } else {
                    user = playlist_data.owner.id
                }
                if (contributers.hasOwnProperty(user)) {
                    contributers[user].number += 1;
                }
                else {
                    if (tracks[i].added_by !== null) {
                        contributers[user] = {number: 1, data: tracks[i].added_by};
                    } else {
                        contributers[user] = {number: 1, data: playlist_data.owner};
                    }
                }
                tracklist.push(tracks[i].track.id);
            }
            
            // config for request to get track attributes
            let options = {
                method: 'GET',
                url: 'https://api.spotify.com/v1/audio-features?ids='+tracklist.join(","),
                headers: { authorization: 'Bearer '+authResponse.access_token }
            };
            axios(options)
            .then( (response) => {
                let myTracklist = response.data.audio_features;
                for (let i = 0; i<myTracklist.length; i++) {
                    if (keyData.hasOwnProperty(myTracklist[i].key)) {
                        keyData[myTracklist[i].key] += 1;
                    } else {
                        keyData[myTracklist[i].key] = 1;
                    }
                    if (myTracklist[i].mode === 1) {
                        mode.major += 1;
                    } else {
                        mode.minor += 1;
                    }
                    if (timeSignatures.hasOwnProperty(myTracklist[i].time_signature)) {
                        timeSignatures[myTracklist[i].time_signature] += 1;
                    } else {
                        timeSignatures[myTracklist[i].time_signature] = 1;
                    }
                    attrList.danceability += myTracklist[i].danceability/tracks.length;
                    attrList.energy += myTracklist[i].energy/tracks.length;
                    attrList.loudness += myTracklist[i].loudness/tracks.length;
                    attrList.speechiness += myTracklist[i].speechiness/tracks.length;
                    attrList.acousticness += myTracklist[i].acousticness/tracks.length;
                    attrList.instrumentalness += myTracklist[i].instrumentalness/tracks.length;
                    attrList.liveness += myTracklist[i].liveness/tracks.length;
                    attrList.valence += myTracklist[i].valence/tracks.length;
                    attrList.tempo += myTracklist[i].tempo/tracks.length;
                    attrList.duration_ms += myTracklist[i].duration_ms/tracks.length; //should probably convert this to min - sec format
                    // console.log(attrList); //debugging statement
                }

                res.json({
                    name: playlist_data.name,
                    owner: playlist_data.owner,
                    contributers: contributers,
                    track_attributes: attrList,
                    mode_data: mode,
                    key_data: keyData,
                    time_data: timeSignatures
                });

            }).catch( (error) => {
                console.error(error)
            });

        }).catch( (error) => {
            console.log(error);
        });

    }).catch( (error) => {
        console.log(error);
    });

});

// use router configuration when we call /api/
app.use('/api', router);

// start server and listen for requests
app.listen(port = (process.env.PORT || 8000), () => {
    console.log(`Node server listening on port ${port}`);
});