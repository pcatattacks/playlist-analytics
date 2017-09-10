import React from 'react';

const Instructions = (props) => {
    return (
        <div style={props.style}>
            <article style={{display:"inline-block", textAlign:"left"}}>
            <h5>Get the deets on your favourite spotify playlists!</h5>
            It's as easy as:
            <ol>
                <li>Right click on the playlist</li>
                <li>click on 'Share'</li>
                <li>Copy the URL</li>
                <li>Paste it in the bar above!</li>
            </ol>

            An example URL:<br/>
            <br/>
            <a href="https://open.spotify.com/user/1184356663/playlist/7btXRYwxFk9J3suVEYNVqu">https://open.spotify.com/user/1184356663/playlist/7btXRYwxFk9J3suVEYNVqu</a><br/>
            <br/>
            Created by <a href="https://pranavdhingra.me">Pranav Dhingra</a>. Checkout the project on <a href="https://github.com/pcatattacks/playlist-analytics/">Github</a>.
            </article>
        </div>
    );
}

export default Instructions;